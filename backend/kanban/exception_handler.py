import logging
import traceback
from datetime import datetime

from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

from .exceptions import (
    BaseAPIException,
    ServerError,
    ValidationError,
)

logger = logging.getLogger("app.exceptions")


def _build_payload(exc: BaseAPIException, request_id: str) -> dict:
    data = {
        "success": False,
        "error": {
            "message": str(exc.detail) if exc.detail is not None else exc.default_detail,
            "code": getattr(exc, "error_code", "server.error"),
            "severity": getattr(exc, "severity", "error"),
            "color": getattr(exc, "color", "#DC2626"),
            "icon": getattr(exc, "icon", "❌"),
            "extra": exc.extra or {},
            "errorId": getattr(exc, "error_id", request_id),
        },
    }

    if settings.DEBUG:
        data["error"]["extra"] = {
            **data["error"]["extra"],
            "stackTrace": traceback.format_exc(),
            "requestId": request_id,
        }
    else:
        data["error"]["extra"] = {
            **data["error"]["extra"],
            "requestId": request_id,
        }

    return data


def custom_exception_handler(exc, context):
    request = context.get("request")
    request_id = getattr(request, "META", {}).get("HTTP_X_REQUEST_ID") or f"REQ-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{uuid4_hex()}"

    response = drf_exception_handler(exc, context)

    if response is not None and isinstance(exc, BaseAPIException):
        logger.warning("Handled API exception", extra={"error_id": exc.error_id, "path": request.path if request else None})
        return Response(_build_payload(exc, request_id), status=exc.status_code)

    if response is not None and response.status_code == status.HTTP_400_BAD_REQUEST:
        payload = {
            "success": False,
            "error": {
                "message": "Your request could not be processed.",
                "code": "validation.failed",
                "severity": "warning",
                "color": "#F59E0B",
                "icon": "⚠️",
                "extra": {
                    "fieldErrors": response.data,
                    "requestId": request_id,
                },
                "errorId": f"ERR-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{uuid4_hex()}",
            },
        }
        logger.info("Validation error", extra={"path": request.path if request else None, "request_id": request_id})
        return Response(payload, status=status.HTTP_400_BAD_REQUEST)

    if response is not None:
        status_code = response.status_code
        base_error = ServerError()
        if status_code == status.HTTP_401_UNAUTHORIZED:
            from .exceptions import AuthenticationError
            base_error = AuthenticationError(detail="Authentication failed.")
        elif status_code == status.HTTP_403_FORBIDDEN:
            from .exceptions import PermissionDeniedError
            base_error = PermissionDeniedError(detail="Permission denied.")
        elif status_code == status.HTTP_404_NOT_FOUND:
            from .exceptions import NotFoundError
            base_error = NotFoundError(detail="Not found.")
        elif status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            from .exceptions import RateLimitError
            base_error = RateLimitError(detail="Rate limit exceeded.")
        else:
            base_error = ServerError()

        logger.error("Unhandled DRF exception", extra={"path": request.path if request else None, "status_code": status_code, "request_id": request_id})
        payload = _build_payload(base_error, request_id)
        payload["error"]["message"] = response.data.get("detail", base_error.default_detail)
        return Response(payload, status=status_code)

    logger.critical("Unhandled exception with no DRF response", extra={"path": request.path if request else None, "request_id": request_id})
    generic = ServerError()
    return Response(_build_payload(generic, request_id), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def uuid4_hex() -> str:
    import uuid

    return uuid.uuid4().hex[:8].upper()

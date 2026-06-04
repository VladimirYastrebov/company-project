import datetime
import uuid

from rest_framework import status
from rest_framework.exceptions import APIException


class BaseAPIException(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "A server error occurred."
    default_code = "server_error"
    error_code = "server.error"
    severity = "critical"
    color = "#991B1B"
    icon = "💥"
    retryable = False
    silent = False
    extra = None

    def __init__(
        self,
        detail=None,
        code=None,
        error_code=None,
        severity=None,
        color=None,
        icon=None,
        retryable=None,
        silent=None,
        extra=None,
        error_id=None,
    ):
        if detail is None:
            detail = self.default_detail
        super().__init__(detail=detail, code=code or self.default_code)

        self.error_code = error_code or self.error_code
        self.severity = severity or self.severity
        self.color = color or self.color
        self.icon = icon or self.icon
        self.retryable = retryable if retryable is not None else self.retryable
        self.silent = silent if silent is not None else self.silent
        self.extra = extra or {}
        self.error_id = error_id or self._build_error_id()

    def _build_error_id(self) -> str:
        date_token = datetime.datetime.utcnow().strftime("%Y%m%d")
        return f"ERR-{date_token}-{uuid.uuid4().hex[:8].upper()}"


class ValidationError(BaseAPIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Validation failed. Please review your input."
    default_code = "invalid"
    error_code = "validation.failed"
    severity = "warning"
    color = "#F59E0B"
    icon = "⚠️"
    retryable = False


class AuthenticationError(BaseAPIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Authentication is required to access this resource."
    default_code = "authentication_failed"
    error_code = "authentication.failed"
    severity = "warning"
    color = "#2563EB"
    icon = "🔐"
    retryable = False


class PermissionDeniedError(BaseAPIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "You do not have permission to perform this action."
    default_code = "permission_denied"
    error_code = "permission.denied"
    severity = "error"
    color = "#DC2626"
    icon = "🚫"
    retryable = False


class NotFoundError(BaseAPIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "The requested resource could not be found."
    default_code = "not_found"
    error_code = "resource.not_found"
    severity = "warning"
    color = "#0EA5E9"
    icon = "🔍"
    retryable = False


class ConflictError(BaseAPIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = "A conflicting resource already exists."
    default_code = "conflict"
    error_code = "resource.conflict"
    severity = "warning"
    color = "#F97316"
    icon = "⚔️"
    retryable = False


class RateLimitError(BaseAPIException):
    status_code = status.HTTP_429_TOO_MANY_REQUESTS
    default_detail = "Too many requests. Please wait before retrying."
    default_code = "rate_limit"
    error_code = "request.rate_limit"
    severity = "warning"
    color = "#F59E0B"
    icon = "⏳"
    retryable = True


class ServerError(BaseAPIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "An unexpected server error occurred."
    default_code = "server_error"
    error_code = "server.error"
    severity = "critical"
    color = "#991B1B"
    icon = "💥"
    retryable = True


class MaintenanceError(BaseAPIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = "The system is currently under maintenance. Please try again later."
    default_code = "service_unavailable"
    error_code = "service.maintenance"
    severity = "warning"
    color = "#0EA5E9"
    icon = "🛠️"
    retryable = True

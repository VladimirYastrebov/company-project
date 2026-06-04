from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

@method_decorator(csrf_exempt, name='dispatch')
class ReactListView(APIView):
    def get(self, request):
        output = [{"name": output.name, "salary": output.salary, "upping_salary": output.upping_salary, "id": output.id} for output in Employee.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def delete(self, request):
        employee_id = request.data.get('id')
        if not employee_id:
            return Response({"error": "id required"}, status=400)
        try:
            employee = Employee.objects.get(id=employee_id)
            employee.delete()
            return Response({"message": "Employee deleted successfully"})
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=404)
        
    def put(self, request):
        employee_id = request.data.get("id")
        upping_salary = request.data.get("upping_salary")
        if not employee_id or upping_salary is None:
            return Response({"error": "Id and upping_salary required"}, status=400)
        try:
            employee = Employee.objects.get(id=employee_id)
            employee.upping_salary = upping_salary
            employee.save()
            return Response({"message": "Employee's salary changing succeeded"})
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=404)
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.generics import ListCreateAPIView


class AppointmentListCreateAPIView(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

from django.utils import timezone
from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def validate_appointment_time(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Appointment time cannot be in the past")
        return value

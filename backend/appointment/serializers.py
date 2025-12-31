from django.utils import timezone
from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["appointment_time", "name", "email", "description", "status"]
        read_only_fields = ["status"]

    def validate_appointment_time(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Appointment time cannot be in the past")

        # Check if minute is 0
        if value.minute != 0:
            raise serializers.ValidationError(
                "Appointments can only be booked on the hour (e.g., 9:00, 10:00)."
            )

        # Check if hour is within 9am and 2pm (14:00)
        # 9, 10, 11, 12, 13, 14
        if value.hour not in [9, 10, 11, 12, 13, 14]:
            raise serializers.ValidationError(
                "Appointments are only available between 9:00 AM and 2:00 PM."
            )

        return value

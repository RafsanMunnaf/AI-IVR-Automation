from django.db import models


class Appointment(models.Model):
    appointment_time = models.DateTimeField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()
    business_name = models.CharField(max_length=100)
    business_address = models.CharField(max_length=255)

    APPOINTMENT_STATUS = (
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    status = models.CharField(
        max_length=20, choices=APPOINTMENT_STATUS, default="pending"
    )

    def __str__(self):
        return f"{self.name} - {self.appointment_time.strftime('%Y-%m-%d %H:%M:%S')}"

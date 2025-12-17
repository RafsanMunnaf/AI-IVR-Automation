from django.db import models


class Appointment(models.Model):
    appointment_time = models.DateTimeField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.date} at {self.time}"

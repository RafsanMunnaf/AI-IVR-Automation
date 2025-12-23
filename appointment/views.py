from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.generics import ListCreateAPIView

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentListCreateAPIView(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        subject = "Appointment Confirmation - Betopia Group"
        context = {
            "name": instance.name,
            "appointment_time": instance.appointment_time,
            "description": instance.description,
        }
        html_message = render_to_string("appointment/confirmation_email.html", context)
        plain_message = strip_tags(html_message)

        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.FROM_EMAIL,
            recipient_list=[instance.email],
            html_message=html_message,
            fail_silently=True,
        )

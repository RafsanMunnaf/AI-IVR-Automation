from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentListCreateAPIView(ListCreateAPIView):
    """
    List and create appointments.

    Creation behavior differs from the default ListCreateAPIView:

    - If an appointment with status="pending" already exists for the given email,
      that appointment is returned instead of creating a new one (HTTP 200).
    - If no pending appointment exists, a new appointment is created (HTTP 201)
      and a confirmation email is sent.
    - Confirmation emails are only sent for newly created appointments.

    This design prevents duplicate pending appointments per email and avoids
    sending duplicate confirmation emails.
    """

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")

        # Check for existing pending appointment
        existing = Appointment.objects.filter(
            email=email,
            status="pending",
        ).first()

        if existing:
            serializer = self.get_serializer(existing)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Normal creation flow
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Send confirmation email ONLY for new appointment
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

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class CurrentDateTimeAPIView(APIView):
    def get(self, request):
        return Response({"current_datetime": timezone.localtime()})

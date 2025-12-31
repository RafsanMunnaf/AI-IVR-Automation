from django.urls import path
from . import views

urlpatterns = [
    path("appointments/", views.AppointmentListCreateAPIView.as_view()),
    path("current-datetime/", views.CurrentDateTimeAPIView.as_view()),
]

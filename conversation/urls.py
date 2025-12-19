from django.urls import path
from .views import (
    VapiWebhookAPIView,
    ConversationListAPIView,
    ConversationRetrieveAPIView,
)

urlpatterns = [
    path("webhooks/vapi/", VapiWebhookAPIView.as_view(), name="vapi-webhook"),
    path(
        "api/conversations/",
        ConversationListAPIView.as_view(),
        name="conversation-list",
    ),
    path(
        "api/conversations/<int:pk>/",
        ConversationRetrieveAPIView.as_view(),
        name="conversation-detail",
    ),
]

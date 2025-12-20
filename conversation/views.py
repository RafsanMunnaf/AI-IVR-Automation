from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Conversation
from .serializers import VapiWebhookSerializer, ConversationSerializer


class ConversationListAPIView(generics.ListAPIView):
    """
    Returns a list of all restaurant conversations.
    Endpoint: GET /api/conversations/
    """

    queryset = Conversation.objects.all().order_by("-started_at")
    serializer_class = ConversationSerializer


class ConversationRetrieveAPIView(generics.RetrieveAPIView):
    """
    Returns a single conversation with its full message history.
    Endpoint: GET /api/conversations/<id>/
    """

    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    lookup_field = "id"  # You can also use 'call_id' here if you prefer


class VapiWebhookAPIView(APIView):
    def post(self, request, *args, **kwargs):
        vapi_msg = request.data.get("message", {})
        message_type = vapi_msg.get("type")

        if message_type == "end-of-call-report":
            # Pass the WHOLE request.data to the serializer
            # because the serializer expects a 'message' key
            serializer = VapiWebhookSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"status": "success", "message": "Call stored"},
                    status=status.HTTP_201_CREATED,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"status": "ignored"}, status=status.HTTP_200_OK)

from rest_framework import serializers
from .models import Conversation, ConversationMessage


class ConversationMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConversationMessage
        fields = ["role", "text", "created_at"]


class ConversationSerializer(serializers.ModelSerializer):
    messages = ConversationMessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = [
            "call_id",
            "started_at",
            "ended_at",
            "duration_seconds",
            "summary",
            "messages",
        ]


class VapiWebhookSerializer(serializers.Serializer):
    """
    Used to parse the incoming POST request from Vapi.ai
    """

    message = serializers.JSONField()

    def save(self):
        msg_data = self.validated_data.get("message", {})
        call_data = msg_data.get("call", {})
        artifact_data = msg_data.get("artifact", {})
        analysis_data = msg_data.get("analysis", {})

        # 1. Update or Create the Conversation
        conversation, _ = Conversation.objects.update_or_create(
            call_id=call_data.get("id"),
            defaults={
                "started_at": call_data.get("startedAt"),
                "ended_at": call_data.get("endedAt"),
                "summary": analysis_data.get("summary"),
            },
        )

        # 2. Extract and Save the Transcript Messages
        transcript_messages = artifact_data.get("messages", [])

        # Clear existing messages if this is a retry/update to avoid duplicates
        conversation.messages.all().delete()

        messages_to_create = [
            ConversationMessage(
                conversation=conversation, role=m.get("role"), text=m.get("message")
            )
            for m in transcript_messages
            if m.get("message")
        ]

        ConversationMessage.objects.bulk_create(messages_to_create)
        return conversation

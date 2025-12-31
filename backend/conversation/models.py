from django.db import models


class Conversation(models.Model):
    call_id = models.CharField(max_length=255, unique=True)
    # Using null=True so we can record the actual Vapi timestamps
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    duration_ms = models.IntegerField(null=True, blank=True)
    duration_seconds = models.FloatField(null=True, blank=True)
    duration_minutes = models.FloatField(null=True, blank=True)
    summary = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Call {self.call_id}"


class ConversationMessage(models.Model):
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )
    role = models.CharField(max_length=50)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

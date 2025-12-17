from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    cuisine = models.CharField(
        max_length=50,
        choices=[
            ("bangla", "Bangla"),
            ("chinese", "Chinese"),
        ],
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.cuisine} - {self.name}"


class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items"
    )
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_TYPE_DINE_IN = "dine_in"
    ORDER_TYPE_TAKEAWAY = "takeaway"
    ORDER_TYPE_DELIVERY = "delivery"

    ORDER_TYPE = [
        (ORDER_TYPE_DINE_IN, "Dine In"),
        (ORDER_TYPE_TAKEAWAY, "Takeaway"),
        (ORDER_TYPE_DELIVERY, "Delivery"),
    ]

    ORDER_STATUS = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("preparing", "Preparing"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    customer_name = models.CharField(max_length=50, null=True, blank=True)
    customer_phone = models.CharField(max_length=20)
    customer_address = models.CharField(max_length=255, null=True, blank=True)
    order_type = models.CharField(
        max_length=20, choices=ORDER_TYPE, default=ORDER_TYPE_DINE_IN
    )
    order_status = models.CharField(
        max_length=20, choices=ORDER_STATUS, default="pending"
    )
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer_name} - {self.customer_phone} - {self.order_type}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=1)
    special_instructions = models.CharField(max_length=200, blank=True)

from rest_framework import serializers
from .models import Category, MenuItem, Order, OrderItem


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "cuisine", "items"]


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source="menu_item.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "menu_item",
            "menu_item_name",
            "quantity",
            "price",
            "special_instructions",
        ]
        read_only_fields = ["price"]

    def create(self, validated_data):
        order_id = self.context["order_id"]

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            raise serializers.ValidationError("Order not found")

        validated_data["price"] = validated_data["menu_item"].price

        order_item = OrderItem.objects.create(**validated_data, order=order)
        return order_item


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


## VAPI Serializers
class VapiOrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source="menu_item.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "menu_item",
            "menu_item_name",
            "quantity",
            "price",
            "special_instructions",
        ]
        read_only_fields = ["price"]


class VapiOrderCreateSerializer(serializers.ModelSerializer):
    items = VapiOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "customer_address",
            "order_type",
            "order_status",
            "notes",
            "created_at",
            "updated_at",
            "items",
        ]
        read_only_fields = ["price"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(
                order=order, price=item_data["menu_item"].price, **item_data
            )
        return order


class VapiOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "customer_address",
            "order_type",
            "order_status",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["price"]

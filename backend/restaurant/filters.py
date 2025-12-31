import django_filters
from .models import MenuItem, Order, OrderItem


class MenuItemFilter(django_filters.FilterSet):
    class Meta:
        model = MenuItem
        fields = {
            "name": ["iexact", "icontains"],
            "description": ["icontains"],
            "category": ["exact"],
            "price": ["lt", "gt"],
        }


class OrderFilter(django_filters.FilterSet):
    class Meta:
        model = Order
        fields = {
            "id": ["exact"],
            "customer_phone": ["iexact"],
            "order_type": ["exact"],
            "order_status": ["exact"],
        }


class OrderItemFilter(django_filters.FilterSet):
    class Meta:
        model = OrderItem
        fields = {
            "order": ["exact"],
        }

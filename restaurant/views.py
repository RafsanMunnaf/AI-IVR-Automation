from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, MenuItem, Order, OrderItem
from .serializers import (
    CategorySerializer,
    MenuItemSerializer,
    OrderSerializer,
    OrderItemSerializer,
    VapiOrderCreateSerializer,
)
from .filters import MenuItemFilter, OrderFilter, OrderItemFilter


class VapiMenuAPIView(APIView):
    def get(self, request):
        menu = Category.objects.prefetch_related("items").all()
        serializer = CategorySerializer(menu, many=True)
        return Response({"results": serializer.data})


class VapiOrderAPIView(APIView):
    def post(self, request):
        serializer = VapiOrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()

            # Calculate total price and prepare email context
            items = order.items.select_related("menu_item").all()
            total_price = sum(item.price * item.quantity for item in items)

            context = {
                "customer_name": order.customer_name or "Customer",
                "order": order,
                "items": items,
                "total_price": total_price,
            }

            html_message = render_to_string(
                "restaurant/order_confirmation.html", context
            )
            plain_message = strip_tags(html_message)

            send_mail(
                subject=f"Order Confirmation #{order.id}",
                message=plain_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=["riwaraj779@nctime.com"],
                html_message=html_message,
                fail_silently=False,
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class VapiOrderItemAPIView(APIView):
    def post(self, request):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class MenuItemList(ListAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MenuItemFilter


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderItemFilter

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["order_id"] = self.kwargs["order_pk"]
        return context

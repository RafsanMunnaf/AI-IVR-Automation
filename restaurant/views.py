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
            serializer.save()
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

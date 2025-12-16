from django.urls import path
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r"orders", views.OrderViewSet)
router.register(r"order-items", views.OrderItemViewSet)

order_routers = routers.NestedDefaultRouter(router, r"orders", lookup="order")
order_routers.register(r"items", views.OrderItemViewSet, basename="orderitems")


urlpatterns = (
    [
        path("categories/", views.CategoryList.as_view()),
        path("menu-items/", views.MenuItemList.as_view()),
        # Vapi endpoints
        path("vapi/menu-items/", views.VapiMenuAPIView.as_view()),
        path("vapi/orders/", views.VapiOrderAPIView.as_view()),
    ]
    + router.urls
    + order_routers.urls
)

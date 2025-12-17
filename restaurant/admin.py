from django.contrib import admin
from .models import Category, MenuItem, Order, OrderItem

admin.site.register(Category)
admin.site.register(MenuItem)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


admin.site.register(Order, OrderAdmin)

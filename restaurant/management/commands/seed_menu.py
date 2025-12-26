from django.core.management.base import BaseCommand
from django.db import transaction, connection
from restaurant.models import Category, MenuItem


class Command(BaseCommand):
    help = "Seed Chinese menu categories and items"

    @transaction.atomic
    def handle(self, *args, **options):
        # --- Categories (safe even if duplicates already exist) ---
        appetizer = (
            Category.objects.filter(name="Appetizer & Starter", cuisine="chinese")
            .order_by("id")
            .first()
        ) or Category.objects.create(name="Appetizer & Starter", cuisine="chinese")

        soup = (
            Category.objects.filter(name="Soup", cuisine="chinese")
            .order_by("id")
            .first()
        ) or Category.objects.create(name="Soup", cuisine="chinese")

        grilled = (
            Category.objects.filter(name="Grilled Dish", cuisine="chinese")
            .order_by("id")
            .first()
        ) or Category.objects.create(name="Grilled Dish", cuisine="chinese")

        # --- Clean existing items (idempotent run) ---
        MenuItem.objects.filter(category__in=[appetizer, soup, grilled]).delete()

        # --- Reset Postgres sequence (prevents duplicate PK error) ---
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT setval(
                    pg_get_serial_sequence('restaurant_menuitem', 'id'),
                    COALESCE(MAX(id), 1),
                    true
                )
                FROM restaurant_menuitem;
                """
            )

        # --- Menu items ---
        items = [
            # Appetizer & Starter
            MenuItem(
                name="Thai Chicken Cashew Nut Salad",
                category=appetizer,
                price=745,
                description="Warm fried cube cut chicken, roasted cashew nut, tomato, onion, coriander & spicy sauce",
            ),
            MenuItem(
                name="Thai Grilled Chicken Salad",
                category=appetizer,
                price=690,
                description="Grilled boneless chicken, carrot, coriander, onion, tomato & spices",
            ),
            MenuItem(
                name="Thai Shrimps Salad",
                category=appetizer,
                price=825,
                description="Shrimp, onion, lemon grass, ginger, red chili flakes & roasted ground rice",
            ),
            MenuItem(
                name="Classic Prawn Cocktail",
                category=appetizer,
                price=725,
                description="Poached shrimps, fresh vegetables, boiled eggs with cocktail sauce",
            ),
            MenuItem(
                name="Thai Grilled Beef Salad",
                category=appetizer,
                price=570,
                description="Grilled slice beef, carrot, coriander, onion, tomato & spices",
            ),
            MenuItem(
                name="Thai Chicken or Beef Satay",
                category=appetizer,
                price=825,
                description="Spicy grilled chicken or boneless beef skewer served with peanut sauce",
            ),
            MenuItem(
                name="Thai Fish Cake",
                category=appetizer,
                price=825,
                description="Minced tuna fish cooked with spices, egg, flour and served with cucumber & peanut sauce",
            ),
            MenuItem(
                name="Thai Spring Roll",
                category=appetizer,
                price=570,
                description="Crispy wrap & fluffy veggies with minced chicken",
            ),
            MenuItem(
                name="Thai Shrimps Roll",
                category=appetizer,
                price=850,
                description="Crispy wrap filled with spiced shrimp",
            ),
            MenuItem(
                name="Sze-Chuan Chicken & Prawn Salad",
                category=appetizer,
                price=685,
                description="Spicy sliced chicken & prawn, roasted cashew nut, coriander, onion & tomato",
            ),
            MenuItem(
                name="Sze-Chuan Chicken Salad",
                category=appetizer,
                price=685,
                description="Spicy sliced chicken, roasted cashew nut, coriander, onion & tomato",
            ),
            MenuItem(
                name="Sze-Chuan Prawn Salad",
                category=appetizer,
                price=785,
                description="Spicy prawn, roasted cashew nut, coriander, onion & tomato",
            ),
            MenuItem(
                name="Shrimps Orange & Apple Salad",
                category=appetizer,
                price=725,
                description="Poached shrimps, fresh vegetables & fresh fruits mixed with honey mustard orange sauce",
            ),
            MenuItem(
                name="Fried Wontons",
                category=appetizer,
                price=570,
                description="Crispy wrap stuffed with minced chicken, prawn & carrot",
            ),
            MenuItem(
                name="Dumpling",
                category=appetizer,
                price=825,
                description="Steamed soft dough stuffed with minced chicken, mushroom, baby corn, carrot & herbs",
            ),
            MenuItem(
                name="Shrimps on Toast",
                category=appetizer,
                price=825,
                description="Deep fried herbs mixed with minced shrimp on sliced loaf",
            ),
            MenuItem(
                name="Fried Prawn Ball Palate",
                category=appetizer,
                price=885,
                description="Deep fried coated balls stuffed with herby minced prawn",
            ),
            MenuItem(
                name="Batter Deep Fried Prawns",
                category=appetizer,
                price=950,
                description="Mild & fluffy deep fried egg mixed with battered spice prawn",
            ),
            MenuItem(
                name="Crispy Chicken Ball",
                category=appetizer,
                price=725,
                description="Deep fried minced chicken mixed with herbs and veggies",
            ),
            MenuItem(
                name="Fried Prawn Ball",
                category=appetizer,
                price=865,
                description="Savory style minced prawn prepared with crust onion & green chili",
            ),
            MenuItem(
                name="Fried Fish Finger",
                category=appetizer,
                price=865,
                description="Crumb coated finger cut fish mixed with herbs & spices",
            ),
            MenuItem(
                name="Waldorf Salad",
                category=appetizer,
                price=760,
                description="Fresh fruits, vegetables, grilled chicken cube cut served with honey mustard sauce",
            ),
            # Soup
            MenuItem(
                name="Thai Hot Soup (Tom Yaam)",
                category=soup,
                price=780,
                description="Sliced chicken, prawn, mushroom cooked with low fat milk, Thai herbs & spicy sauce",
            ),
            MenuItem(
                name="Thai Mixed Vegetable Soup",
                category=soup,
                price=655,
                description="Seasonal vegetable cooked with sliced chicken, prawn, mushroom & baby corn",
            ),
            MenuItem(
                name="Thai Noodles Soup",
                category=soup,
                price=680,
                description="Thai noodles and sliced chicken cooked with bean sprout & cabbage",
            ),
            MenuItem(
                name="Thai Hot Pot Soup",
                category=soup,
                price=890,
                description="Sea fish, sliced chicken, prawn prepared with onion, Thai ginger & herbs mixed spicy sauce",
            ),
            MenuItem(
                name="Sze-Chuan Soup",
                category=soup,
                price=570,
                description="Minced chicken, prawn and mushroom cooked with baby corn & chili tomato sauce",
            ),
            MenuItem(
                name="Cream of Chicken & Mushroom Soup",
                category=soup,
                price=750,
                description="Blended sautéed mushrooms, cube-cut boiled chicken with fresh cream",
            ),
            MenuItem(
                name="Chicken Corn Soup",
                category=soup,
                price=595,
                description="Mild soup cooked with minced chicken, sweet corn & egg",
            ),
            # Grilled
            MenuItem(
                name="Thai Grilled Chicken",
                category=grilled,
                price=865,
                description="Spicy farm chicken grilled with chef special sauce",
            ),
            MenuItem(
                name="Thai Grilled Beef",
                category=grilled,
                price=825,
                description="Boneless spiced beef grilled with spicy sauce",
            ),
            MenuItem(
                name="Thai Grilled King Prawn",
                category=grilled,
                price=1185,
                description="King prawn grilled with spicy hot & sour sauce",
            ),
            MenuItem(
                name="Thai Grilled Red Snapper",
                category=grilled,
                price=210,
                description="Whole sea fish grilled and flavored with spicy sauce (per 100 grams)",
            ),
            MenuItem(
                name="Grilled Chicken Wings",
                category=grilled,
                price=570,
                description="Chicken wings grilled with chili tomato sauce and spices",
            ),
            MenuItem(
                name="Char Grilled Whole Pomfret",
                category=grilled,
                price=1275,
                description="Whole pomfret and sautéed vegetables served with mashed potatoes",
            ),
        ]

        MenuItem.objects.bulk_create(items)

        self.stdout.write(self.style.SUCCESS("Chinese menu seeded successfully."))

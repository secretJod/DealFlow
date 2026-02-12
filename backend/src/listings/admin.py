from django.contrib import admin
from .models import Listing

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    # This makes the list look like a real table in the admin
    list_display = ('title', 'price', 'category', 'location', 'created_at')
    # This adds a search bar to the admin
    search_fields = ('title', 'description', 'category')
    # This adds a filter sidebar
    list_filter = ('category', 'location')  
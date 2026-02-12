from django.urls import path
from .views import ListingListCreateAPIView, ListingDetailAPIView # Add DetailView
from .views import AIChatView

urlpatterns = [
    path('listings/', ListingListCreateAPIView.as_view(), name='listing-list'),
    path('listings/<int:pk>/', ListingDetailAPIView.as_view(), name='listing-detail'),
    path('ai/chat/', AIChatView.as_view(), name='ai_chat'),
]

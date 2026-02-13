import requests
import
import traceback
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework import permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Listing
from .serializers import ListingSerializer

# --- AI Chat View (The Brain Connection) ---
class AIChatView(APIView):
    def post(self, request):
        user_message = request.data.get("message")
        
        # 1. Fetch current listings
        listings = Listing.objects.all()
        
        # 2. Format inventory with ID and Absolute Image URLs
        inventory_items = []
        for item in listings:
            image_url = request.build_absolute_uri(item.image.url) if item.image else "No Image Available"
            # We add ID: {item.id} so the AI can reference it for the "Buy" button
            item_str = (
                f"ID: {item.id} | Product: {item.title} | Price: ₹{item.price} | "
                f"Description: {item.description} | Location: {item.location} | "
                f"Image_URL: {image_url}"
            )
            inventory_items.append(item_str)
        
        inventory_text = "\n".join(inventory_items)

        # 3. Connect to Flask AI Service
        flask_url = os.getenv("FLASK_AI_URL", "http://127.0.0.1:5001/chat")
        payload = {
            "message": user_message,
            "inventory": inventory_text
        }

        try:
            response = requests.post(flask_url, json=payload, timeout=10)
            response.raise_for_status()
            ai_data = response.json()
            
            return Response({
                "reply": ai_data.get("reply"),
                "intent": ai_data.get("intent")
            })
        except Exception as e:
            print(f"❌ AI Bridge Error: {str(e)}")
            return Response(
                {"reply": "The AI is currently resting. Please ensure the AI service is running on port 5001."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# --- Rest of the views (Register, ListCreate, Detail, Profile) stay the same ---
# (Keeping them for file completeness)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.create_user(username=username, password=password)
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "This username is already taken."}, status=status.HTTP_400_BAD_REQUEST)

class ListingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ListingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

class UserProfileView(generics.ListAPIView):
    serializer_class = ListingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Listing.objects.filter(owner=self.request.user)
from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # ADD THIS LINE: It sends the seller's email to React
    seller_email = serializers.ReadOnlyField(source='owner.email') 

    class Meta:
        model = Listing
        fields = '__all__'
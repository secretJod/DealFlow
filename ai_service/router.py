from semantic_router import Route
from semantic_router.routers import SemanticRouter
from semantic_router.encoders import HuggingFaceEncoder
from semantic_router.index import LocalIndex

# Define the "Buying" intent (Talks to Django Inventory)
# ai_service/router.py


product_route = Route(
    name="product_search",
    utterances=[
        "what products do you have?", 
        "show me the items",
        "do you have any", # Semantic router understands "do you have any [X]"
        "is there a [...] in stock", 
        "search for",
        "I want to buy",
        "check availability for"
    ],
    score_threshold=0.3 # Adjust this threshold based on testing to balance accuracy and recall
)

# Define the "Selling" intent (Global Knowledge Price Suggestion)
sell_route = Route(
    name="selling_help",
    utterances=[
        "how much is my phone worth?", "suggest a price for my bike",
        "help me value this item", "what is a good selling price?",
        "i want to sell my laptop", "appraise this product"
    ]
)

# Define the "Policy" intent (FAQ logic)
policy_route = Route(
    name="policy_search",
    utterances=[
        "what is your return policy?", "how long does shipping take?",
        "do you offer refunds?", "how can I contact support?"
    ]
)

# Initialize the Brain
encoder = HuggingFaceEncoder()
idx = LocalIndex()
routes = [product_route, sell_route, policy_route]  
rl = SemanticRouter(encoder=encoder, routes=routes,index=idx,auto_sync="local")
if not rl.index.is_ready():
    
    pass 

def get_intent(query):
    try:
        # Check if index is ready before calling
        if rl.index.is_ready():
            result = rl(query)
            return result.name if result else None
        else:
            print("⚠️ Router Index still warming up...")
            return None
    except Exception as e:
        print(f"Router Error: {e}")
        return None
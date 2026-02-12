import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/listings/");
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);

  // The "Buy" Function
  const handleBuy = (item) => {
    const subject = `Interested in ${item.title}`;
    const body = `Hi ${item.owner}, I saw your ad for "${item.title}" on DealFlow and I'd like to buy it for ₹${item.price}. Is it still available?`;

    // This opens the user's default email app (Gmail/Outlook/etc.)
    window.location.href = `mailto:${item.seller_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-teal-900">
        Fresh Recommendations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
          >
            {/* Image Section */}
            <div className="h-48 overflow-hidden bg-gray-200">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h2 className="font-bold text-xl mb-1 truncate">{item.title}</h2>
              <p className="text-2xl font-bold text-teal-900 mb-2">
                ₹ {item.price}
              </p>

              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span>📍 {item.location}</span>
                <span>👤 {item.owner}</span>
              </div>

              {/* THE BUY BUTTON */}
              <button
                onClick={() => handleBuy(item)}
                className="w-full bg-teal-900 text-white font-bold py-2 rounded hover:bg-teal-700 transition-colors"
              >
                Buy Now / Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

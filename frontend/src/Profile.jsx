import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile({ setToken }) {
  const [myAds, setMyAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAds = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyAds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchMyAds();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {/* Header Card */}
      <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-teal-900 flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-teal-700 font-medium italic">
            Welcome back to DealFlow
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md"
        >
          Logout
        </button>
      </div>

      {/* List of Ads */}
      <h2 className="text-xl font-bold mb-6 text-gray-700 uppercase tracking-wide">
        My Active Listings
      </h2>
      {myAds.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-400">You haven't posted any items yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myAds.map((ad) => (
            <div
              key={ad.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-6 border border-gray-100"
            >
              <img
                src={
                  ad.image.startsWith("http")
                    ? ad.image
                    : `http://127.0.0.1:8000${ad.image}`
                }
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
                alt={ad.title}
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
                <p className="text-teal-900 font-bold text-xl">₹{ad.price}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span>📍 {ad.location}</span>
                  <span>📅 {new Date(ad.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="text-sm font-bold text-teal-900 hover:bg-teal-50 px-4 py-2 rounded border border-teal-900 transition-colors">
                Edit Ad
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;

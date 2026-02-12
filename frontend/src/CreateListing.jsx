import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  // 1. Updated State: Added 'category' with a default value
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Electronics", // Default value so it's never empty
    description: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handlePostAd = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    // 2. Prepare FormData: Append the new category field
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("category", formData.category); // <--- Vital Fix
    data.append("description", formData.description);
    data.append("location", formData.location);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/listings/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Ad posted successfully!");
      navigate("/");
    } catch (err) {
      // Debugging: Show backend errors clearly
      if (err.response) {
        console.error("Backend Error Details:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        console.error("Connection Error:", err.message);
      }

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg mt-10 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-teal-900 text-center">
        Post Your Ad
      </h2>

      <form onSubmit={handlePostAd} className="grid gap-5">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Ad Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:border-teal-900 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            className="w-full border p-2 rounded focus:border-teal-900 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>

        {/* Category Dropdown - NEW ADDITION */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            className="w-full border p-2 rounded focus:border-teal-900 outline-none bg-white"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Properties">Properties</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            className="w-full border p-2 rounded h-32 focus:border-teal-900 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:border-teal-900 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded bg-gray-50 cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-teal-900 text-white p-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-all"
        >
          Post Now
        </button>
      </form>
    </div>
  );
}

export default CreateListing;

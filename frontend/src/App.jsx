import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import CreateListing from "./CreateListing";
import Register from "./Register";
import Profile from "./Profile";
import ChatRoom from "./ChatRoom"; // Import the new Chat Interface

function App() {
  // Initialize token state from localStorage
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const navigate = useNavigate();

  // Sync state if localStorage changes
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken !== token) {
      setToken(savedToken);
    }
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Persistent Navbar */}
      <nav className="bg-white p-4 border-b flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-teal-900">
            DealFlow
          </Link>

          {/* Link to the AI Chat Room */}
          <Link
            to="/chat"
            className="hidden md:block font-medium text-gray-600 hover:text-teal-900 transition-colors"
          >
            AI Assistant
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {!token ? (
            <>
              <Link
                to="/login"
                className="font-bold text-gray-700 hover:text-teal-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-bold text-gray-700 hover:text-teal-900"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="font-bold text-gray-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span className="text-xl">👤</span> My Profile
            </Link>
          )}

          <Link
            to="/sell"
            className="bg-white border-4 border-teal-900 px-6 py-1 rounded-full font-bold shadow-sm hover:bg-teal-50 transition-all"
          >
            + SELL
          </Link>
        </div>
      </nav>

      {/* Content Area */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell" element={<CreateListing />} />
          <Route path="/profile" element={<Profile setToken={setToken} />} />
          <Route path="/chat" element={<ChatRoom />} /> {/* New Route */}
        </Routes>
      </main>

      {/* Floating Action Button (FAB) for AI Chat */}
      <Link
        to="/chat"
        className="fixed bottom-8 right-8 bg-teal-900 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform z-40 border-4 border-white"
        title="Chat with AI"
      >
        💬
      </Link>
    </div>
  );
}

export default App;

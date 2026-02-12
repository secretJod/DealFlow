import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("1. Login Button Clicked"); // <--- DEBUG LOG

    try {
      console.log("2. Sending data to Django..."); // <--- DEBUG LOG
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      console.log("3. Django responded!", res.status); // <--- DEBUG LOG

      // Save token
      localStorage.setItem("access_token", res.data.access);
      console.log("4. Token saved to Storage"); // <--- DEBUG LOG

      // Update State
      if (setToken) {
        setToken(res.data.access);
        console.log("5. State Updated"); // <--- DEBUG LOG
      } else {
        console.error("❌ ERROR: setToken function is missing!");
      }

      // Redirect
      console.log("6. Navigating to Home..."); // <--- DEBUG LOG
      navigate("/");
      console.log("7. Navigation command sent"); // <--- DEBUG LOG
    } catch (err) {
      console.error("❌ LOGIN FAILED:", err);
      alert("Login Failed: check console for details");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-teal-900">Login Test</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-teal-900 text-white p-2 rounded font-bold"
        >
          Login (Debug Mode)
        </button>
      </form>
    </div>
  );
}

export default Login;

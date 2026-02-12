import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });
      alert("Registration successful! Now please login.");
      navigate("/login"); // Send them to login page after success
    } catch (err) {
      alert("Registration failed. User might already exist.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-teal-900 mb-6">Join DealFlow</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Choose Username"
          className="border p-3 rounded"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          className="border p-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-teal-900 text-white p-3 rounded-full font-bold hover:bg-teal-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

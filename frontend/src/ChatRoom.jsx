import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your DealFlow Assistant. I can help you find products to buy or suggest prices for items you want to sell. What can I do for you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // --- 1. IMAGE EXTRACTION HELPER ---
  const extractImageUrl = (text) => {
    // Looks for http/https links ending in common image extensions
    const urlRegex = /(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp))/i;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/ai/chat/", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            response.data.reply ||
            "I processed that, but had no specific answer.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting to my brain. Please make sure the backend is running!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[75vh] border border-gray-200">
        {/* Chat Header */}
        <div className="bg-teal-900 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h2 className="font-bold text-lg">Intelligent Assistant</h2>
              <p className="text-xs text-teal-200">Online | Powered by AI</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 scroll-smooth"
        >
          {messages.map((msg, index) => {
            // --- 2. LOGIC TO PROCESS IMAGE ---
            const imageUrl = extractImageUrl(msg.text);
            // Hide the long URL from the text bubble so it looks clean
            const cleanText = imageUrl
              ? msg.text.replace(imageUrl, "").trim()
              : msg.text;

            return (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-sm text-sm ${
                    msg.sender === "user"
                      ? "bg-teal-900 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {/* Render Image if URL exists */}
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="DealFlow Product"
                      className="w-full h-auto max-h-60 object-cover rounded-lg mb-2 shadow-sm border border-gray-100"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}

                  <p className="whitespace-pre-wrap">{cleanText}</p>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t flex gap-3">
          <input
            type="text"
            className="flex-1 bg-gray-100 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-teal-900 transition-all"
            placeholder={loading ? "Thinking..." : "Type your message..."}
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`${loading ? "bg-gray-400" : "bg-teal-900 hover:bg-teal-800"} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95`}
          >
            {loading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;

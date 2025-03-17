import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiSend, FiMic } from "react-icons/fi";
import { useNavigate, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer"; // Ensure this component exists
import wallpaper from "../assets/bg_img.png"; // Use your background image

// Page Components for Routes
const HomePage = () => (
  <div className="p-10 text-gray-200 text-center text-3xl">
    Welcome to MyFinanceMate
  </div>
);
const CalendarPage = () => (
  <div className="p-10 text-gray-200 text-center text-3xl">
    Your Calendar
  </div>
);
const SettingsPage = () => (
  <div className="p-10 text-gray-200 text-center text-3xl">
    Settings
  </div>
);
const ProfilePage = () => (
  <div className="p-10 text-gray-200 text-center text-3xl">
    Profile Information
  </div>
);

// Chat Interface Component with improved alignment
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [awaitingAmount, setAwaitingAmount] = useState(null);

  const botResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes("hello")) {
      return "Hello! How can I assist you with your finances today? 😊";
    }
    if (lowerCaseMessage.includes("income")) {
      setAwaitingAmount("income");
      return "Please enter the income amount.";
    }
    if (lowerCaseMessage.includes("expense")) {
      setAwaitingAmount("expense");
      return "Please enter the expense amount.";
    }
    if (awaitingAmount) {
      const amount = parseFloat(userMessage);
      if (isNaN(amount)) {
        return "That doesn't look like a valid number. Try again!";
      }
      if (awaitingAmount === "income") {
        setIncome(prev => prev + amount);
        setAwaitingAmount(null);
        return `Income increased by $${amount.toFixed(2)}`;
      }
      if (awaitingAmount === "expense") {
        setExpense(prev => prev + amount);
        setAwaitingAmount(null);
        return `Expense increased by $${amount.toFixed(2)}`;
      }
    }
    return "I'm here to help! Try saying 'hello' or type income/expense.";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const reply = botResponse(input);
      setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
    }, 500);
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition!");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const voiceMessage = event.results[0][0].transcript;
      setInput(voiceMessage);
      setTimeout(() => {
        handleSendMessage();
      }, 150);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("An error occurred with speech recognition. Try again.");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  };

  return (
    <div className="relative max-w-2xl mx-auto rounded-2xl shadow-2xl overflow-hidden h-[600px] my-8 bg-white/10 backdrop-blur-lg flex flex-col">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${wallpaper})` }}
      ></div>

      {/* Income & Expense Cards */}
      <div className="relative z-10 flex justify-center gap-4 px-8 pt-6 pb-4">
        <div className="flex-1 max-w-[45%] bg-gradient-to-br from-green-700 to-green-500 p-4 rounded-xl shadow-xl text-center">
          <div className="text-base font-semibold text-gray-50">Income</div>
          <div className="mt-1 text-2xl font-bold text-white">${income.toFixed(2)}</div>
        </div>
        <div className="flex-1 max-w-[45%] bg-gradient-to-br from-red-700 to-red-500 p-4 rounded-xl shadow-xl text-center">
          <div className="text-base font-semibold text-gray-50">Expense</div>
          <div className="mt-1 text-2xl font-bold text-white">${expense.toFixed(2)}</div>
        </div>
      </div>

      {/* Chat Messages Display */}
      <div className="relative z-10 flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-3 rounded-xl shadow transition-transform duration-300 ${
              msg.sender === "user"
                ? "self-end bg-blue-500 text-white text-right"
                : "self-start bg-gray-600 text-gray-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="relative z-10 px-4 py-3 border-t border-gray-700 flex items-center bg-gray-800">
        <input
          type="text"
          className="flex-1 py-2 px-4 rounded-full bg-gray-700 text-gray-300 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition focus:ring-2 focus:ring-indigo-500"
          aria-label="Send message"
          title="Send message"
        >
          <FiSend className="text-white text-xl" />
        </button>
        <button
          onClick={handleVoiceInput}
          className="ml-2 p-3 bg-green-600 rounded-full hover:bg-green-700 transition focus:ring-2 focus:ring-green-500"
          aria-label="Voice input"
          title="Voice input"
        >
          <FiMic className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

// Main Chatbot Component with Improved Sidebar & Header Alignment
const Chatbot = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("User logged out");
    navigate("/"); // Adjust the path as required
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800 to-indigo-700 p-6 shadow-lg">
        <div
          className="text-white font-extrabold text-3xl tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyFinanceMate
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <nav className="w-20 bg-gray-800 flex flex-col items-center py-8 space-y-6 shadow-xl">
          <button
            className="p-3 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            onClick={() => navigate("/")}
            title="Home"
          >
            <FaHome className="text-2xl" />
          </button>
          <button
            className="p-3 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            onClick={() => navigate("/calendar")}
            title="Calendar"
          >
            <FaCalendarAlt className="text-2xl" />
          </button>
          <button
            className="p-3 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            onClick={() => navigate("/settings")}
            title="Settings"
          >
            <FaCog className="text-2xl" />
          </button>
          <button
            className="mt-auto p-3 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            <FaUser className="text-2xl" />
          </button>
          <button
            className="p-3 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            onClick={logout}
            title="Logout"
          >
            <FaSignOutAlt className="text-2xl" />
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Chatbot;
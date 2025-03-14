import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiSend, FiMic } from "react-icons/fi";
import { useNavigate, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer"; // Make sure to create this component or remove it if not needed

// Page components
const HomePage = () => <div className="p-8 text-white">Home Page</div>;
const CalendarPage = () => <div className="p-8 text-white">Calendar Page</div>;
const SettingsPage = () => <div className="p-8 text-white">Settings Page</div>;
const ProfilePage = () => <div className="p-8 text-white">Profile Page</div>;

// Chat Interface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [awaitingAmount, setAwaitingAmount] = useState(null); // Tracks if we're waiting for an amount (income/expense)

  const botResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      return "Hi there! How can I assist you today? 😊";
    }

    if (lowerCaseMessage.includes("income")) {
      setAwaitingAmount("income");
      return "Please provide the amount for the income.";
    }

    if (lowerCaseMessage.includes("expense")) {
      setAwaitingAmount("expense");
      return "Please provide the amount for the expense.";
    }

    if (awaitingAmount) {
      const amount = parseFloat(userMessage);
      if (isNaN(amount)) {
        return "Please enter a valid number.";
      }

      if (awaitingAmount === "income") {
        setIncome((prevIncome) => prevIncome + amount);
        setAwaitingAmount(null);
        return `Income updated by $${amount}.`;
      }

      if (awaitingAmount === "expense") {
        setExpense((prevExpense) => prevExpense + amount);
        setAwaitingAmount(null);
        return `Expense updated by $${amount}.`;
      }
    }

    return "I'm just a simple chatbot. Ask me anything!";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botReply = botResponse(input);
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    }, 500);
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false; // Stop after one sentence
    recognition.interimResults = false; // Only final results

    recognition.start();

    recognition.onresult = (event) => {
      const voiceMessage = event.results[0][0].transcript;
      setInput(voiceMessage); // Update the input field with the voice message
      handleSendMessage(); // Automatically send the voice message
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition failed. Please try again.");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-4 flex flex-col h-[600px] my-8">
      {/* Expense and Income Cards */}
      <div className="flex justify-between mb-4 space-x-4">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 w-1/2">
          <div className="text-white text-lg font-semibold">Income</div>
          <div className="text-3xl mt-2">${income.toFixed(2)}</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 w-1/2">
          <div className="text-white text-lg font-semibold">Expense</div>
          <div className="text-3xl mt-2">${expense.toFixed(2)}</div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-2 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-teal-500 self-end text-right" : "bg-gray-700 self-start"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-3 border-t border-gray-700 p-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
          aria-label="Send message"
        >
          <FiSend className="text-white text-xl" />
        </button>
        <button
          onClick={handleVoiceInput}
          className="p-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
          aria-label="Voice input"
        >
          <FiMic className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

// Main Chatbot Component
const Chatbot = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("User logged out");
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header Navigation */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 p-6 flex justify-between items-center shadow-lg">
        <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate('/')}>
          MyFinanceMate
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Side Menu */}
        <div className="w-20 bg-gray-800 flex flex-col items-center py-6 space-y-8">
          <button
            className="p-3 text-white hover:bg-gray-700 rounded-lg"
            onClick={() => navigate('/')}
          >
            <FaHome className="text-2xl" />
          </button>
          <button
            className="p-3 text-white hover:bg-gray-700 rounded-lg"
            onClick={() => navigate('/calendar')}
          >
            <FaCalendarAlt className="text-2xl" />
          </button>
          <button
            className="p-3 text-white hover:bg-gray-700 rounded-lg"
            onClick={() => navigate('/settings')}
          >
            <FaCog className="text-2xl" />
          </button>

          {/* Profile and Logout Buttons */}
          <button
            className="p-3 text-white hover:bg-gray-700 rounded-lg mt-auto"
            onClick={() => navigate('/profile')}
          >
            <FaUser className="text-2xl" />
          </button>
          <button
            className="p-3 text-white hover:bg-gray-700 rounded-lg"
            onClick={logout}
          >
            <FaSignOutAlt className="text-2xl" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chatbot;
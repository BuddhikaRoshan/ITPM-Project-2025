import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiSend, FiMic } from "react-icons/fi";  // Add this import
import { useNavigate, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";  // Ensure Footer component exists or remove this

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
  const [voiceInput, setVoiceInput] = useState("");

  const botResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today? 😊";
    }
    if (userMessage.toLowerCase().includes("expense")) {
      return "Please provide the amount for the expense.";
    }
    if (userMessage.toLowerCase().includes("income")) {
      return "Please provide the amount for the income.";
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
    recognition.start();

    recognition.onresult = (event) => {
      const voiceMessage = event.results[0][0].transcript;
      setVoiceInput(voiceMessage);
      setMessages([...messages, { text: voiceMessage, sender: "user" }]);
      if (voiceMessage.toLowerCase().includes("expense")) {
        setMessages([...messages, { text: "Please provide the amount for the expense.", sender: "bot" }]);
      }
      if (voiceMessage.toLowerCase().includes("income")) {
        setMessages([...messages, { text: "Please provide the amount for the income.", sender: "bot" }]);
      }
    };

    recognition.onerror = (event) => {
      console.error(event.error);
    };
  };

  const handleAddExpense = (amount) => {
    setExpense((prevExpense) => prevExpense + parseFloat(amount));
  };

  const handleAddIncome = (amount) => {
    setIncome((prevIncome) => prevIncome + parseFloat(amount));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-4 flex flex-col h-[600px] my-8">
      {/* Expense and Income Cards */}
      <div className="flex justify-between mb-4 space-x-4">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 w-1/2">
          <div className="text-white text-lg font-semibold">Income</div>
          <div className="text-3xl mt-2">${income}</div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 w-1/2">
          <div className="text-white text-lg font-semibold">Expense</div>
          <div className="text-3xl mt-2">${expense}</div>
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
            onClick={logout} // Attach logout function here
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

import { useState, useEffect, useRef } from "react";
import { Bot, AlertCircle } from 'lucide-react';
import { askGeminiAboutProduct, testGeminiConnection, debugConfiguration } from '../gemini';

const AIChatWidget = ({ product, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: `Hello! I'm here to help you learn more about the ${product.name}. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('unknown'); // 'good', 'bad', 'unknown'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Test connection when widget opens
  useEffect(() => {
    if (isOpen && connectionStatus === 'unknown') {
      testConnection();
    }
  }, [isOpen]);

  const testConnection = async () => {
    try {
      const result = await testGeminiConnection();
      setConnectionStatus(result.success ? 'good' : 'bad');
      
      if (!result.success) {
        console.warn("❌ Gemini Connection Test Failed:", result.error);
        // Add a system message about connection issues
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "system",
          content: "⚠️ AI connection test failed. Responses may be limited.",
          timestamp: new Date(),
        }]);
      } else {
        console.log("✅ Gemini Connection Test Passed");
      }
    } catch (error) {
      console.error("Connection test error:", error);
      setConnectionStatus('bad');
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuestion = userInput;
    setUserInput("");
    setIsLoading(true);

    // Add debug info to console
    console.log("🤖 Sending Gemini AI request:", {
      question: currentQuestion,
      product: product.name,
      connectionStatus
    });

    try {
      // Use Gemini API with improved error handling
      const aiResponse = await askGeminiAboutProduct(product, currentQuestion, {
        maxLength: 200,
        temperature: 0.7
      });

      console.log("✅ Gemini Response received:", aiResponse);

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Update connection status to good if we got a response
      if (connectionStatus !== 'good') {
        setConnectionStatus('good');
      }

    } catch (error) {
      console.error("💥 Gemini Chat error:", error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: getErrorMessage(error),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setConnectionStatus('bad');
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    const errorString = error.toString().toLowerCase();
    
    if (errorString.includes('quota_exceeded') || errorString.includes('429')) {
      return "API quota exceeded. Please wait a moment before asking another question. ⏳";
    } else if (errorString.includes('safety_blocked')) {
      return "Response was filtered for safety. Please try rephrasing your question. 🛡️";
    } else if (errorString.includes('401') || errorString.includes('403')) {
      return "There's an issue with the Gemini API key. Please check configuration. 🔧";
    } else if (errorString.includes('400')) {
      return "Invalid request format. Please try rephrasing your question. 🔄";
    } else if (errorString.includes('503') || errorString.includes('502')) {
      return "Gemini service is temporarily unavailable. Please try again in a moment. ⏳";
    } else if (errorString.includes('network') || errorString.includes('fetch')) {
      return "Network connection issue. Please check your internet and try again. 🌐";
    }
    
    return "I'm having trouble right now. Please try rephrasing your question or try again later. 😅";
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Debug button for development
  const handleDebug = () => {
    debugConfiguration();
    testConnection();
  };

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-80 h-[500px] bg-white dark:bg-black rounded-3xl shadow-2xl 
                        border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          {/* Header with connection status */}
          <div className="bg-black dark:bg-white text-white dark:text-black p-6 
                          border-b border-gray-800 dark:border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-white dark:bg-black rounded-full flex items-center justify-center">
                    <Bot size={18} className="text-black dark:text-white" />
                  </div>
                  {/* Connection status indicator */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black dark:border-white ${
                    connectionStatus === 'good' ? 'bg-green-400' :
                    connectionStatus === 'bad' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`} title={
                    connectionStatus === 'good' ? 'Gemini Connected' :
                    connectionStatus === 'bad' ? 'Gemini Connection Issues' :
                    'Connecting to Gemini...'
                  } />
                </div>
                <div>
                  <h3 className="font-medium text-base">Gemini AI Assistant</h3>
                  <p className="text-xs opacity-70 truncate max-w-32">
                    Ask about {product.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Debug button (only show in development) */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={handleDebug}
                    className="hover:bg-white/10 dark:hover:bg-black/10 rounded-full p-1 
                              transition-all duration-200 text-xs"
                    title="Debug Gemini AI"
                  >
                    🔍
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 dark:hover:bg-black/10 rounded-full p-2 
                            transition-all duration-200 hover:scale-110"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-gray-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : message.type === "system"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700"
                      : "bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 opacity-60 ${
                    message.type === "user"
                      ? "text-gray-200 dark:text-gray-700"
                      : message.type === "system"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                               rounded-2xl px-4 py-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" 
                         style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" 
                         style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black">
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="Ask about this product..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl 
                         bg-gray-50 dark:bg-gray-900 text-black dark:text-white placeholder-gray-500
                         focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent 
                         outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 
                         disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-black 
                         rounded-2xl px-4 py-3 transition-all duration-200 hover:scale-105 
                         disabled:hover:scale-100 flex items-center justify-center min-w-[48px]"
              >
                <SendIcon />
              </button>
            </div>
            
            {/* Connection status text */}
            {connectionStatus === 'bad' && (
              <div className="flex items-center gap-2 mt-2 text-xs text-red-600 dark:text-red-400">
                <AlertCircle size={12} />
                <span>Gemini AI service having issues</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button with connection status */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 
                   text-white dark:text-black rounded-full p-4 shadow-2xl 
                   hover:shadow-xl transform hover:scale-110 transition-all duration-300
                   border border-gray-800 dark:border-gray-200 ${
                     isOpen ? "rotate-180" : ""
                   }`}
      >
        {/* Connection status indicator on button */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-black ${
          connectionStatus === 'good' ? 'bg-green-400' :
          connectionStatus === 'bad' ? 'bg-red-400' :
          'bg-yellow-400'
        }`} />
        
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <Bot size={24} />
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
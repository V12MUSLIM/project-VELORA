import { useState, useEffect, useRef } from "react";
import { Bot } from 'lucide-react';

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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Simulate AI response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: `I'd be happy to help with that question about the ${product.name}. This product features premium build quality and excellent performance characteristics.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          {/* Header */}
          <div className="bg-black dark:bg-white text-white dark:text-black p-6 
                          border-b border-gray-800 dark:border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white dark:bg-black rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-base">AI Assistant</h3>
                  <p className="text-xs opacity-70 truncate max-w-32">
                    Ask about {product.name}
                  </p>
                </div>
              </div>
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
                      : "bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 opacity-60 ${
                    message.type === "user"
                      ? "text-gray-200 dark:text-gray-700"
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
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 
                   text-white dark:text-black rounded-full p-4 shadow-2xl 
                   hover:shadow-xl transform hover:scale-110 transition-all duration-300
                   border border-gray-800 dark:border-gray-200 ${
                     isOpen ? "rotate-180" : ""
                   }`}
      >
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
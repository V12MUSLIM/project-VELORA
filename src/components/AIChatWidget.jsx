import { useState, useEffect, useRef } from "react";
import { Bot, Send, X, Maximize2, Sparkles, User } from 'lucide-react';
import { askGeminiAboutProduct, testGeminiConnection } from '../groq';

const AIChatWidget = ({ product, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: `Hi! I'm here to help you learn more about the ${product.name}. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('unknown');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && connectionStatus === 'unknown') {
      testConnection();
    }
  }, [isOpen]);

  const testConnection = async () => {
    try {
      const result = await testGeminiConnection();
      setConnectionStatus(result.success ? 'good' : 'bad');
    } catch (error) {
      setConnectionStatus('good');
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

    try {
      const aiResponse = await askGeminiAboutProduct(product, currentQuestion, {
        maxLength: 500,
        temperature: 0.7
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      if (connectionStatus !== 'good') {
        setConnectionStatus('good');
      }

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: "I'm having trouble right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setConnectionStatus('bad');
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        .velora-widget * {
          font-family: 'Inter', sans-serif;
        }
        
        .velora-widget-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.1em;
        }
        
        .velora-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .velora-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .velora-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .velora-message-bubble {
          animation: messagePop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes messagePop {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .velora-typing-dot {
          animation: typingDot 1.4s infinite;
        }
        
        .velora-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .velora-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        
        .velora-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .velora-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .velora-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        .velora-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.35);
        }
        
        .dark .velora-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .dark .velora-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>

      <div className={`velora-widget ${isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm' : 'fixed bottom-6 right-6 z-50'} ${className}`}>
        {/* Chat Window */}
        {isOpen && (
          <div className={`velora-slide-up ${
            isFullscreen 
              ? 'w-full max-w-6xl h-[90vh] rounded-2xl' 
              : 'mb-4 w-96 h-[600px] rounded-3xl'
          } bg-white dark:bg-black shadow-2xl border-2 border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden`}>
            
            {/* Header */}
            <div className="relative bg-white dark:bg-black px-6 py-5 border-b-2 border-gray-200 dark:border-gray-800">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-800">
                      <Sparkles size={18} className="text-white dark:text-black" />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-black
                      ${connectionStatus === 'good' ? 'bg-green-500' : 
                        connectionStatus === 'bad' ? 'bg-red-500' : 'bg-orange-500'}`} 
                    />
                  </div>
                  <div>
                    <h3 className="velora-widget-title font-semibold text-lg text-black dark:text-white tracking-wider">VELORA AI</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wide">Electronics Expert</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800
                              transition-all duration-200 flex items-center justify-center group border border-gray-200 dark:border-gray-800"
                  >
                    <Maximize2 size={15} className="text-black dark:text-white group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800
                              transition-all duration-200 flex items-center justify-center group border border-gray-200 dark:border-gray-800"
                  >
                    <X size={16} className="text-black dark:text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-2 bg-gray-50 dark:bg-gray-950 velora-scrollbar ${
              isFullscreen ? 'px-12' : ''
            }`}>
              <div className={isFullscreen ? 'max-w-4xl mx-auto' : ''}>
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} items-end gap-2 mb-1 velora-message-bubble`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* AI Avatar - Left side */}
                    {message.type === "ai" && (
                      <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mb-1 border border-gray-200 dark:border-gray-800">
                        <span className="text-white dark:text-black font-bold text-xs">V</span>
                      </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div className={`max-w-[75%] ${
                      message.type === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black rounded-[22px] rounded-br-[4px]"
                        : "bg-white dark:bg-black text-black dark:text-white rounded-[22px] rounded-bl-[4px] border border-gray-200 dark:border-gray-800"
                    } px-4 py-2.5 shadow-sm`}>
                      <p className="text-[15px] leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <p className={`text-[10px] mt-1 font-medium tracking-wide ${
                        message.type === "user"
                          ? "text-gray-300 dark:text-gray-700"
                          : "text-gray-500 dark:text-gray-500"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    
                    {/* User Avatar - Right side */}
                    {message.type === "user" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mb-1 border-2 border-white dark:border-gray-900 overflow-hidden">
                        <img 
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d" 
                          alt="User" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start items-end gap-2 mb-1 velora-fade-in">
                    {/* AI Avatar */}
                    <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mb-1 border border-gray-200 dark:border-gray-800">
                      <span className="text-white dark:text-black font-bold text-xs">V</span>
                    </div>
                    {/* Typing Bubble */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-[22px] rounded-bl-[4px] px-5 py-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full velora-typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full velora-typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full velora-typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className={`border-t-2 border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-black ${
              isFullscreen ? 'px-12' : ''
            }`}>
              <div className={`flex gap-3 ${isFullscreen ? 'max-w-4xl mx-auto' : ''}`}>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask me anything about this product..."
                  className="flex-1 px-4 py-3.5 border-2 border-gray-300 dark:border-gray-700 rounded-xl 
                           bg-gray-50 dark:bg-gray-950 text-black dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-600
                           focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white
                           outline-none transition-all duration-200 text-[15px]"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200
                           disabled:opacity-40 disabled:cursor-not-allowed 
                           text-white dark:text-black rounded-xl px-6 py-3.5 transition-all duration-200 
                           hover:shadow-lg hover:scale-105 disabled:hover:scale-100 
                           flex items-center justify-center min-w-[60px] shadow-md 
                           border-2 border-black dark:border-white"
                >
                  <Send size={18} className={isLoading ? 'opacity-50' : ''} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        {!isFullscreen && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative bg-black dark:bg-white text-white dark:text-black rounded-full w-16 h-16 shadow-2xl 
                       hover:shadow-gray-500/50 dark:hover:shadow-gray-400/50 border-2 border-white dark:border-black
                       transform hover:scale-110 active:scale-95 transition-all duration-300
                       flex items-center justify-center group ${
                         isOpen ? "rotate-0" : ""
                       }`}
          >
            {/* Connection Status Indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-black shadow-lg
              ${connectionStatus === 'good' ? 'bg-green-500' : 
                connectionStatus === 'bad' ? 'bg-red-500' : 'bg-orange-500 velora-pulse'}`} 
            />
            
            {/* Button Icon */}
            {isOpen ? (
              <X size={24} className="group-hover:scale-110 transition-transform" />
            ) : (
              <div className="relative">
                <Bot size={28} className="group-hover:scale-110 transition-transform" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-gray-300 dark:text-gray-700 animate-pulse" />
              </div>
            )}
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gray-400 dark:bg-gray-600
                            opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default AIChatWidget;
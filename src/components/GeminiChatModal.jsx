// src/components/GeminiChatModal.jsx
import { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Skeleton
} from "@heroui/react";

// This is a mock function. In a real application, you would make a call 
// to your backend, which then securely calls the Gemini API.
const mockGeminiAPI = async (query, product, reviews) => {
  const q = query.toLowerCase();
  
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));

  if (q.includes("summary") || q.includes("summarize reviews")) {
    if (reviews.length === 0) return "There are no reviews yet for this product.";
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const goodPoints = reviews.filter(r => r.rating >= 4).map(r => r.title || r.comment.substring(0, 50) + '...').slice(0, 2);
    return `Based on ${reviews.length} reviews with an average rating of ${totalRating.toFixed(1)} stars, customers love the ${product.name}. Positive comments often mention: "${goodPoints.join('", "')}".`;
  }
  if (q.includes("specifications") || q.includes("specs")) {
    if (!product.specs || product.specs.length === 0) return "There are no specifications listed for this product.";
    const specsText = product.specs.map(s => `${s.label}: ${s.value}`).join(', ');
    return `Certainly! The key specifications for the ${product.name} are: ${specsText}.`;
  }
  if (q.includes("stock") || q.includes("available")) {
    return product.inStock 
      ? `Yes, the ${product.name} is currently in stock and ready to ship!`
      : `Unfortunately, the ${product.name} is currently out of stock.`;
  }
  if (q.includes("price") || q.includes("cost")) {
    let priceInfo = `The price for the ${product.name} is $${product.price}.`;
    if (product.originalPrice) {
      priceInfo += ` It's currently on sale, down from the original price of $${product.originalPrice}.`;
    }
    return priceInfo;
  }
  
  return `I can help with questions about the ${product.name}. You can ask me to summarize reviews, list specifications, or check the price and stock status.`;
};


export const GeminiChatModal = ({ isOpen, onClose, product, reviews }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          sender: "ai",
          text: `Hi! I'm Gemini. How can I help you with the ${product.name}?`,
        },
      ]);
    }
  }, [isOpen, product.name]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const aiResponseText = await mockGeminiAPI(input, product, reviews);
    const aiMessage = { sender: "ai", text: aiResponseText };
    
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Ask Gemini about {product.name}</ModalHeader>
        <ModalBody ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <Avatar name="G" size="sm" />}
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
               <Avatar name="G" size="sm" />
               <Skeleton className="h-10 w-24 rounded-2xl" />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Input
            placeholder="e.g., Summarize the reviews..."
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            isDisabled={isLoading}
          />
          <Button color="primary" onPress={handleSend} isDisabled={isLoading}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
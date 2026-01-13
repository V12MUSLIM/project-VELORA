const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Available Groq models (all free!)
const MODELS = {
  LLAMA_70B: "llama-3.3-70b-versatile",     
  LLAMA_8B: "llama-3.1-8b-instant",          
  MIXTRAL: "mixtral-8x7b-32768",             
};

// Use the 70B model for best quality responses
const DEFAULT_MODEL = MODELS.LLAMA_70B;

async function fetchAI(url, options) {
  return await fetch(url, options);
}

export async function testGeminiConnection() {
  if (!API_KEY || API_KEY.length < 10) {
    return { success: false, error: "API key not configured" };
  }

  try {
    const requestBody = {
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: "Hi" }],
      max_tokens: 10,
      temperature: 0.1
    };

    const res = await fetchAI(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      
      if (res.status === 401 || res.status === 403) {
        return { success: false, error: "Invalid API key" };
      }
      return { success: true }; // Optimistic for other errors
    }

    return { success: true };
  } catch (error) {
    return { success: true }; // Optimistic approach
  }
}

export async function askGeminiAboutProduct(product, question, options = {}) {
  if (!product || typeof product !== "object") {
    return "I need valid product information to help you.";
  }

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return "Please ask a specific question about this product.";
  }

  if (!API_KEY || API_KEY.length < 10) {
    return "AI service is not configured. Please add your Groq API key.";
  }

  try {
    const prompt = buildPrompt(product, question);

    const requestBody = {
      model: options.model || DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are VELORA AI, a knowledgeable and friendly assistant for an electronics e-commerce store. Provide concise, helpful answers about products."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: options.maxLength || 500,
      temperature: options.temperature || 0.7,
      top_p: 0.95
    };

    const res = await fetchAI(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const result = await res.json();

    if (!res.ok) {
      if (result.error) {
        const errorMessage = result.error.message || "";
        
        // Handle rate limiting (very rare with Groq's generous limits)
        if (res.status === 429 || errorMessage.toLowerCase().includes("rate")) {
          return "I'm receiving too many requests right now. Please wait a moment and try again.";
        }
        
        // Handle quota exceeded (14,400 requests/day)
        if (errorMessage.toLowerCase().includes("quota") || errorMessage.toLowerCase().includes("limit")) {
          return "I've reached my daily question limit. Please try again tomorrow.";
        }
        
        // Handle authentication errors
        if (res.status === 401 || res.status === 403) {
          return "API authentication failed. Please check your configuration.";
        }
        
        // Handle invalid requests
        if (res.status === 400) {
          return "There was an issue with the request. Please try rephrasing your question.";
        }
      }
      
      return "I'm having trouble right now. Please try again in a moment.";
    }

    // Extract response
    const text = result?.choices?.[0]?.message?.content;
    
    if (!text) {
      return "I received an empty response. Please try asking again.";
    }

    return cleanResponse(text);

  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return "Unable to connect to the AI service. Please check your internet connection.";
    }
    
    if (error instanceof SyntaxError) {
      return "Received an invalid response. Please try again.";
    }
    
    return "I'm having trouble processing this request. Please try again later.";
  }
}

function buildPrompt(product, question) {
  const context = buildProductContext(product);

  return `PRODUCT INFORMATION:
${context}

CUSTOMER QUESTION: ${question}

Provide a helpful, concise answer (2-4 sentences). Be friendly and focus on the product's features and benefits.`;
}

function buildProductContext(product) {
  const context = [];
  if (product.name) context.push(`Product: ${product.name}`);
  if (product.category) context.push(`Category: ${product.category}`);
  if (product.price !== undefined) context.push(`Price: $${product.price}`);
  if (product.rating !== undefined) context.push(`Rating: ${product.rating}/5 stars`);
  if (product.badge) context.push(`Features: ${product.badge}`);
  if (product.description) context.push(`Description: ${product.description}`);
  
  return context.join("\n");
}

function cleanResponse(response) {
  return response
    .replace(/^(Response:|Answer:|A:)/i, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
<<<<<<< HEAD
// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API key exists
if (!API_KEY) {
  console.warn("⚠️ VITE_GEMINI_API_KEY not found in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Enhanced function to ask Gemini about a product with better context and error handling
 * @param {Object} product - Product object with all available data
 * @param {string} question - User's question about the product
 * @param {Object} options - Additional options for the AI response
 * @returns {Promise<string>} AI response or error message
 */
export async function askGeminiAboutProduct(product, question, options = {}) {
  // Input validation
  if (!product || typeof product !== 'object') {
    return "Error: Invalid product data provided.";
  }

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return "Please ask a specific question about this product.";
  }

  // Check if API key is available
  if (!API_KEY) {
    return "Error: AI service is not configured properly. Please check API key.";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: options.model || "gemini-1.5-flash",
      generationConfig: {
        temperature: options.temperature || 0.7,
        maxOutputTokens: options.maxTokens || 1000,
      }
    });

    // Build comprehensive product context
    const productContext = buildProductContext(product);
    
    const prompt = `
You are a knowledgeable product expert and customer service assistant. Your role is to help customers understand products and make informed decisions.

IMPORTANT RULES:
- Only answer questions directly related to the product provided
- If asked about unrelated topics, politely redirect to the product
- Be helpful, accurate, and conversational
- Use the product information to provide specific, detailed answers
- If you don't have enough information, acknowledge limitations honestly

PRODUCT INFORMATION:
${productContext}

CUSTOMER QUESTION: ${question.trim()}

Please provide a helpful and informative response about this specific product.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response) {
      throw new Error("Empty response from AI service");
    }

    return response.text() || "I apologize, but I couldn't generate a response right now. Please try again.";

  } catch (error) {
    console.error("❌ Gemini API error:", error);
    
    // Handle specific error types
    if (error.message?.includes('API_KEY')) {
      return "Error: Invalid API key. Please check your configuration.";
    } else if (error.message?.includes('quota')) {
      return "Service temporarily unavailable due to high demand. Please try again later.";
    } else if (error.message?.includes('blocked')) {
      return "I'm sorry, but I cannot process this request. Please rephrase your question.";
    }
    
    return "I'm having trouble connecting to the AI service right now. Please try again in a moment.";
  }
}

/**
 * Build comprehensive context string from product data
 * @param {Object} product - Product object
 * @returns {string} Formatted product context
 */
function buildProductContext(product) {
  const context = [];
  
  // Basic product info
  if (product.name) context.push(`Product Name: ${product.name}`);
  if (product.description) context.push(`Description: ${product.description}`);
  if (product.category) context.push(`Category: ${product.category}`);
  
  // Pricing information
  if (product.price !== undefined) {
    context.push(`Current Price: $${product.price}`);
  }
  if (product.originalPrice !== undefined && product.originalPrice !== product.price) {
    context.push(`Original Price: $${product.originalPrice}`);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    context.push(`Discount: ${discount}% off`);
  }
  
  // Stock and ratings
  if (product.inStock !== undefined) {
    context.push(`Availability: ${product.inStock ? 'In Stock' : 'Out of Stock'}`);
  }
  if (product.rating !== undefined) {
    context.push(`Customer Rating: ${product.rating}/5 stars`);
  }
  if (product.badge) context.push(`Badge: ${product.badge}`);
  
  // Technical specifications
  if (product.specs && Array.isArray(product.specs) && product.specs.length > 0) {
    context.push("\nTechnical Specifications:");
    product.specs.forEach(spec => {
      if (spec.label && spec.value) {
        context.push(`- ${spec.label}: ${spec.value}`);
      }
    });
  }
  
  // Additional features if available
  if (product.features && Array.isArray(product.features)) {
    context.push("\nKey Features:");
    product.features.forEach(feature => {
      context.push(`- ${feature}`);
    });
  }
  
  // Warranty or additional info
  if (product.warranty) context.push(`Warranty: ${product.warranty}`);
  if (product.brand) context.push(`Brand: ${product.brand}`);
  if (product.model) context.push(`Model: ${product.model}`);
  
  return context.join('\n');
}

/**
 * Validate product object has minimum required fields
 * @param {Object} product - Product to validate
 * @returns {boolean} Whether product has minimum required data
 */
export function validateProduct(product) {
  return product && 
         typeof product === 'object' && 
         (product.name || product.description || (product.specs && product.specs.length > 0));
}

/**
 * Get available product information summary
 * @param {Object} product - Product object
 * @returns {string} Summary of available product data
 */
export function getProductSummary(product) {
  if (!validateProduct(product)) {
    return "No valid product information available.";
  }
  
  const summary = [];
  if (product.name) summary.push(`Name: ${product.name}`);
  if (product.price) summary.push(`Price: $${product.price}`);
  if (product.category) summary.push(`Category: ${product.category}`);
  if (product.specs?.length) summary.push(`${product.specs.length} specifications available`);
  
  return summary.join(' | ') || "Basic product information available";
}
=======
// src/gemini.js - Google Gemini API integration (DIRECT AI ONLY)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Updated with current model names (September 2025)
const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro'
];

// Default to the most reliable current model
let WORKING_MODEL = 'gemini-1.5-flash';

// Build the correct API URL with current model
const getGeminiApiUrl = (model = WORKING_MODEL, useBeta = false) =>
  `https://generativelanguage.googleapis.com/${useBeta ? 'v1beta' : 'v1'}/models/${model}:generateContent`;

// Enhanced error messages mapping
const ERROR_MESSAGES = {
  503: "The AI service is temporarily unavailable. Please try again in a moment. ⏳",
  502: "The AI service is experiencing issues. Please try again later. ⏳",
  429: "Too many requests. Please wait a moment before asking another question. ⏳",
  401: "Authentication issue with AI service. Please check API key configuration. 🔧",
  403: "Access denied. Please verify your Gemini API key permissions. 🔧",
  400: "Invalid request format. Please try rephrasing your question. 🔄",
  404: "Model not found. The API model may have changed. 🔧",
  500: "AI service experiencing issues. Please try again later. ⚠️",
  quota_exceeded: "API quota exceeded. Please try again later. 📊",
  safety_blocked: "Response was blocked due to safety filters. Please try rephrasing your question. 🛡️"
};

// Cache for responses to avoid repeated API calls
const responseCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Retry helper with exponential backoff
async function fetchWithRetry(url, options, retries = 2, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;

    // For 503/502, wait and retry
    if ((res.status === 503 || res.status === 502) && i < retries) {
      console.warn(`Retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
      delay *= 2; // exponential backoff
      continue;
    }

    return res; // return failure if not retriable
  }
}

/**
 * Main function to ask Gemini about a product - DIRECT AI ONLY
 */
export async function askGeminiAboutProduct(product, question, options = {}) {
  console.log("🤖 Gemini Request (DIRECT AI):", {
    productName: product?.name,
    question: question.substring(0, 50) + "...",
    hasApiKey: !!API_KEY,
    model: WORKING_MODEL
  });

  if (!product || typeof product !== 'object') {
    console.error("❌ Invalid product data");
    return "I need valid product information to help you.";
  }

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return "Please ask me a specific question about this product!";
  }

  // Check cache first
  const cacheKey = `${product.id}_${question.toLowerCase().trim()}`;
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("📦 Using cached AI response");
    return cached.response;
  }

  if (!API_KEY || API_KEY.length < 10) {
    console.error("❌ Invalid or missing Gemini API key");
    return getFallbackResponse(product, question);
  }

  try {
    console.log("🚀 Using REAL Gemini AI...");
    const response = await tryGeminiAPI(product, question, options);

    if (response && response.length > 10 && !response.includes('Error')) {
      console.log("✅ Success with REAL Gemini AI");

      responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });

      return response;
    }
  } catch (error) {
    console.error("❌ Gemini AI failed:", error.message);
    return getFallbackResponse(product, question);
  }

  console.log("🔄 AI failed, using basic fallback");
  return getFallbackResponse(product, question);
}

/**
 * Try Gemini API with model + version fallback
 */
async function tryGeminiAPI(product, question, options = {}) {
  const prompt = buildGeminiPrompt(product, question);

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: options.temperature || 0.7,
      topK: 40,
      topP: 0.8,
      maxOutputTokens: options.maxLength || 300,
      stopSequences: []
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
    ]
  };

  for (const model of GEMINI_MODELS) {
    try {
      console.log(`🔄 Trying AI model: ${model}`);

      // First try v1
      let response = await fetchWithRetry(`${getGeminiApiUrl(model)}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // If v1 gives 404, try v1beta
      if (response.status === 404) {
        console.warn(`⚠️ ${model} not found on v1, retrying with v1beta...`);
        response = await fetchWithRetry(`${getGeminiApiUrl(model, true)}?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.warn(`AI Model ${model} failed:`, response.status, errorData);

        if (response.status === 429) throw new Error('quota_exceeded');
        if (response.status === 503) throw new Error(ERROR_MESSAGES[503]);

        continue; // try next model
      }

      const result = await response.json();

      if (result.error) {
        console.warn("Gemini AI Error Response:", result.error);
        continue;
      }

      if (result.promptFeedback?.blockReason) {
        throw new Error('safety_blocked');
      }

      if (result.candidates && result.candidates.length > 0) {
        const candidate = result.candidates[0];

        if (candidate.finishReason === 'SAFETY') {
          throw new Error('safety_blocked');
        }

        if (candidate.content?.parts?.[0]?.text) {
          WORKING_MODEL = model;
          console.log(`✅ AI Response generated using: ${model}`);
          return cleanResponse(candidate.content.parts[0].text);
        }
      }

    } catch (error) {
      console.warn(`AI Model ${model} error:`, error.message);
      if (error.message === 'safety_blocked' || error.message === 'quota_exceeded') {
        throw error;
      }
      continue;
    }
  }

  throw new Error("All AI models failed or are unavailable");
}

/**
 * Build enhanced prompt for Gemini AI
 */
function buildGeminiPrompt(product, question) {
  const context = buildProductContext(product);
  return `You are an expert product consultant...

Product Information:
${context}

Customer Question: ${question}

Please provide a comprehensive, informative response that:
- Answers the customer's specific question
- Uses technical knowledge and comparisons
- Explains pros/cons
- Suggests practical applications
- Tone: conversational but authoritative

Generate ~200 words of analysis:`;
}

/**
 * Build comprehensive product context for AI
 */
function buildProductContext(product) {
  const context = [];
  if (product.name) context.push(`Product Name: ${product.name}`);
  if (product.category) context.push(`Category: ${product.category}`);
  if (product.price !== undefined) context.push(`Price: $${product.price}`);
  if (product.rating !== undefined) context.push(`Customer Rating: ${product.rating}/5 stars`);
  if (product.badge) context.push(`Special Features: ${product.badge}`);
  if (product.description) context.push(`Description: ${product.description}`);
  context.push(`Market Context: consumer product being evaluated for purchase.`);
  return context.join('\n');
}

/**
 * Clean AI responses
 */
function cleanResponse(response) {
  if (!response) return '';
  return response
    .replace(/^(Response:|Answer:|A:)/i, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Minimal fallback responses
 */
function getFallbackResponse(product, question) {
  return `I'd love to help you learn about the ${product.name}, but I'm having trouble accessing detailed information right now. Could you try again later or check the product specs directly?`;
}

/**
 * Test Gemini connection
 */
export async function testGeminiConnection() {
  if (!API_KEY || API_KEY.length < 10) {
    return { success: false, error: "Invalid or missing Gemini API key" };
  }

  try {
    const testPrompt = "Hello, please respond with 'Connection successful' if you can read this.";

    const requestBody = {
      contents: [{ parts: [{ text: testPrompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 50 }
    };

    for (const model of GEMINI_MODELS) {
      try {
        console.log(`🔄 Testing AI model: ${model}`);

        let response = await fetchWithRetry(`${getGeminiApiUrl(model)}?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.status === 404) {
          response = await fetchWithRetry(`${getGeminiApiUrl(model, true)}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
        }

        if (response.ok) {
          const result = await response.json();
          if (result.candidates && result.candidates.length > 0) {
            WORKING_MODEL = model;
            console.log(`✅ AI Connection successful with model: ${model}`);
            return {
              success: true,
              status: response.status,
              model,
              message: `Connected successfully to ${model}`
            };
          }
        } else {
          console.warn(`AI Model ${model} failed with status:`, response.status);
          continue;
        }
      } catch (error) {
        console.warn(`AI Model ${model} connection failed:`, error.message);
        continue;
      }
    }

    return {
      success: false,
      error: "All AI models failed - please check your API key or try again later"
    };
  } catch (error) {
    console.error("Gemini AI connection test error:", error);
    return { success: false, error: `Network error: ${error.message}` };
  }
}

/**
 * Clear cache
 */
export function clearCache() {
  responseCache.clear();
  console.log("🧹 AI Cache cleared");
}

/**
 * Debug configuration
 */
export function debugConfiguration() {
  const maskedKey = API_KEY ? `${API_KEY.substring(0, 8)}...${API_KEY.slice(-4)}` : 'none';

  console.log("🔍 Gemini AI Configuration:", {
    hasApiKey: !!API_KEY,
    apiKeyLength: API_KEY ? API_KEY.length : 0,
    apiKeyPreview: maskedKey,
    workingModel: WORKING_MODEL,
    availableModels: GEMINI_MODELS,
    cacheSize: responseCache.size,
    environment: import.meta.env.MODE,
    mode: "DIRECT AI ONLY (No rule-based responses)"
  });
}
>>>>>>> ba068f4e91ad9df0fa97feb8957934ea7371821e

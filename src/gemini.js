// src/gemini.js - Google Gemini API integration (DIRECT AI ONLY)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Updated with current model names (September 2025)
const GEMINI_MODELS = [
  'gemini-1.5-flash',     // Fast and versatile (recommended for most use cases)
  'gemini-1.5-pro',       // More capable but slower
  'gemini-2.0-flash',     // Latest model with improved capabilities
  'gemini-2.5-flash',     // Best price-performance ratio
  'gemini-2.5-pro'        // Most advanced model
];

// Default to the most reliable current model
let WORKING_MODEL = 'gemini-1.5-flash';

// Build the correct API URL with current model
const getGeminiApiUrl = (model = WORKING_MODEL) => 
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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

  // Input validation
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

  // Check API key
  if (!API_KEY || API_KEY.length < 10) {
    console.error("❌ Invalid or missing Gemini API key");
    return getFallbackResponse(product, question);
  }

  // Go DIRECTLY to Gemini AI (skip rule-based responses)
  try {
    console.log("🚀 Using REAL Gemini AI...");
    const response = await tryGeminiAPI(product, question, options);
    
    if (response && response.length > 10 && !response.includes('Error')) {
      console.log("✅ Success with REAL Gemini AI");
      
      // Cache the response
      responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });
      
      return response;
    }
  } catch (error) {
    console.error("❌ Gemini AI failed:", error.message);
    
    // Only use fallback as last resort
    return getFallbackResponse(product, question);
  }

  // Final fallback if AI completely fails
  console.log("🔄 AI failed, using basic fallback");
  return getFallbackResponse(product, question);
}

/**
 * Try Gemini API with model fallback
 */
async function tryGeminiAPI(product, question, options = {}) {
  const prompt = buildGeminiPrompt(product, question);
  
  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: options.temperature || 0.7,
      topK: 40,
      topP: 0.8,
      maxOutputTokens: options.maxLength || 300, // Increased for better responses
      stopSequences: []
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  // Try each model until one works
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`🔄 Trying AI model: ${model}`);
      
      const response = await fetch(`${getGeminiApiUrl(model)}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.warn(`AI Model ${model} failed:`, response.status, errorData);
        
        // If it's a 404, try the next model
        if (response.status === 404) {
          continue;
        }
        
        // For other errors, throw to try next model
        if (response.status === 429) {
          throw new Error('quota_exceeded');
        }
        
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        console.warn("Gemini AI Error Response:", result.error);
        continue; // Try next model
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
          // Update working model for future requests
          WORKING_MODEL = model;
          console.log(`✅ AI Response generated using: ${model}`);
          return cleanResponse(candidate.content.parts[0].text);
        }
      }
      
    } catch (error) {
      console.warn(`AI Model ${model} error:`, error.message);
      // Continue to next model unless it's a safety block
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
  
  return `You are an expert product consultant with deep knowledge of technology, specifications, and market comparisons. You're helping a customer understand products in detail.

Product Information:
${context}

Customer Question: ${question}

Please provide a comprehensive, informative response that:
- Directly answers the customer's specific question
- Uses technical knowledge and industry insights
- Compares with similar products when relevant
- Explains benefits and potential drawbacks
- Suggests practical applications or use cases
- Keeps the tone conversational but authoritative

Generate a detailed response (200-300 words) that demonstrates real AI understanding and analysis:`;
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
  
  if (product.description) {
    context.push(`Product Description: ${product.description}`);
  }
  
  // Add context for better AI responses
  context.push(`Market Context: This is a consumer product being evaluated for purchase decision.`);
  context.push(`Response Goal: Help the customer make an informed decision with expert-level insights.`);
  
  return context.join('\n');
}

/**
 * Clean AI responses
 */
function cleanResponse(response) {
  if (!response) return '';
  
  return response
    .replace(/^(Response:|Answer:|A:)/i, '')
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Minimal fallback responses (only when AI completely fails)
 */
function getFallbackResponse(product, question) {
  return `I'd love to help you learn about the ${product.name}, but I'm having trouble accessing detailed information right now. Could you try asking your question again, or check the product specifications directly?`;
}

/**
 * Test Gemini connection with current models
 */
export async function testGeminiConnection() {
  if (!API_KEY || API_KEY.length < 10) {
    return { success: false, error: "Invalid or missing Gemini API key" };
  }

  try {
    const testPrompt = "Hello, please respond with 'Connection successful' if you can read this.";
    
    const requestBody = {
      contents: [{
        parts: [{
          text: testPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 50
      }
    };

    // Try each model until one works
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`🔄 Testing AI model: ${model}`);
        
        const response = await fetch(`${getGeminiApiUrl(model)}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.candidates && result.candidates.length > 0) {
            WORKING_MODEL = model;
            console.log(`✅ AI Connection successful with model: ${model}`);
            return { 
              success: true,
              status: response.status,
              model: model,
              message: `Successfully connected to real AI using ${model}`
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
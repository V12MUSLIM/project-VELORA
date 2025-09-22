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
  if (!product || typeof product !== 'object') {
    return "I need valid product information to help you.";
  }

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return "Please ask me a specific question about this product!";
  }

  // Check cache first
  const cacheKey = `${product.id}_${question.toLowerCase().trim()}`;
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.response;
  }

  if (!API_KEY || API_KEY.length < 10) {
    return getFallbackResponse(product, question);
  }

  try {
    const response = await tryGeminiAPI(product, question, options);

    if (response && response.length > 10 && !response.includes('Error')) {
      responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });

      return response;
    }
  } catch (error) {
    return getFallbackResponse(product, question);
  }

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
      // First try v1
      let response = await fetchWithRetry(`${getGeminiApiUrl(model)}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // If v1 gives 404, try v1beta
      if (response.status === 404) {
        response = await fetchWithRetry(`${getGeminiApiUrl(model, true)}?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
      }

      if (!response.ok) {
        if (response.status === 429) throw new Error('quota_exceeded');
        if (response.status === 503) throw new Error(ERROR_MESSAGES[503]);
        continue; // try next model
      }

      const result = await response.json();

      if (result.error) {
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
          return cleanResponse(candidate.content.parts[0].text);
        }
      }

    } catch (error) {
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
            return {
              success: true,
              status: response.status,
              model,
              message: `Connected successfully to ${model}`
            };
          }
        } else {
          continue;
        }
      } catch (error) {
        continue;
      }
    }

    return {
      success: false,
      error: "All AI models failed - please check your API key or try again later"
    };
  } catch (error) {
    return { success: false, error: `Network error: ${error.message}` };
  }
}

/**
 * Clear cache
 */
export function clearCache() {
  responseCache.clear();
}

/**
 * Debug configuration - minimal version for production debugging only
 */
export function debugConfiguration() {
  const maskedKey = API_KEY ? `${API_KEY.substring(0, 8)}...${API_KEY.slice(-4)}` : 'none';

  return {
    hasApiKey: !!API_KEY,
    workingModel: WORKING_MODEL,
    cacheSize: responseCache.size,
    apiKeyPreview: maskedKey
  };
}
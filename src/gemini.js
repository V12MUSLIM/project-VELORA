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
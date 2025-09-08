// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function askGeminiAboutProduct(product, question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a helpful AI assistant.
      The user is asking about this product:
      Name: ${product.name}
      Specs: ${JSON.stringify(product.specs || [], null, 2)}

      Question: ${question}
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("❌ Gemini error:", err);
    return "Sorry, I couldn’t answer that right now.";
  }
}

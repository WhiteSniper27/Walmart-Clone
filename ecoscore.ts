import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Prompt template (shortened for space – you can paste your full one)
const prompt = `
You are an AI sustainability assistant for an eco-friendly shopping platform.

Your task is to evaluate the environmental impact of a product based on its description and/or image...
`;

export async function getEcoScore(description: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([prompt, description]);
  const text = result.response.text();

  const match = text.match(/EcoScore:\s*(\d+|N\/A)/);
  const score = match ? match[1] : "N/A";

  return { score, response: text };
}

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize securely - in a real app, backend proxy is preferred.
// Here we assume the environment variable is injected by the platform.
const ai = new GoogleGenAI({ apiKey });

export const generateListingDescription = async (
  title: string,
  condition: string,
  category: string,
  keywords: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning default description.");
    return "Beautiful item in great condition. Contact seller for more details.";
  }

  try {
    const prompt = `
      Write a professional, attractive, and concise sales description (approx 50-80 words) for a clothing item being sold on a marketplace.
      
      Details:
      - Item: ${title}
      - Category: ${category}
      - Condition: ${condition}
      - Key Features: ${keywords}
      
      Tone: Stylish, inviting, and trustworthy.
      Format: Plain text, no markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description. Please try again or write your own.";
  }
};
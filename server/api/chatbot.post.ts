import { GoogleGenAI } from '@google/genai';

const config = useRuntimeConfig();

// Read API key from environment config
const geminiApiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { message, history = [] } = body;

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    const contents = [
      ...history.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: "You are an intelligent, professional AI assistant for KENAS (Kenya Accreditation Service). Provide clear, accurate answers. Engage in a natural conversational tone, but be concise.",
        temperature: 0.7,
        thinkingConfig: {
          includeThoughts: true,
        }
      }
    });

    let thoughts = "";
    let answer = "";

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (!part.text) continue;
        if (part.thought) {
          thoughts += part.text + "\n\n";
        } else {
          answer += part.text;
        }
      }
    } else {
      answer = response.text || "";
    }

    return { 
      reply: answer.trim(),
      thoughts: thoughts.trim()
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to output response from AI',
    });
  }
});

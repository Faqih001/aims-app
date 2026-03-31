import { GoogleGenerativeAI } from '@google/generative-ai';

const config = useRuntimeConfig();
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

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
    // Determine the right model, ideally gemini-1.5-flash for standard chat tasks
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are a helpful, professional AI assistant for KENAS (The Kenya Accreditation Service). Provide clear, concise, and friendly answers about accreditation, standards, and services. Only format with markdown when needed.'
    });

    // Map history to Gemini format
    // Vue sends: { role: 'user' | 'model', parts: [{ text: '...'}] }
    const formattedHistory = [
      ...history.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    ];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return { reply: text };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get response from AI',
    });
  }
});

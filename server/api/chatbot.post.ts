import { GoogleGenerativeAI } from '@google/generative-ai';

const config = useRuntimeConfig();
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a helpful assistant for The Kenya Accreditation Service (KENAS).' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Great! How can I help you today?' }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
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
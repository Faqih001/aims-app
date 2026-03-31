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
    // Upgraded to a more capable model, instructing it to think aloud if it helps.
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are a helpful, professional AI assistant for KENAS. Provide clear answers. Before giving the final answer, you MUST ALWAYS write your internal reasoning inside <think>...</think> tags. Then provide the final user-facing answer below it. Be concise.'
    });

    const formattedHistory = [
      ...history.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    ];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 2000,
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
      statusMessage: 'Failed to output response from AI',
    });
  }
});

const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
// const MAX_TOKENS = 500;

exports.RunPrompt = async prompt => {
  try {
    const result = await model.generateContent(prompt);

    // const result = await model.generateContent({
    //   contents: [{ role: 'user', parts: [{ text: prompt }] }],
    //   generationConfig: {
    //     // maxOutputTokens: MAX_TOKENS,
    //     temperature: 0.5, // Controls randomness (0-1)
    //     topK: 40, // Limits vocabulary diversity
    //     topP: 0.92,
    //   },
    // });

    return result.response.text();
  } catch (error) {
    console.log('Error in RunPrompt:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};

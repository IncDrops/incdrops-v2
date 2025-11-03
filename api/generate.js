// This file is: /api/generate.js
// It's the BACKEND, which is why it can safely use the API key.

import { GoogleGenerativeAI } from '@google/generative-ai';

// Get the API key from Vercel's Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// This function handles all requests to /api/generate
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- 1. Get Form Data ---
  // Get the form data from the frontend
  const { industry, targetAudience, services, contentType } = req.body;

  // --- 2. Check for API Key ---
  // Safety check: Make sure the API key is set on Vercel
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing API key. Please add GEMINI_API_KEY to your Vercel project.' });
  }

  try {
    // --- 3. Build the Prompt ---
    // This is the prompt we send to Google AI
    const prompt = `
      You are an expert content marketing strategist. Generate 8 content ideas based on the following inputs.
      Return the ideas as a valid JSON array. Do NOT include any text before or after the JSON array.

      Each idea in the array should be an object with this exact structure:
      {
        "title": "A catchy, short title for the content",
        "description": "A 2-3 sentence detailed description of the content idea, explaining the angle and value.",
        "platforms": ["Platform 1", "Platform 2"],
        "hashtags": ["#hashtag1", "#hashtag2"],
        "type": "${contentType || 'social'}"
      }

      Here is the user's data:
      - Industry: ${industry || 'general business'}
      - Target Audience: ${targetAudience || 'general audience'}
      - Services/Products: ${services || 'various products'}
      - Content Type: ${contentType || 'social post'}
    `;

    // --- 4. Call Google AI ---
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // --- 5. Send Response to Frontend ---
    // The AI's response text IS the JSON, so we parse it and send it
    // We do this so your frontend logic in Generator.jsx doesn't need to change
    const jsonData = JSON.parse(text);

    // Send the JSON data back to the frontend (Generator.jsx)
    return res.status(200).json({
      // This structure matches what your frontend expects!
      candidates: [{
        content: {
          parts: [{ text: JSON.stringify(jsonData) }]
        }
      }]
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ error: 'Failed to generate ideas.' });
  }
}
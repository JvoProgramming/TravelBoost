import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Enable CORS for your React app running on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173'  // Allow requests from your React app
}));

app.use(express.json());

// Define OpenRouter API URL
const OPEN_ROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

const headers = {
  'Authorization': `Bearer ${OPEN_ROUTER_API_KEY}`,
  'Content-Type': 'application/json',  // Ensure the content type is set correctly
};

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  // Validate user input
  if (!question) {
    return res.status(400).json({ error: 'Please provide a question.' });
  }
const prompt  = "You are a travel agent and absolutely only answer questions pertaining to trip planning. Try to provide links where possible and provide a nice format with line breaks and proper spacing. keep reponses as clear to the question and don't hallucinate and additional response not pertaining to a travel advisor";
  try {
    // Make the request to OpenRouter API
    const response = await axios.post(
      OPEN_ROUTER_API_URL,
      {
        model: "deepseek/deepseek-r1:free",  // Specify the GPT-4 model (replace with the correct name if needed)
        messages: [
          { role: "user", content: prompt + question }  // Adjust this to match OpenRouter's expected format
        ],
      },
      { headers }
    );

    if (response.data && response.data.choices && response.data.choices[0]) {
      // Send back the result from OpenRouter's response
      res.json({ answer: response.data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Unexpected response format from API.' });
    }
  } catch (error) {
    console.error('Error processing the question:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while processing your request.' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

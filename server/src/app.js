import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// fetch api keys from environment variables
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const OPEN_ROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

const app = express();
const port = 3000;

//CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());


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

app.post('/scan', async (req, res) => {
  console.log('Scan request received', req.body.locationData.href);
  const { title, locationData, timestamp } = req.body;

  if (!HUGGINGFACE_API_KEY) {
    console.error('Hugging Face API key not found');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `<s>[INST] You are a travel deal finder. If data property is not found in an object, provide mock data for the property. Based on this URL:
          URL: ${locationData.href}

          Return a JSON object matching ONE of these exact structures based on the URL type:

          For hotels:
          {
            "category": "hotel",
            "deals": [{
              "hotelName": "name of hotel",
              "location": "city, state",
              "pricePerNight": "price as string no dollar sign",
              "originalPrice": "original price as string no dollar sign",
              "checkIn": "YYYY-MM-DD",
              "checkOut": "YYYY-MM-DD",
              "url": "booking url"
            }]
          }

          For flights:
          {
            "category": "flight",
            "deals": [{
              "airline": "airline name",
              "description": "flight details",
              "price": "price as string no dollar sign",
              "originalPrice": "original price as string no dollar sign",
              "departureDate": "YYYY-MM-DD",
              "returnDate": "YYYY-MM-DD",
              "url": "booking url"
            }]
          }

          For cars:
          {
            "category": "car",
            "deals": [{
              "company": "rental company",
              "carType": "car model/type",
              "location": "pickup location",
              "pricePerDay": "price as string no dollar sign",
              "originalPrice": "original price as string no dollar sign",
              "pickUp": "YYYY-MM-DD",
              "dropOff": "YYYY-MM-DD",
              "url": "booking url"
            }]
          }[/INST]</s>`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Hugging Face API error:', error);
      return res.status(response.status).json({ error: 'AI service error', details: error });
    }

    const data = await response.json();
    console.log('Raw response:', data);

    // extract JSON from the response
    try {
      const jsonMatch = data[0].generated_text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        const jsonStr = jsonMatch[1].trim();
        const dealsData = JSON.parse(jsonStr);
        console.log('Parsed deals:', dealsData);
        
        if (dealsData.deals) {
          dealsData.deals = dealsData.deals.map(deal => {
            if (dealsData.category === 'hotel') {
              deal.departureDate = deal.checkIn;
              deal.returnDate = deal.checkOut;
            }
            deal.price = parseFloat(deal.price).toString();
            deal.originalPrice = parseFloat(deal.originalPrice).toString();
            return deal;
          });
        }
        
        res.json(dealsData);
      } else {
        console.error('No JSON found in response');
        res.status(500).json({ error: 'Invalid response format' });
      }
    } catch (parseError) {
      console.error('Error parsing deals:', parseError);
      res.status(500).json({ error: 'Failed to parse deals data' });
    }
  } catch (error) {
    console.error('Error processing deals:', error);
    res.status(500).json({ error: 'Failed to find deals' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

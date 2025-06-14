// server.js
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/ask', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are CyberSaarthi, a helpful assistant who provides accurate guidance about cybercrime reporting in India.' },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    });

    const botMessage = completion.data.choices[0].message.content;
    res.json({ reply: botMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong with the OpenAI request' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
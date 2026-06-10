const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const APIKEY = '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';

app.post('/ai', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/teste', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APIKEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 50,
        messages: [{ role: 'user', content: 'di ola' }]
      })
    });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.json({ erro: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('OK porta ' + PORT));

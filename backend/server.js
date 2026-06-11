import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

// Generic endpoint for multiple APIs
app.get('/api/fetch', async (req, res) => {
  const { api } = req.query;

  const apiUrls = {
    currency: `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/USD`,
    omdb: `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}`,
    jsonplaceholder: 'https://jsonplaceholder.typicode.com/posts',
  };

  if (!apiUrls[api]) return res.status(400).json({ error: 'API not found' });

  try {
    const response = await fetch(apiUrls[api]);
    const data = await response.json();

    if (api === 'currency') {
      if (data.result !== 'success') return res.status(400).json(data);
      return res.json(data.conversion_rates);
    }

    if (api === 'omdb') {
      return res.json({
        Title: data.Title,
        Year: data.Year,
        Genre: data.Genre,
        Director: data.Director,
        Plot: data.Plot,
      });
    }

    if (api === 'jsonplaceholder') {

      return res.json(data);
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
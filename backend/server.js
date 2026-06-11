import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60, // limit each IP to 60 requests per window
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/fetch', limiter);



// Generic endpoint for multiple APIs
app.get('/api/fetch', async (req, res) => {
  const fetch = (await import('node-fetch')).default;
  const { api } = req.query;

  const apiUrls = {
    currency: `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/USD`,
    omdb: `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}`,
    jsonplaceholder: 'https://jsonplaceholder.typicode.com/posts',
    holiday: `https://holidayapi.com/v1/holidays?key=${process.env.HOLIDAY_API_KEY}&country=US&year=2025&pretty=true`,
    weather: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Seattle?unitGroup=metric&key=${process.env.VISUAL_API_KEY}&include=current`,
    randomuser: 'https://randomuser.me/api/',
    cocktail: 'https://thecocktaildb.com/api/json/v1/1/search.php?f=a',
    dummyusers: 'https://dummyjson.com/users',
    dummyPosts: 'https://dummyjson.com/posts',
    quotes: 'https://dummyjson.com/quotes',
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
    if (api === 'holiday') {
      // return only the holidays array
      return res.json(data.holidays);
    }

    if (api === 'weather') {
      return res.json({
        location: data.resolvedAddress,
        current: data.currentConditions,
        forecast: data.days,
      });
    }
    if (api === 'randomuser') {
      return res.json(data.results[0]); // full JSON
    }
    if (api === 'cocktail') {
      return res.json(data);
    }
    if (api === 'dummyusers') {
      return res.json(data);
    }
    if (api === 'dummyPosts') {
      return res.json(data);
    }
    if (api === 'quotes') {
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

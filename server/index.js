require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { lat, lon, geoid } = req.query;
  let url = 'https://api.weather.yandex.ru/v2/forecast';
  let params = {};

  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  } else if (geoid) {
    params.geoid = geoid;
  } else {
    return res.status(400).json({ error: 'lat/lon или geoid обязательны' });
  }

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        'X-Yandex-Weather-Key': process.env.YANDEX_WEATHER_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ошибка получения погоды' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
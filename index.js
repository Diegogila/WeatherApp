const express = require('express');
const axios = require('axios');
const {apiKey} = require('./_secrets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  try {
    const { query } = req;
    if (!query.location) {
      throw new Error('No se proporcionó ninguna localidad.');
    }
    const weatherResponse = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query.location}`
    );
    const weatherData = weatherResponse.data;
    res.send(weatherData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
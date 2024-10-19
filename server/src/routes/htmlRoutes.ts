import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query; // Get latitude and longitude from query parameters
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        res.json(response.data); // Send the weather data as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// TODO: Define route to serve index.html

export default router;

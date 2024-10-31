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

// Define route to serve index.html
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

app.get('/weather', async (_req, res) => {
    const cityName = _req.query.city; // Get city name from query parameters
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await 
         axios.get(`https://api.openweathermap.org/data/2.5/forecast? 
             q=${cityName}&appid=${apiKey}`);
        res.json(response.data); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default router;

import express, { Router, type Request, type Response } from 'express';
import fs from 'fs';
import axios from 'axios'; 



// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// import express, { Request, Response } from 'express';

const router = Router();
export default router;

router.post('/', async (req: Request, res: Response) => {
  const cityName = req.body.city; 
    
    try {
      const weatherResponse = await 
       axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          appid: '6a9541ec91fc0c34242b681021c81640',
          units: 'imperial' 
        }
      });
  
      const weatherData = weatherResponse.data;

    // Step 2: Save the city to search history
    const searchHistoryPath = 'searchHistory.json';
    fs.readFile(searchHistoryPath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error reading search history' });
      }


      const searchHistory = JSON.parse(data);
      // Add the city to the search history
      searchHistory.push({ city: cityName, id: generateUniqueId() });
      
 

      fs.writeFile(searchHistoryPath, JSON.stringify(searchHistory), (err: any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error saving search history' });
        }
        res.json(weatherData);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data' });
  };



// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {});


function generateUniqueId() {
  return Date.now(); 
};
}
)
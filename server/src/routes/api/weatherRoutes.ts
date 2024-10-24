// import express, { Router, type Request, type Response } from 'express';
import axios from 'axios'; 


import { Request, Response, Router } from 'express';
// import weatherService from '../../service/weatherService';
import historyService from '../../service/historyService';



 // TODO: POST Request with city name to retrieve weather data 
// router.post('/', async (req: Request, res: Response) => {
//   const cityName = req.body.city; 
//     historyService.addCity(cityName)
//     try {
//       const cityName = req.body.city; 
//       historyService.addCity(cityName)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching weather data' });
//   };
const router = Router();
// function generateUniqueId() {
//   return Date.now(); 
// }

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const city = req.body.city; 

  try {
    // Add city to history with a unique ID
    // const uniqueId = generateUniqueId();
    await historyService.addCity( city);
     
      
      // Fetch weather data
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: '6a9541ec91fc0c34242b681021c81640',
          units: 'imperial' 
        }
      });
  
      const weatherData = weatherResponse.data;
      res.json(weatherData); // Send the weather data as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  });
// TODO: GET search history
router.get('/api/weather/history', async (_req: Request, res: Response) => {
  try {
    const history = await historyService.getHistory(); // Assuming you have a method to get history
    res.json(history); // Send the search history as a response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching search history'); // Handle errors
  }
});


// router.get('/api/weather/history', async (req: Request, res: Response) => {
//   const cityName = req.body.city; 

//   try {
//       const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
//           params: {
//               q: cityName,
//               appid: '6a9541ec91fc0c34242b681021c81640',
//               units: 'imperial' 
//           }
//       });

//       const weatherData = weatherResponse.data;
//       res.json(weatherData); // Send the weather data as a response
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching weather data'); // Handle errors
//   }
// });

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (_req: Request, _res: Response) => {});



export default Router
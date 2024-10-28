import { type Request, type Response, Router } from "express";

const router = Router();
import weatherService from "../../service/weatherService.js";
import historyService from "../../service/historyService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req: Request, res: Response) => {
  try {
    const city = req.body.cityName;
    weatherService.getWeatherForCity(city).then((data) => {
      historyService.addCity(city);
      res.json(data);
    });

     // Send the weather data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});
// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  historyService
    .getCities()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;

import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  cityName: string;
  date: string;
  iconId: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(
    cityName: string,
    date: string,

    iconId: string,

    iconDescription: string,

    tempF: number,

    windSpeed: number,

    humidity: number,
  ) {
    this.cityName = cityName;
    this.date = date;
    this.iconId = iconId;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class

class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName = "";
  constructor() {
    // this.baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
    this.baseURL = process.env.BASE_URL || '';
    this.apiKey = process.env.API_KEY || "";
  }
  // TODO: Create fetchLocationData method
  async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(query);
  
      // Check if OK (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data[0];
    } catch (err) {
      console.log('Error:', err);
      return null; 
    }
  }



  // TODO: Create destructureLocationData method
  async destructureLocationData(locationData: any): Promise<Coordinates> {
    const { lat, lon } = locationData; 
    return {
      latitude: lat,
      longitude: lon,
    };
  }


  async buildWeatherQuery(coordinates: Coordinates) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const { latitude, longitude } = coordinates;
    const query = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;

    return query;
  }

// TODO: Create fetchWeatherData method
async fetchWeatherData() {
  try {
    const response = await fetch(this.baseURL);
    const fetchweatherdata = await response.json();

    if (fetchweatherdata) {
      const currentWeather:  Weather = this.parseCurrentWeather = fetchweatherdata;
      console.log(currentWeather);
    } else {
      console.error("No data found");
      return fetchweatherdata;
    }
  } catch (err: any) {
    console.log("Error:", err);
    return null;
  }
}


  // TODO: Build parseCurrentWeather method
  async  parseCurrentWeather(response: any) {
  
    const currentWeather:  new () => Weather =   
      (this.parseCurrentWeather)(
      response.list[0])
    return currentWeather;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city
 let coordinates= this.destructureLocationData(this.cityName);
  console.log((await coordinates).latitude, (await coordinates).longitude);      
  }
}


export default new WeatherService();

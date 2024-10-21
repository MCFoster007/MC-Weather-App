import dotenv from 'dotenv';
import fs from 'node:fs/promises';;
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
function getWeather(coordinates: Coordinates) {
  console.log(`Fetching weather for coordinates: Latitude: ${coordinates.latitude} , Longitude: ${coordinates.longitude}` );
  // Your code to get the weather using the coordinates
  const locationCoords: Coordinates = { latitude: coordinates.latitude, longitude: coordinates.longitude }; 

  getWeather(locationCoords);  

}

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/forecast?';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string;

  constructor(cityName: string) {
    this.cityName = cityName;
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`
      );

      // Check if OK (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return this.destructureLocationData(data);
    } catch (err) {
      console.log('Error:', err);
      return null; 
    }
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const { coord } = locationData; 
    return {
      latitude: coord.lat,
      longitude: coord.lon,
    };
  }
}
 // Create buildGeocodeQuery method
 private async function buildGeocodeQuery(address: string): Promise<string> {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  const apiKey = '.env.API_KEY'; 
  const query = `${baseUrl}?address=${encodeURIComponent(address)}&key=${apiKey}`;
  return query;
}
  // TODO: Create buildWeatherQuery method
  private async function buildWeatherQuery(coordinates: Coordinates): Promise<string> {
      const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const apiKey = '.env.API_KEY';
      const { latitude, longitude } = coordinates;
      const query = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      return query;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(geolocation: any): Promise<{ latitude: number; longitude: number; } {
    const { coord } = geolocation; 
    return {
        latitude: coord.lat,
        longitude: coord.lon,
    };
}

// TODO: Create fetchWeatherData method
private async fetchWeatherData(coordinates: { lat: number; lon: number }): Promise<Coordinates || null> {
  try {
      const response = await fetch(
          `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
      );

      const fetchweatherdata = await response.json();
      
   
      if (fetchweatherdata.coordinates) {
          return this.fetchAndDestructureLocationData(fetchweatherdata);
      } else {
          console.error('No coordinates found');
          return null;
      }
  } catch (err: any) {
      console.log('Error:', err);
      return null; 
  }
}
  // TODO: Build parseCurrentWeather method
  private async parseCurrentWeather(response: any) {
    const currentWeatherCodes = await this.read(); 
    const parsedCurrentWeatherCodes = JSON.parse(currentWeatherCodes);
    
    const foundGeoLocation = parsedCurrentWeatherCodes.filter((responseObject: ResponseObject) => {
        return responseObject.currentWeather.toLowerCase() === response.toLowerCase();
    });

    if (foundGeoLocation.length > 0) {
        const weatherCodes = foundGeoLocation[0].weatherCodes;
        return weatherCodes;
    } else {
        throw new Error("Weather not found");
    }
}
  // TODO: Complete buildForecastArray method
  function buildForecastArray(periods: number, baseValue: number, trend: number): number[] {
    const forecastArray: number[] = [];
    const forecast = buildForecastArray(5, 100, 10);
    console.log(forecast); 
    for (let i = 0; i < periods; i++) {
        const forecastValue = baseValue + (i + 1) * trend;
        forecastArray.push(forecastValue);
    }
  
    return forecastArray;
}
const forecast = buildForecastArray(5, 100, 10);
console.log(forecast);

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();

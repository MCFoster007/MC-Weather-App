import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object
class Weather {
  cityName: string;
  date: number;
  iconId: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(
    cityName: string,
    date: number,
    iconId: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
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
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
   
  }
  // TODO: Create fetchLocationData method
  async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);

      // Check if OK (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data[0];
    } catch (err) {
      console.log("Error:", err);
      return null;
    }
  }
//********MARY STUCK HERE */
  buildWeatherQuery(city:string): string {
    this.cityName =city
    // const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

    const query = `${this.baseURL}/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}`;
   

    return query;
  }
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather];
    // console.log(currentWeather);
    const filteredWeatherData = weatherData.filter((data: any) => {
      return data.dt_txt.includes('12:00:00');
    });

    for (const day of filteredWeatherData) {
      weatherForecast.push(
        new Weather(
          this.cityName,
          1,
          day.weather[0].icon,
          day.weather[0].description ,
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
        
          
        )
      );
    }

    return weatherForecast;
  }
  // TODO: Create fetchWeatherData method
  async fetchWeatherData(city: string) {
    try {
      const response: Response =
      await fetch(this.buildWeatherQuery(city));
     
        const res = await response.json();
   

     
     if (res ) {

      const currentWeather: Weather = this.parseCurrentWeather(res.list[0]);
      const forecast: Weather[] = this.buildForecastArray(currentWeather,res.list);
      return forecast;
     }
     throw new Error(`no data returned for ${city}`);
    } catch (err: any) {
      console.log("Error:", err);
      return null;
    }
  }

  private parseCurrentWeather(response: any) {
   console.log('response', response);

    const currentWeather = new Weather(
      this.cityName,
       1,
       response.weather[0].icon,
      response.weather[0].description, 
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      
    );
console.log('currentWeather', currentWeather);
    return currentWeather;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const weather = await this.fetchWeatherData(this.cityName);
    return weather;
  }
}

export default new WeatherService();
// function reject(error: unknown) {
//   throw new Error("Function not implemented.");
// }

// function getWeatherForCity(city: any, string: any) {
//   throw new Error("Function not implemented.");
// }

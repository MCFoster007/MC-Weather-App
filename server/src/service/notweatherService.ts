import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object

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
  private baseURL?: string;
  private apiKey: string;
  private cityName = "";
  constructor() {
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
    this.apiKey = process.env.API_KEY || "";
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(cityName: string) {
    const query = `${this.baseURL}cityname=${cityName}&appid=${this.apiKey}`;
    return query;
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData() {
    try {
      const response = await fetch(this.buildWeatherQuery(this.cityName));

      const fetchweatherdata = await response.json();

      if (fetchweatherdata) {
        console.log(fetchweatherdata);
      } else {
        console.error("No data found");
      }
    } catch (err: any) {
      console.log("Error:", err);
      return null;
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const currentWeather= new Weather()
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();

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
  private baseURL?: string;
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


  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method

  // private buildWeatherQuery(cityName: string) {
  //   const query = `${this.baseURL}cityname=${cityName}&appid=${this.apiKey}`;
  //   return query;
  // }
  async buildWeatherQuery(coordinates: Coordinates) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const { latitude, longitude } = coordinates;
    const query = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return query;
  }
// // TODO: Create fetchWeatherData method
//  async fetchWeatherData() {
//   try {
//     const response = await fetch(this.buildWeatherQuery, ('city'));

//     const fetchweatherdata = await response.json();
//     const buildWeatherQuery: new() => Weather = this.parseCurrentWeather(
//       response.json()
//     );
//     if (fetchweatherdata) {
//       console.log(fetchweatherdata);
//     } else {
//       console.error("No data found");
//     }
//   } catch (err: any) {
//     console.log("Error:", err);
//     return null;
//   }
// }
// TODO: Create fetchWeatherData method
async fetchWeatherData() {
  try {
    // Assuming `this.buildWeatherQuery` is a method that returns a proper URL string
    const response = await fetch(this.buildWeatherQuery());

    // Await the JSON response
    const fetchweatherdata = await response.json();

    // Parse the current weather data if the response is valid
    if (fetchweatherdata) {
      const currentWeather: new Weather = (this.parseCurrentWeather(fetchweatherdata));
      console.log(currentWeather);
    } else {
      console.error("No data found");
    }
  } catch (err: any) {
    console.log("Error:", err);
    return null;
  }
}

  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
     }
  // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery())
    .then ((data)=> this.destructureLocationData(data))
 }
  

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
  
    const currentWeather: new()=> Weather = (this.parseCurrentWeather)(
      response.list[0])
    return currentWeather;
  }
  // TODO: Complete buildForecastArray method
    // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

          // const cityName = weatherData.city.name; 
          // const temperature = weatherData.list[0].main.temp; 
          // const windSpeed = weatherData.list[0].wind.speed; 
          // const humidity = weatherData.list[0].main.humidity; 
  // }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city
 let coordinates= this.fetchAndDestructureLocationData();
  console.log((await coordinates).latitude, (await coordinates).longitude);      
  }
}


export default new WeatherService();

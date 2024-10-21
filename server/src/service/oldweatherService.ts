import dotenv from 'dotenv';
import fs from 'node:fs/promises';;
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}


// TODO: Define a class for the Weather object
class Weather{
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number,
  ){
this.city = city;
this.date = date;
this.icon = icon;
this.iconDescription = iconDescription;
this.tempF =tempF;
this.windSpeed = windSpeed;
this.humidity = humidity;
  }

}
// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string; 
  private apiKey: string; 
  private cityName = ""

  
  
  constructor() {
    this.baseURL = process.env.BASE_URL || '';;
    this.apiKey = process.env.API_KEY || "";
  }
//   // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(
        query
      )

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

//   // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon} = locationData; 
    let coordinatesData: Coordinates ={
      latitude: lat,
      longitude: lon,
    }
    return coordinatesData
    
  }


  // TODO: Create buildWeatherQuery method
  private async function buildWeatherQuery(coordinates: Coordinates): Promise<string> {
      const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const apiKey = '.env.API_KEY';
      const { latitude, longitude } = coordinates;
      const query = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      return query;
  }
  
//   // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
   return await this.fetchLocationData(this.buildGeocodeQuery())
   .then ((data)=> this.destructureLocationData(data))
}

// TODO: Create fetchWeatherData method
// private async fetchWeatherData(coordinates: { lat: number; lon: number }): Promise<Coordinates || null> {
//   try {
//       const response = await fetch(this.buildWeatherQuery(cityName));

//       const fetchweatherdata = await response.json();
      
   
//       if (fetchweatherdata) {
//          console.log(fetchweatherdata)
//       } else {
//           console.error('No data found');
          
//       }
//   } catch (err: any) {
//       console.log('Error:', err);
//       return null; 
//   }
// }
  // TODO: Build parseCurrentWeather method
  // private async parseCurrentWeather(response: any) {

    
    
// }
 private buildGeocodeQuery(): string {
return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
 }
  // TODO: Complete buildForecastArray method
//   
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

          // const cityName = weatherData.city.name; 
          // const temperature = weatherData.list[0].main.temp; 
          // const windSpeed = weatherData.list[0].wind.speed; 
          // const humidity = weatherData.list[0].main.humidity; 
  // }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city
 let coordinates= this.fetchAndDestructureLocationData()


         
  }
  }
  


export default new WeatherService()


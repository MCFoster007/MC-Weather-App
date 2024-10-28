import fs from 'node:fs/promises';;
import { v4 as uuidv4 } from 'uuid';


// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor (name: string, id: string){
    this.name = name;
    this.id = id;
  }

}
// TODO: Complete the HistoryService class
class HistoryService {
  getHistory: any;
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/db.json', {
   encoding: 'utf8',
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = JSON.parse(cities);
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    });
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    console.log('***********')
    console.log(city)
    console.log('***********')
    if (!city) {
      throw new Error('city must be defined');
    }

    return await this.getCities()
      .then((cities) => {
        if (cities.find((weather) => weather.name === city)) {
          return cities; 
        }
        const newCity = new City(city, uuidv4()); 
        return [...cities, newCity]; 
      })
      .then((updatedCities) => this.write(updatedCities)) 
      .then(() => new City(city, uuidv4())); 
  }
}

export default new HistoryService();
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
//   async removeCity(id: string) {}
// }

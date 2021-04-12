import { IWeatherService } from "./weatherService";
import { Search, Card, ICardState } from "./components";
import { IRootWeather } from "./types";

class App {
  cities: string[] = [];
  service: IWeatherService;
  search = document.querySelector("search-group") as Search;

  constructor(service: IWeatherService) {
    this.service = service;
  }

  isAdded = (city: string): boolean =>
    this.cities.find((_) => _.toLowerCase().includes(city.toLowerCase())) !== undefined;

  handleSearch = async (city: string): Promise<void> => {
    if (city) {
      if (this.isAdded(city)) {
        alert(`City ${city} was already added.`);
      } else {
        const response = await this.service.getWeatherByCity(city);

        if (response.status !== 200) {
          this.handleApiError(response.status, response.statusText, city);
        } else {
          this.cities.push(city);
          this.appendWeatherCard(response.body as IRootWeather);
        }
      }
    }
  };

  handleApiError = (status: number, statusText: string, city: string) => {
    if (status === 404) {
      alert(`City with name ${city} was not found`);
    } else {
      alert(`Error: ${status}: ${statusText}`);
    }
  };

  appendWeatherCard = (data: IRootWeather) => {
    let container = document.querySelector("#weather-cards") as HTMLDivElement;

    let state: ICardState = {
      city: data.name,
      icon: data.weather[0].icon,
      temp: {
        min: data.main.temp_min,
        max: data.main.temp_max,
      },
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    };

    container.appendChild(new Card(state));
  };

  run = () => {
    this.search.handleSearch(this.handleSearch);
  };
}

window.customElements.define("search-group", Search);
window.customElements.define("weather-card", Card);

export default App;

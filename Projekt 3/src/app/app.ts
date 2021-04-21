import { Weather } from "./services/types";
import { LocationService } from "@services";
import { AutocompleteComponent } from "@components";

class App {
  cities: string[] = [];
  service: Weather.IService;
  weatherContainer = document.querySelector("#weather-cards") as HTMLDivElement;

  autocomplete?: AutocompleteComponent;

  constructor(service: Weather.IService) {
    this.service = service;
  }

  isAdded = (city: string): boolean => this.cities.find((_) => _.toLowerCase().includes(city.toLowerCase())) !== undefined;

  handleSearch = async (city: string): Promise<void> => {
    if (city) {
      if (this.isAdded(city)) {
        alert(`City ${city} was already added.`);
      } else {
        //TODO CREATE TILE
      }
    }
  };

  run = () => {
    this.initializeAutocomplete();
    // this.search.handleSearch(this.handleSearch);
    // this.weatherContainer.appendChild(new Card({ city: "Krakow", weeatherService: this.service }));
  };

  initializeAutocomplete = async (): Promise<void> => {
    const container = document.querySelector("#autocomplete") as HTMLDivElement;

    this.autocomplete = new AutocompleteComponent();
    this.autocomplete.placeholder = "Please enter name...";
    this.autocomplete.value = "Kraków";

    container.appendChild(this.autocomplete);

    if (!localStorage.getItem("places")) {
      const response = await LocationService.getPlaces();
      localStorage.setItem("places", JSON.stringify(response.body?.data));
    }

    const data = localStorage.getItem("places") as string;
    const places: string[] = JSON.parse(data);

    this.autocomplete.items = places;
    this.autocomplete.callback = (value: string) => console.log("TODO CREATE TILE");
  };
}

export default App;

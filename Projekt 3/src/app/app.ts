import { Weather } from "@services/types";
import { LocationService, WeatherService } from "@services";
import { AutocompleteComponent, TileComponent } from "@components";

class App {
  constructor() {}
  private autocomplete?: AutocompleteComponent;

  private contains(value: string, values: string[]) {
    return values.find((v) => v.toLocaleLowerCase() === value.toLocaleLowerCase());
  }

  private get getAddedPlaces(): string[] {
    const key = "addedPlaces";
    return localStorage.getItem(key) !== null ? (JSON.parse(localStorage.getItem(key) as string) as string[]) : [];
  }

  private set addPlace(value: string) {
    const key = "addedPlaces";
    const places = this.getAddedPlaces;

    if (!this.contains(value, places)) {
      places.push(value);
      localStorage.setItem(key, JSON.stringify(places));
    }
  }

  handleRefreshTileComponent = (): Promise<Weather.RootObject> => {
    return new Promise<Weather.RootObject>(async (resolve) => {
      const response = await WeatherService.getWeather("Kraków");

      if (response.status === 200) {
        resolve(response.body as Weather.RootObject);
      } else {
        //TODO ALERT
        alert(`Error: ${response.status} ${response.statusText}`);
      }
    });
  };

  private get autocompleteContainer(): HTMLDivElement {
    return document.querySelector("#autocomplete") as HTMLDivElement;
  }

  private get tilesContainer(): HTMLDivElement {
    return document.querySelector("#tiles") as HTMLDivElement;
  }

  private handleCreateAutocomplete = async (): Promise<void> => {
    this.autocomplete = new AutocompleteComponent();
    this.autocomplete.placeholder = "Please enter name...";

    if (!localStorage.getItem("places")) {
      const response = await LocationService.getPlaces();
      localStorage.setItem("places", JSON.stringify(response.body?.data));
    }

    const data = localStorage.getItem("places") as string;
    const places: string[] = JSON.parse(data);

    this.autocomplete.items = places;
    this.autocomplete.callback = (value: string) => this.handleAutocompleteOnChange(value);
    this.autocompleteContainer.appendChild(this.autocomplete);
  };

  private handleCreateTile = async (value: string) => {
    const response = await WeatherService.getWeather(value);

    if (response.status === 200) {
      const tileComponent = new TileComponent({ onRefresh: this.handleRefreshTileComponent });
      tileComponent.setState = response.body as Weather.RootObject;
      this.tilesContainer.appendChild(tileComponent);
      this.addPlace = value;
    }
  };

  private handleAutocompleteOnChange = async (value: string): Promise<void> => {
    if (!this.contains(value, this.getAddedPlaces)) {
      this.handleCreateTile(value);
    } else {
    }
  };

  private handleRecreateWeatherTiles = () => {
    const places = this.getAddedPlaces;

    if (!places.length) return;

    for (let place of places) {
      this.handleCreateTile(place);
    }
  };

  run = () => {
    this.handleCreateAutocomplete();
    this.handleRecreateWeatherTiles();
  };
}

export default App;

import { Weather } from "@services/types";
import { LocationService, WeatherService } from "@services";
import { AutocompleteComponent, SpinnerComponent, TileComponent } from "@components";
import { createAlert } from "@utils/alert";
import { localStorageHelpers } from "@utils/localStorageHelpers";

class App {
  constructor() {}
  private autocomplete = document.querySelector("app-autocomplete") as AutocompleteComponent;

  private contains(value: string, values: string[]) {
    return values.find((v) => v.toLocaleLowerCase() === value.toLocaleLowerCase());
  }

  private get getAddedPlaces(): string[] {
    const key = "addedPlaces";
    return localStorage.getItem(key) !== null ? (JSON.parse(localStorage.getItem(key) as string) as string[]) : [];
  }

  private get tilesContainer(): HTMLDivElement {
    return document.querySelector("#tiles") as HTMLDivElement;
  }

  private handleCreateAutocomplete = async (): Promise<void> => {
    if (!localStorage.getItem("places")) {
      const response = await LocationService.getPlaces();
      localStorage.setItem("places", JSON.stringify(response.body?.data));
    }

    const data = localStorage.getItem("places") as string;
    const places: string[] = JSON.parse(data);

    this.autocomplete.items = places;
    this.autocomplete.callback = (value: string) => this.handleAutocompleteOnChange(value);
  };

  private handleCreateTile = async (value: string) => {
    const response = await WeatherService.getWeather(value);

    if (response.status === 200) {
      const tileComponent = new TileComponent();
      tileComponent.setState = response.body as Weather.RootObject;
      this.tilesContainer.appendChild(tileComponent);
      localStorageHelpers.addPlace(value);
    } else {
      createAlert.danger(`Error ${response.status} ${response.statusText}`, "Wystąpił błąd podczas pobierania danych pogodowych.");
    }
  };

  private handleAutocompleteOnChange = async (value: string): Promise<void> => {
    if (!this.contains(value, this.getAddedPlaces)) {
      this.handleCreateTile(value);
    }
  };

  private handleRecreateWeatherTiles = async () => {
    const places = this.getAddedPlaces;
    const df = document.createDocumentFragment();

    if (!places.length) return;

    this.tilesContainer.appendChild(new SpinnerComponent());

    for (let place of places) {
      const response = await WeatherService.getWeather(place);
      if (response.status === 200) {
        const tileComponent = new TileComponent();
        tileComponent.setState = response.body as Weather.RootObject;
        df.appendChild(tileComponent);
      }
    }

    this.tilesContainer.innerHTML = "";
    this.tilesContainer.appendChild(df);
    createAlert.success("", `Dane dla miejscowości: ${places.join(", ")} zostały pomyślnie odtworzone.`);
  };

  run = () => {
    this.handleCreateAutocomplete();
    this.handleRecreateWeatherTiles();
  };
}

export default App;

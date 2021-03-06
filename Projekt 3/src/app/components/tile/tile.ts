import template from "./template.html";
import { Component, Tile } from "@components/types";
import { ComponentWithState } from "@components";
import { Weather, Forecast } from "@services/types";
import { WeatherService } from "@services";
import { localStorageHelpers } from "@utils/localStorageHelpers";
import { createAlert } from "@utils/alert";
import { ForecastComponent } from "@components/forecast/forecast";

export class TileComponent extends ComponentWithState<Tile.IState> {
  constructor() {
    super(template);
  }

  protected state: Tile.IState = this.createState<Tile.IState>({
    pending: false,
    updatedAt: null,
    place: "",
    icon: "",
    description: "",
    temp: {
      current: 0,
      min: 0,
      max: 0,
    },
    humidity: 0,
    pressure: 0,
    wind: {
      deg: 0,
      speed: 0,
    },
    refresh: {
      auto: true,
      timeout: null,
      delay: 2 * 60000,
    },
    coord: {
      lat: 0,
      lon: 0,
    },
  });

  set setState(newState: Weather.RootObject) {
    this.state.place = newState.name;
    this.state.updatedAt = new Date();
    this.state.temp = {
      current: newState.main.temp,
      min: newState.main.temp_min,
      max: newState.main.temp_max,
    };
    this.state.humidity = newState.main.humidity;
    this.state.pressure = newState.main.pressure;
    this.state.wind = {
      speed: newState.wind.speed,
      deg: newState.wind.deg,
    };
    this.state.icon = newState.weather[0].icon;
    this.state.description = newState.weather[0].description;
    this.state.coord = {
      lat: newState.coord.lat,
      lon: newState.coord.lon,
    };
  }

  private handleTimeout = () => {
    if (this.state.refresh.auto) {
      this.state.refresh.timeout = setTimeout(() => {
        this.handleRefresh();
        clearTimeout(this.state.refresh.timeout as ReturnType<typeof setTimeout>);
      }, this.state.refresh.delay);
    }
  };

  private handleRefresh = async () => {
    const response = await WeatherService.getWeather(this.state.place);

    if (response.status !== 200) {
      const { status, statusText } = response;
      createAlert.danger(`Error ${status} ${statusText}`, "Wyst??pi?? b????d podczas od??wie??ania danych pogodowych.");
      return;
    }

    this.setState = response.body as Weather.RootObject;
    this.handleTimeout();
  };

  protected configuration: Component.IConfiguration = {
    bindings: {
      place: {
        onChange: () => this.updateElement("place"),
      },
      temp: {
        onChange: () => {
          this.updateElement("temp.current", this.state.temp.current.toFixed(1));
          this.updateElement("temp.min", this.state.temp.min.toFixed(1));
          this.updateElement("temp.max", this.state.temp.max.toFixed(1));
        },
      },
      humidity: { onChange: () => this.updateElement("humidity") },
      pressure: { onChange: () => this.updateElement("pressure") },
      wind: {
        onChange: () => {
          this.updateElement("wind.deg");
          this.updateElement("wind.speed");
        },
      },
      updatedAt: {
        onChange: () => {
          const updatedAt = this.state.updatedAt as Date;
          const dateString = `${updatedAt.toLocaleDateString("pl")} ${updatedAt.toLocaleTimeString("pl")}`;
          this.updateElement("updatedAt", dateString);
        },
      },
      icon: {
        onChange: () => this.updateElement<HTMLElement>("icon", `http://openweathermap.org/img/wn/${this.state.icon}.png`),
      },
      description: {
        onChange: () => this.updateElement<HTMLElement>("description"),
      },
    },
  };

  private get closeButton(): HTMLButtonElement {
    return this.root.querySelector("button.close-button") as HTMLButtonElement;
  }

  private get mainWrapper(): HTMLDivElement {
    return document.querySelector("weather-wrapper") as HTMLDivElement;
  }

  private get forecast(): ForecastComponent {
    return document.querySelector("weather-forecast") as ForecastComponent;
  }

  private handleRemove = (): void => {
    localStorageHelpers.removePlace(this.state.place);
    clearTimeout(this.state.refresh.timeout as ReturnType<typeof setTimeout>);
    this.remove();
  };

  private scrollToTop(): void {
    if (window.pageYOffset > 0) {
      const body = document.querySelector("body") as HTMLElement;
      body.scrollIntoView({ behavior: "smooth" });
    }
  }

  private handleGetForecast = async () => {
    const { lat, lon } = this.state.coord;

    const response = await WeatherService.getForecast(lat, lon);

    if (response.status !== 200) {
      const { status, statusText } = response;
      createAlert.danger(
        `Error ${status} ${statusText}`,
        `Wyst??pi?? nieoczekiwany b????d podczas pobierania prognozy dla miejscowo??ci: ${this.state.place}`
      );
      return;
    }

    this.forecast.setPlace = this.state.place;
    this.forecast.setState = response.body as Forecast.RootObject;
    this.mainWrapper.setAttribute("layout", "forecast");

    localStorage.setItem("forecast", JSON.stringify(response.body));
    this.scrollToTop();
  };

  connectedCallback() {
    this.handleTimeout();
    this.closeButton.addEventListener("click", this.handleRemove);
    this.addEventListener("click", this.handleGetForecast);
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener("click", this.handleRemove);
    this.removeEventListener("click", this.handleGetForecast);
  }
}

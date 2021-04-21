import template from "./template.html";
import { Component, Tile } from "@components/types";
import { ComponentWithState } from "@components";
import { Weather } from "@services/types";

const initialState: Tile.IState = {
  pending: false,
  updatedAt: new Date(),
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
};

export class TileComponent extends ComponentWithState<Tile.IState> {
  constructor() {
    super(template);
  }

  protected state: Tile.IState = new Proxy<Tile.IState>(initialState, {
    get(object, target, receiver) {
      return Reflect.get(object, target, receiver);
    },
    set: (object, target, value) => {
      const key = target as string;
      object[key] = value;

      this.configuration.bindings[target as string]?.onChange();

      return Reflect.set(object, target, value);
    },
  });

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
          const dateString = `${this.state.updatedAt.toLocaleDateString("pl")} ${this.state.updatedAt.toLocaleTimeString("pl")}`;
          this.updateElement("updatedAt", dateString);
        },
      },
      icon: {
        onChange: () => this.updateElement<HTMLElement>("icon", `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`),
      },
      description: {
        onChange: () => this.updateElement<HTMLElement>("description"),
      },
    },
  };

  connectedCallback() {
    const json = JSON.parse(localStorage.getItem("weather") as string) as Weather.RootObject;
    this.setState = json;
  }

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
  }
}

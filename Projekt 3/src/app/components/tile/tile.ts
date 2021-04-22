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
  refresh: {
    auto: false,
    timeout: null,
  },
};

export class TileComponent extends ComponentWithState<Tile.IState> {
  private onRefresh;

  constructor(props: Tile.IProps) {
    super(template);
    this.onRefresh = props.onRefresh;
  }

  private handleTimeout = () => {
    if (this.state.refresh.auto) {
      this.state.refresh.timeout = setTimeout(() => {
        this.handleRefresh();
        clearTimeout(this.state.refresh.timeout as ReturnType<typeof setTimeout>);
      }, 5000);
    }
  };

  private handleRefresh = async () => {
    const newState = await this.onRefresh(this.state.place);
    this.setState = newState;
    this.handleTimeout();
  };

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
    this.handleTimeout();
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

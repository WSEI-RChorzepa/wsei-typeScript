import template from "./templateHourly.html";
import { ComponentWithState } from "@components";
import { Component, WeatherHourly } from "@components/types";
import { Forecast } from "@services/types";
import { getDate } from "@utils/dateHelpers";

export class HourlyComponent extends ComponentWithState<WeatherHourly.IState> {
  constructor(newState: Forecast.Hourly, timezoneOffset: number) {
    super(template);
    this.state.timezone_offset = timezoneOffset;
    this.setState = newState;
  }

  protected state: WeatherHourly.IState = this.createState<WeatherHourly.IState>({
    date: null,
    temp: 0,
    pressure: 0,
    humidity: 0,
    wind: {
      deg: 0,
      speed: 0,
    },
    icon: "",
    description: "",
    timezone_offset: 0,
  });

  protected configuration: Component.IConfiguration = {
    bindings: {
      date: {
        onChange: () => this.updateElement("date", (this.state.date as Date).toLocaleTimeString("pl")),
      },
      temp: {
        onChange: () => this.updateElement("temp"),
      },
      pressure: {
        onChange: () => this.updateElement("pressure"),
      },
      humidity: {
        onChange: () => this.updateElement("humidity"),
      },
      wind: {
        onChange: () => {
          this.updateElement("wind.deg");
          this.updateElement("wind.speed");
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

  set setState(newState: Forecast.Hourly) {
    const { dt, temp, humidity, pressure, wind_speed, wind_deg, weather } = newState;

    this.state.date = getDate(dt, this.state.timezone_offset);
    this.state.temp = temp;
    this.state.humidity = humidity;
    this.state.pressure = pressure;
    this.state.wind = {
      speed: wind_speed,
      deg: wind_deg,
    };
    this.state.icon = weather[0].icon;
    this.state.description = weather[0].description;
  }
}

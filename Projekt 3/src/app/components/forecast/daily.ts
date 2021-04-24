import template from "./templateDaily.html";
import { ComponentWithState } from "@components";
import { Component, WeatherDaily } from "@components/types";
import { Forecast } from "@services/types";
import { getDate } from "@utils/dateHelpers";

export class DailyComponent extends ComponentWithState<WeatherDaily.IState> {
  constructor(newState: Forecast.Daily, timezoneOffset: number) {
    super(template);
    this.state.timezone_offset = timezoneOffset;
    this.setState = newState;
  }

  protected state: WeatherDaily.IState = this.createState<WeatherDaily.IState>({
    date: null,
    moonrise: null,
    moonset: null,
    sunrise: null,
    sunset: null,
    temp: {
      min: 0,
      max: 0,
    },
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
        onChange: () => this.updateElement("date", (this.state.date as Date).toLocaleDateString("pl")),
      },
      icon: {
        onChange: () => this.updateElement<HTMLElement>("icon", `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`),
      },
      description: {
        onChange: () => this.updateElement<HTMLElement>("description"),
      },
      temp: {
        onChange: () => {
          this.updateElement("temp.min");
          this.updateElement("temp.max");
        },
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
      moonrise: {
        onChange: () => this.updateElement("moonrise", (this.state.moonrise as Date).toLocaleTimeString("pl")),
      },
      moonset: {
        onChange: () => this.updateElement("moonset", (this.state.moonset as Date).toLocaleTimeString("pl")),
      },
      sunrise: {
        onChange: () => this.updateElement("sunrise", (this.state.sunrise as Date).toLocaleTimeString("pl")),
      },
      sunset: {
        onChange: () => this.updateElement("sunset", (this.state.sunset as Date).toLocaleTimeString("pl")),
      },
    },
  };

  set setState(newState: Forecast.Daily) {
    const { dt, moonrise, moonset, sunrise, sunset, temp, humidity, pressure, wind_speed, wind_deg, weather } = newState;

    this.state.date = getDate(dt, this.state.timezone_offset);
    this.state.moonrise = getDate(moonrise, this.state.timezone_offset);
    this.state.moonset = getDate(moonset, this.state.timezone_offset);
    this.state.sunrise = getDate(sunrise, this.state.timezone_offset);
    this.state.sunset = getDate(sunset, this.state.timezone_offset);
    (this.state.temp = {
      min: temp.min,
      max: temp.max,
    }),
      (this.state.humidity = humidity);
    this.state.pressure = pressure;
    this.state.wind = {
      speed: wind_speed,
      deg: wind_deg,
    };
    this.state.icon = weather[0].icon;
    this.state.description = weather[0].description;
  }
}

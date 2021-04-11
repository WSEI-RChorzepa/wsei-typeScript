import { IRootWeather } from "./types";

export interface IWeatherService {
  getWeatherByCity(city: string): Promise<IRootWeather>;
}

export class OpenWeatherService implements IWeatherService {
  baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  apiKey = "";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCity(city: string): Promise<IRootWeather> {
    const query = `?q=${city}&appid=${this.apiKey}`;
    const response = await fetch(`${this.baseUrl}${query}`);

    if (response.status !== 200) {
      const { status, statusText } = response;
      throw new Error(`Error: Fetching weather data. Code: ${status} ${statusText}`);
    }

    const data = (await response.json()) as IRootWeather;

    return data;
  }
}

export default OpenWeatherService;

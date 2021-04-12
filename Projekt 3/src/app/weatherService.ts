import { IRootWeather } from "./types";

export interface IWeatherService {
  getWeatherByCity(city: string): Promise<Response<IRootWeather>>;
}

type Response<T> = {
  status: number;
  statusText: string;
  body: T | null;
};

export class OpenWeatherService implements IWeatherService {
  baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  apiKey = "";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCity(city: string): Promise<Response<IRootWeather>> {
    const query = `?q=${city}&appid=${this.apiKey}&units=metric`;
    const res = await fetch(`${this.baseUrl}${query}`);
    const { status, statusText } = res;

    let response: Response<IRootWeather> = {
      status,
      statusText,
      body: null,
    };

    if (status == 200) {
      const data = (await res.json()) as IRootWeather;
      response.body = data;
    }

    return response;
  }
}

export default OpenWeatherService;

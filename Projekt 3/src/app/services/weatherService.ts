import { Response, Weather } from "./types";

export class OpenWeatherService implements Weather.IService {
  baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  apiKey = "";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCity(city: string): Promise<Response<Weather.RootObject>> {
    const query = `?q=${city}&appid=${this.apiKey}&units=metric`;
    const res = await fetch(`${this.baseUrl}${query}`);
    const { status, statusText } = res;

    let response: Response<Weather.RootObject> = {
      status,
      statusText,
      body: null,
    };

    if (status == 200) {
      const data = (await res.json()) as Weather.RootObject;
      response.body = data;
    }

    return response;
  }
}

export default OpenWeatherService;

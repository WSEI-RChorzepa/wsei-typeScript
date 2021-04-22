import { Response, Weather } from "./types";
import { buildUrl, GET } from "./http";

const url = buildUrl("http://api.openweathermap.org/data/2.5/weather");
const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeather = async (place: string): Promise<Response<Weather.RootObject>> =>
  await GET<Weather.RootObject>(url(`?q=${place}&appid=${API_KEY}&units=metric`));

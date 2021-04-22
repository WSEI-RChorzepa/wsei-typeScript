import { Response, Weather, Forecast } from "./types";
import { buildUrl, GET } from "./http";

const url = buildUrl("http://api.openweathermap.org/data/2.5/");
const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeather = async (place: string): Promise<Response<Weather.RootObject>> =>
  await GET<Weather.RootObject>(url(`weather?q=${place}&appid=${API_KEY}&units=metric`));

export const getForecast = async (lat: number, lon: number): Promise<Response<Forecast.RootObject>> => {
  return await GET<Forecast.RootObject>(url(`onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`));
};

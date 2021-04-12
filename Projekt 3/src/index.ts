import "./app.scss";
import App from "./app/app";
import OpenWeatherService from "./app/weatherService";

const app = new App(new OpenWeatherService(process.env.OPENWEATHER_API_KEY));
app.run();

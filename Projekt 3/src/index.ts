import "./app.scss";
import "./app/registerComponents";
import App from "./app/app";
import OpenWeatherService from "./app/services/weatherService";

const app = new App(new OpenWeatherService(process.env.OPENWEATHER_API_KEY));
app.run();

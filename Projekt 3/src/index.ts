import "./app.scss";
import "./app/registerComponents";
import App from "./app/app";
import { createAlert } from "@utils/alert";

const app = new App();

if (!process.env.OPENWEATHER_API_KEY) {
  createAlert.danger(
    "Missing API KEY",
    `Environment variable OPENWEATHER_API_KEY is not set. 
        Please create .env file in root folder, set your own API key for the OpernWeather service and restart the application.`,
    50000
  );
} else {
  app.run();
}

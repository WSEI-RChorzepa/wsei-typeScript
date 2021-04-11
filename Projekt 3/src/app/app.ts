import { IWeatherService } from "./weatherService";
import SearchGroup from "./components/SearchGroup";

class App {
  service: IWeatherService;

  constructor(service: IWeatherService) {
    this.service = service;
  }

  run = () => {
    this.service.getWeatherByCity("Krakow");
  };
}

export default App;

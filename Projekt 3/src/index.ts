import "./app.scss";
import App from "./app/app";
import OpenWeatherService from "./app/weatherService";

import SearchGroup from "./app/components/SearchGroup";

window.customElements.define("search-group", SearchGroup);

const app = new App(new OpenWeatherService("313ebf607e79fcff7d85a287b0325f30"));
app.run();

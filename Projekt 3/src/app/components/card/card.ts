import HTMLComponentBase from "../HTMLComponentBase";
import template from "./template.html";

export interface ICardState {
  city: string;
  icon: string;
  temp: {
    min: number;
    max: number;
  };
  pressure: number;
  humidity: number;
}

enum property {
  city = "city",
  icon = "icon",
  min = "min",
  max = "max",
  pressure = "pressure",
  humidity = "humidity",
}

export class Card extends HTMLComponentBase {
  state: ICardState;

  constructor(state: ICardState) {
    super(template);
    this.state = state;
    this.setData();
  }

  getElement<T extends HTMLElement>(key: property): T {
    return this.root.querySelector(`[data-${key}]`) as T;
  }

  setData() {
    this.getElement<HTMLSpanElement>(property.min).innerHTML = this.state.temp.min.toString();
    this.getElement<HTMLSpanElement>(property.max).innerHTML = this.state.temp.max.toString();
    this.getElement<HTMLSpanElement>(property.pressure).innerHTML = this.state.pressure.toString();
    this.getElement<HTMLSpanElement>(property.humidity).innerHTML = this.state.humidity.toString();
    this.getElement<HTMLSpanElement>(property.city).innerHTML = this.state.city.toString();
    this.getElement<HTMLImageElement>(property.icon).setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`
    );
  }
}

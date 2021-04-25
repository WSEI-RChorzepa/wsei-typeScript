import template from "./template.html";
import Component from "@components/Component";

export class WeatherWrapper extends Component {
  constructor() {
    super(template);
    this.setAttribute("layout", "main");
  }

  private get wrapper(): HTMLDivElement {
    return this.root.querySelector("div.grid") as HTMLDivElement;
  }

  private set setGrid(value: string) {
    if (value === "forecast") {
      this.wrapper.classList.add(`grid-forecast`);
      this.wrapper.classList.remove(`grid-main`);
    }
  }

  static get observedAttributes() {
    return ["layout"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "layout" && (newValue === "main" || newValue === "forecast")) {
      this.setGrid = newValue;
    }
  }
}

import { ElementType } from "./utils";
import Factory from "./elements/factory";

class Generator {
  constructor() {
    this.button.addEventListener("click", this.generate);
  }

  get container(): HTMLElement {
    return document.querySelector(".generator") as HTMLElement;
  }

  get input(): HTMLInputElement {
    return this.container.querySelector("input") as HTMLInputElement;
  }

  get inputs(): HTMLInputElement {
    return document.querySelector(".inputs") as HTMLInputElement;
  }

  get button(): HTMLButtonElement {
    return this.container.querySelector("button") as HTMLButtonElement;
  }

  private generate = (): void => {
    let value: number = +this.input.value;

    if (isNaN(value)) {
      Factory.create(ElementType.Alert).create();
    } else {
      for (let index = 0; index < value; index++) {
        Factory.create(ElementType.InputGroup).create();
      }
    }
  };
}

let generator = new Generator();

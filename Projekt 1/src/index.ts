import { FactoryElement } from "./factory";

class Summary {
  private get inputs(): HTMLInputElement[] {
    let container = document.querySelector("div.inputs") as HTMLElement;
    return Array.from(container.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
  }

  private get sum(): HTMLInputElement {
    return document.querySelector("#sum > input") as HTMLInputElement;
  }

  private get avg(): HTMLInputElement {
    return document.querySelector("#avg > input") as HTMLInputElement;
  }

  private get min(): HTMLInputElement {
    return document.querySelector("#min > input") as HTMLInputElement;
  }

  private get max(): HTMLInputElement {
    return document.querySelector("#max > input") as HTMLInputElement;
  }

  private calculateSum = (): number => {
    return this.inputs
      .map((input) => +input.value)
      .reduce((sum, value) => {
        return sum + value;
      }, 0);
  };

  private calculateAvg = (): number => {
    return this.calculateSum() ? this.calculateSum() / this.inputs.length : 0;
  };

  private calculateMin = (): number => {
    return this.calculateSum() ? Math.min(...this.inputs.map((input) => +input.value)) : 0;
  };

  private calculateMax = (): number => {
    return this.calculateSum() ? Math.max(...this.inputs.map((input) => +input.value)) : 0;
  };

  public update = (): void => {
    this.sum.value = this.calculateSum().toString();
    this.avg.value = this.calculateAvg().toString();
    this.min.value = this.calculateMin().toString();
    this.max.value = this.calculateMax().toString();
  };
}

class Generator {
  private summary: Summary = new Summary();
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
      this.inputs.prepend(FactoryElement.createAlertElement());
    } else {
      for (let index = 0; index < value; index++) {
        this.inputs.appendChild(FactoryElement.createInputGroup(this.summary.update));
      }
    }
  };
}

let generator = new Generator();

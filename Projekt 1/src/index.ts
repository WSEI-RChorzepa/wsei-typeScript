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

  public reset = (): void => {
    this.sum.value = "";
    this.avg.value = "";
    this.min.value = "";
    this.max.value = "";
  };
}

class Generator {
  private summary: Summary = new Summary();
  constructor() {
    this.input.addEventListener("change", this.generate);
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

  private clearInputsContainer = (): void => {
    (document.querySelector(".inputs") as HTMLElement).innerHTML = "";
  };

  private createInputsPromise = (value: number): Promise<void> => {
    this.clearInputsContainer();
    this.inputs.appendChild(FactoryElement.createLoader());
    this.input.setAttribute("disabled", "disabled");

    return new Promise((resolve) => {
      setTimeout(() => {
        this.clearInputsContainer();
        this.summary.reset();
        this.input.value = "";
        for (let index = 0; index < value; index++) {
          this.inputs.appendChild(FactoryElement.createInputGroup(this.summary.update));
        }
        resolve();
      }, 2000);
    });
  };

  private generate = (): void => {
    let value: number = +this.input.value;
    if (isNaN(value)) {
      this.inputs.prepend(FactoryElement.createAlertElement());
    } else {
      this.createInputsPromise(value).then(() => {
        this.input.removeAttribute("disabled");
      });
    }
  };
}

let generator = new Generator();

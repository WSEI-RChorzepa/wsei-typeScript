import HTMLComponentBase from "../HTMLComponentBase";
import template from "./template.html";

export class Search extends HTMLComponentBase {
  constructor() {
    super(template);
  }

  private get button(): HTMLButtonElement {
    return this.root.querySelector("button") as HTMLButtonElement;
  }

  private get input(): HTMLInputElement {
    return this.root.querySelector("input") as HTMLInputElement;
  }

  handleSearch = (callback: (city: string) => void) => {
    this.button.addEventListener("click", () => callback(this.input.value));
  };
}

import { IElement } from "../types";
import { ElementCreator } from "./elementCreator";

export default class Alert extends ElementCreator<HTMLElement> implements IElement {
  closeButtonCssSelector: string = ".alert__close__icon";

  constructor(templateId: string, parentCssSelector?: string) {
    super(templateId, parentCssSelector);
    this.assignId();
  }

  assignId = (): void => {
    (this.element.querySelector("div") as HTMLElement).setAttribute("id", this.id);
  };

  removeButton = (): HTMLButtonElement => {
    return this.getDomElement().querySelector(this.closeButtonCssSelector) as HTMLButtonElement;
  };

  public create = (): void => {
    this.parent.appendChild(this.element);
    let element = this.getDomElement();
    element.addEventListener("click", this.remove);
  };

  public remove = (): void => {
    let domElement = this.getDomElement();
    let closeButton = domElement.querySelector(this.closeButtonCssSelector) as HTMLButtonElement;

    closeButton.removeEventListener("click", this.remove);
    domElement.remove();
  };
}

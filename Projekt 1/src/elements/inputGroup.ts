import { IElement } from "../types";
import { ElementCreator } from "./elementCreator";

export default class InputGroup extends ElementCreator<HTMLElement> implements IElement {
  closeButtonCssSelector: string = "button.btn--danger";

  constructor(templateId: string, parentCssSelector?: string) {
    super(templateId, parentCssSelector);
    this.assignId();
  }

  assignId(): void {
    (this.element.querySelector("div") as HTMLElement).setAttribute("id", this.id);
  }

  removeButton = (): HTMLButtonElement => {
    return this.getDomElement().querySelector(this.closeButtonCssSelector) as HTMLButtonElement;
  };

  create = (): void => {
    this.parent.appendChild(this.element);
    let removeButton = this.removeButton();
    removeButton.addEventListener("click", this.remove);
  };
  remove = (): void => {
    let domElement = this.getDomElement();
    let removeButton = this.removeButton();

    removeButton.removeEventListener("click", this.remove);
    domElement.remove();
  };
}

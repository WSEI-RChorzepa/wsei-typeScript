import { Guid } from "./utils";

class TemplateElement {
  static getTemplate(templateId: string): HTMLElement {
    return (document.querySelector(`#${templateId}`) as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
  }
}

abstract class BaseElement {
  public id: string;
  protected template: HTMLElement;

  constructor(templateId: string) {
    this.id = Guid.newGuid();
    this.template = TemplateElement.getTemplate(templateId);
  }

  abstract create(): HTMLElement;
}

export class InputGroup extends BaseElement {
  constructor() {
    super("inputGroupTemplate");
  }

  public get input(): HTMLInputElement {
    return this.template.querySelector('input[type="number"]') as HTMLInputElement;
  }

  public get remove(): HTMLButtonElement {
    return this.template.querySelector("button") as HTMLButtonElement;
  }

  public create = (): HTMLElement => {
    (this.template.firstElementChild as HTMLElement).setAttribute("id", this.id);
    return this.template;
  };
}

export class Alert extends BaseElement {
  constructor() {
    super("alertTemplate");
  }

  public get message(): HTMLElement {
    return this.template.querySelector(".alert__message") as HTMLElement;
  }

  public set setMessage(message: string) {
    this.message.innerHTML = message;
  }

  public get close(): HTMLElement {
    return this.template.querySelector(".alert__close__icon") as HTMLElement;
  }

  private get date(): HTMLElement {
    return this.template.querySelector("small.alert__datetime") as HTMLElement;
  }

  public create = (): HTMLElement => {
    (this.template.firstElementChild as HTMLElement).setAttribute("id", this.id);
    this.date.innerText = new Date().toLocaleString("pl");
    return this.template;
  };
}

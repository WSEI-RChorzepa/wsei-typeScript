import { TemplateElement } from "./templateElements";
import { Guid } from "../utils";

export abstract class ElementCreator<T> {
  id: string;
  element: T;
  parent: HTMLElement;
  factory = new TemplateElement();

  getDomElement = (): T => {
    return (document.querySelector(`#${this.id}`) as any) as T;
  };

  constructor(templateId: string, parentCssSelector?: string) {
    this.id = Guid.newGuid();
    this.element = (this.factory.create(`#${templateId}`) as any) as T;

    if (parentCssSelector) {
      this.parent = document.querySelector(parentCssSelector) as HTMLElement;
    } else {
      this.parent = (this.element as any).parentElement;
    }
  }

  abstract assignId(): void;
  abstract removeButton(): HTMLButtonElement;
}

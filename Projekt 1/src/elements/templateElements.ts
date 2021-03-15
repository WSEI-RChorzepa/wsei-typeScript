import { ITemplateElement } from "../types";

export class TemplateElement implements ITemplateElement {
  create(templateId: string): Node {
    let template = document.querySelector(templateId) as HTMLTemplateElement;
    return template.content.cloneNode(true);
  }
}

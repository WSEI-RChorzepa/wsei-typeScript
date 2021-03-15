export interface IElement {
  create(): void;
  remove(): void;
}

export interface ITemplateElement {
  create(templateId: string): Node;
}

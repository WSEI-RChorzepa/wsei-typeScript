abstract class HTMLComponentBase extends HTMLElement {
  constructor() {
    super();
  }

  protected root: ShadowRoot = this.attachShadow({ mode: "closed" });

  protected abstract get styles(): HTMLStyleElement;
  protected abstract get template(): HTMLElement;

  protected render = (): void => {
    this.root.appendChild(this.styles);
    this.root.appendChild(this.template);
  };

  connectedCallback() {
    this.render();
  }
}

export default HTMLComponentBase;

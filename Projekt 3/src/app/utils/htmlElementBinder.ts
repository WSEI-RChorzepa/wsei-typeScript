import { Bindings } from "./types";

class HTMLElementBinder {
  private bindings: Bindings.ElementValueBinding = {
    style: (props) => this.bindStyles(props),
    text: (props) => this.bindText(props),
    attribute: (props) => this.bindAttribute(props),
    for: (props) => this.bindForeach(props),
    open: (props) => this.bindOpen(props),
    value: (props) => this.bindValue(props),
  };

  bind(key: string, props: Bindings.IProps) {
    if (!this.hasKey(key)) {
      this.bindings["attribute"](props);
    } else {
      this.bindings[key](props);
    }
  }

  hasKey(key: string): boolean {
    return Object.keys(this.bindings).includes(key);
  }

  private bindStyles = (props: Bindings.IProps): void => {
    const regex = /(?<=^.{1}).*({(.*?)})/g;
    const matched = regex.exec(props.stateKey) as RegExpExecArray;

    const [property, propertyValue] = props.stateKey
      .replace(matched[1], props.getState(matched[2]))
      .replace("{", "")
      .replace("}", "")
      .split(":")
      .map((a) => a.trim());

    props.element.style.setProperty(property, propertyValue);
  };

  private bindText = (props: Bindings.IProps): void => {
    props.element.innerHTML = props.getState(props.stateKey);
  };

  private bindAttribute = (props: Bindings.IProps): void => {
    props.element.setAttribute(props.attributeKey, props.getState(props.stateKey));
  };

  private bindForeach = (props: Bindings.IProps): void => {
    const regex = /(?<=^.{1}).*({(.*?)})/g;
    const matched = regex.exec(props.stateKey) as RegExpExecArray;

    const template = document.createElement("template");
    const items = props.getState<string[]>(matched[2]);

    props.element.innerHTML = "";

    for (let item of items) {
      template.innerHTML += props.stateKey.replace(matched[1], item).replace("{", "").replace("}", "");
    }

    props.element.appendChild(template.content.cloneNode(true));
    console.log();

    const nodes = Array.from(props.element.childNodes);
    if (nodes.length && props.callback) {
      for (let node of nodes) {
        const callback = props.callback as (ev: Event) => void;
        node.addEventListener("click", (ev: Event) => callback(ev));
      }
    }
  };

  private bindOpen = (props: Bindings.IProps): void => {
    if (props.getState<boolean>(props.stateKey)) {
      if (!props.element.classList.contains("open")) {
        props.element.classList.add("open");
      }
    } else {
      props.element.classList.remove("open");
    }
  };

  private bindValue = (props: Bindings.IProps): void => {
    props.element.setAttribute("value", props.getState(props.stateKey));
    (props.element as HTMLInputElement).value = props.getState(props.stateKey);
  };
}

export default HTMLElementBinder;

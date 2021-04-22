import template from "./template.html";
import { Alert, Component } from "app/components/types";
import ComponentWithState from "@components/ComponentWithState";

const initialState: Alert.IState = {
  message: "",
  title: "",
  type: "default",
};

export class AlertComponent extends ComponentWithState<Alert.IState> {
  constructor(props: Alert.IProps) {
    super(template);

    this.state.title = props.title;
    this.state.message = props.message;
    this.state.type = props.type;
  }

  private timeout: ReturnType<typeof setTimeout> | null = null;

  protected state: Alert.IState = new Proxy<Alert.IState>(initialState, {
    get(object, target, receiver) {
      return Reflect.get(object, target, receiver);
    },
    set: (object, target, value) => {
      const key = target as string;
      object[key] = value;

      this.configuration.bindings[target as string]?.onChange();

      return Reflect.set(object, target, value);
    },
  });

  protected configuration: Component.IConfiguration = {
    bindings: {
      title: { onChange: () => this.updateElement("title") },
      message: { onChange: () => this.updateElement("message") },
      type: { onChange: () => this.updateElement("type", `alert alert-${this.state.type}`) },
    },
  };

  get wrapper(): HTMLDivElement {
    return this.root.querySelector("div.alert") as HTMLDivElement;
  }

  get button(): HTMLButtonElement {
    return this.root.querySelector("button") as HTMLButtonElement;
  }

  get alertCount(): number {
    const container = document.querySelector("#alert-container");

    if (container === null) return 0;

    return container.querySelectorAll("app-alert").length;
  }

  private handleSlideout = () => {
    this.wrapper.classList.add("slideout");
    setTimeout(() => {
      clearTimeout(this.timeout as ReturnType<typeof setTimeout>);
      this.remove();

      if (!this.alertCount) {
        document.querySelector("#alert-container")?.remove();
      }
    }, 250);
  };

  connectedCallback() {
    this.button.addEventListener("click", this.handleSlideout);

    this.timeout = setTimeout(() => {
      this.handleSlideout();
    }, 5000);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.handleSlideout);
  }
}

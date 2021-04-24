import template from "./template.html";
import { Alert, Component } from "app/components/types";
import ComponentWithState from "@components/ComponentWithState";

export class AlertComponent extends ComponentWithState<Alert.IState> {
  constructor(props: Alert.IProps) {
    super(template);

    this.state.title = props.title;
    this.state.message = props.message;
    this.state.type = props.type;
  }

  private timeout: ReturnType<typeof setTimeout> | null = null;
  protected state: Alert.IState = this.createState<Alert.IState>({
    message: "",
    title: "",
    type: "default",
    duration: 5000,
  });

  protected configuration: Component.IConfiguration = {
    bindings: {
      title: { onChange: () => this.updateElement("title") },
      message: { onChange: () => this.updateElement("message") },
      type: { onChange: () => this.updateElement("type", `alert alert-${this.state.type}`) },
    },
  };

  set duration(miliseconds: number) {
    this.state.duration = miliseconds;
  }

  private get wrapper(): HTMLDivElement {
    return this.root.querySelector("div.alert") as HTMLDivElement;
  }

  private get button(): HTMLButtonElement {
    return this.root.querySelector("button") as HTMLButtonElement;
  }

  private get alertCount(): number {
    const container = document.querySelector("#alert-container");

    if (container === null) return 0;

    return container.querySelectorAll("app-alert").length;
  }

  private get progress(): HTMLDivElement {
    return this.root.querySelector("div.progress") as HTMLDivElement;
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

    this.progress.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], { duration: this.state.duration, fill: "forwards" });

    this.timeout = setTimeout(() => {
      this.handleSlideout();
    }, this.state.duration);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.handleSlideout);
  }
}

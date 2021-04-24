import { AlertComponent } from "@components";
import { Alert } from "@components/types";

export const createAlert = (() => {
  const getContainer = (): HTMLDivElement => {
    const containerElement = document.querySelector("#alert-container");

    if (containerElement == null) {
      const container = document.createElement("div");
      container.setAttribute("id", "alert-container");

      document.querySelector("body")?.append(container);
      return container;
    }

    return containerElement as HTMLDivElement;
  };

  const create = (props: Alert.IProps): void => {
    const container = getContainer();
    const alert = new AlertComponent(props);

    if (props.duration) {
      alert.duration = props.duration as number;
    }

    container.appendChild(alert);
  };

  const info = (title: string, message: string, duration?: number): void => create({ title, message, type: "info", duration });
  const success = (title: string, message: string, duration?: number): void => create({ title, message, type: "success", duration });
  const warning = (title: string, message: string, duration?: number): void => create({ title, message, type: "warning", duration });
  const danger = (title: string, message: string, duration?: number): void => create({ title, message, type: "danger", duration });

  return {
    info,
    success,
    warning,
    danger,
  };
})();

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
    container.appendChild(new AlertComponent(props));
  };

  const info = (title: string, message: string): void => create({ title, message, type: "info" });
  const success = (title: string, message: string): void => create({ title, message, type: "success" });
  const warning = (title: string, message: string): void => create({ title, message, type: "warning" });
  const danger = (title: string, message: string): void => create({ title, message, type: "danger" });

  return {
    info,
    success,
    warning,
    danger,
  };
})();

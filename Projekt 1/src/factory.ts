import { Alert, InputGroup } from "./elements";

export class FactoryElement {
  public static createAlertElement(): HTMLElement {
    let alert = new Alert();

    function removehandler(): void {
      let container = document.querySelector(`#${alert.id}`) as HTMLElement;
      let closeButton = container.querySelector(".alert__close__icon") as HTMLElement;

      closeButton.removeEventListener("click", removehandler);
      container.remove();
    }

    alert.setMessage = "An invalid value was entered. Please enter only a numeric value.";
    alert.close.addEventListener("click", removehandler);

    return alert.create();
  }

  public static createInputGroup(onchangeCallback: Function): HTMLElement {
    let inputGroup = new InputGroup();

    function onChange(): void {
      return onchangeCallback();
    }

    function removehandler(): void {
      let container = document.querySelector(`#${inputGroup.id}`) as HTMLElement;
      let removeButton = container.querySelector("button.btn--danger") as HTMLElement;
      let input = container.querySelector('input[type="number"]') as HTMLElement;

      removeButton.removeEventListener("click", removehandler);
      input.removeEventListener("change", onChange);
      container.remove();

      onChange();
    }

    inputGroup.input.addEventListener("change", onChange);
    inputGroup.remove.addEventListener("click", removehandler);

    return inputGroup.create();
  }
}

import { createAlert } from "@utils/alert";

export class ClearHistoryButton extends HTMLButtonElement {
  constructor() {
    super();
  }

  private handleClearHistory() {
    localStorage.clear();
    createAlert.info("", "The stored weather data was cleared successfully.");
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClearHistory);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClearHistory);
  }
}

export class CloseButton extends HTMLButtonElement {
  constructor() {
    super();
    this.innerHTML = "&times;";
  }
}

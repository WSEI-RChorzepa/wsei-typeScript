import { createAlert } from "@utils/alert";

export class ClearHistoryButton extends HTMLButtonElement {
  constructor() {
    super();
  }

  private handleClearHistory() {
    localStorage.clear();
    createAlert.info("", "Dane zostały pomyślnie wyczyszczone");
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

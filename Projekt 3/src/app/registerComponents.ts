import * as Component from "./components";

window.customElements.define("app-alert", Component.AlertComponent);
window.customElements.define("app-autocomplete", Component.AutocompleteComponent);
window.customElements.define("weather-tile", Component.TileComponent);
window.customElements.define("app-spinner", Component.SpinnerComponent);
window.customElements.define("clear-history", Component.ClearHistoryButton, { extends: "button" });
window.customElements.define("close-button", Component.CloseButton, { extends: "button" });

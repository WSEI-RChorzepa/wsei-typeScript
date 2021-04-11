import HTMLComponentBase from "./HTMLComponentBase";

class SearchGroup extends HTMLComponentBase {
  protected get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    return styles;
  }

  protected get template(): HTMLElement {
    let element = document.createElement("div");
    element.classList.add("wrapper");
    element.innerHTML = /*html*/ `
        <div>
          <input placeholder="Enter city name..." />
          <button>Add</button>
        </div>
      `;

    return element;
  }
}

export default SearchGroup;

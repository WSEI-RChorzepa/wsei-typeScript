import BaseHTMLElement from "./BaseComponent";

class ProgressBar extends BaseHTMLElement {
  constructor() {
    super();
  }

  protected get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    styles.textContent = `
              :host {
                position: relative;
                height: 25px;
                width: 100%;
                display: block;
            }
            .wrapper {
                display: flex;
                align-items: center;
                height: 100%;
            }
            .mark {
                position: relative;
                left: 0%;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #3498db;        
            }
            `;

    return styles;
  }

  protected get template(): HTMLElement {
    let element = document.createElement("div");
    element.classList.add("wrapper");
    element.innerHTML = /*html*/ `
        <div class="mark">
        </div>
      `;

    return element;
  }

  private get mark() {
    return this.root.querySelector(".mark") as HTMLElement;
  }

  public handleAnimate = (duration: number): void => {
    this.mark.animate(
      [
        {
          left: "0%",
        },
        {
          left: "100%",
        },
      ],
      {
        duration: duration,
      }
    );
  };

  connectedCallback() {
    this.render();
  }
}

export default ProgressBar;

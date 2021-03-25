class ConsoleButton extends HTMLButtonElement {
  constructor() {
    super();
    this.appendChild(this.styles);
  }

  private get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    styles.textContent = `
        :host {
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
        button {
            border: 1px solid #95a5a6;
            outline: none;
            padding: 5px 10px;
            border-radius: 2px;
            color: #FFF;
            background-color: #95a5a6;
            transition: background-color 200ms ease-in-out;
        }
        button:focus{
            border: 1px solid transparent;
            focus: none;
        }
        button:hover {
            cursor: pointer;
        }
        button[disabled] {
            background-color: #bdc3c7;
            border: 1px solid #bdc3c7;
        }
        button[disabled]:hover {
            cursor: not-allowed;
        }
        .record {
            background-color: #e74c3c;
            border: 1px solid #e74c3c;
            width: 80px;
        }
        .stop {
            background-color: #3498db;
            border: 1px solid #3498db;
            width: 80px;
        }
        .play {
            background-color: #27ae60;
            border: 1px solid #27ae60;
        }
    `;

    return styles;
  }
}

export default ConsoleButton;

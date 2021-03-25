import { ITrack } from "../types";
import ProgressBar from "./ProgressBar";

class TrackComponent extends HTMLElement {
  constructor() {
    super();
  }

  public track: ITrack[] = [];
  private root: ShadowRoot = this.attachShadow({ mode: "closed" });

  get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    styles.textContent = `
            :host {
                display: block;
                width: 100%;
                margin-bottom: 10px;
            }
            .flex {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
            }
            .wrapper {
              display: grid;
              grid-template-columns: 150px calc(100% - 250px) 100px;
            }
            .buttons-container{
              grid-column: 1;
            }
            .progress-container {
              grid-column: 2;
            }
            .time-container {
              grid-column: 3;
              display: flex;
              justify-content: center;
              align-items: center;
            }

        `;
    return styles;
  }

  public reset = (): void => {
    this.track = [];
    this.playButton.setAttribute("disabled", "disabled");
    this.time.innerText = "0.00 s";
  };

  private get template(): HTMLElement {
    let element = document.createElement("div");
    element.classList.add("wrapper");
    element.innerHTML = /*html*/ `
        <div class="buttons-container">
          <button is='console-button' data-record class='record'>Record</button>
          <button is='console-button'  data-play class='play' disabled>Play</button>
        </div>
        <div class='progress-container'>
            <progress-bar></progress-bar>    
        </div>
        <div class="time-container">
        <span class="time"></span>
        </div>
        `;
    return element;
  }

  get recording(): boolean {
    return this.getAttribute("recording") === "true" ? true : false;
  }

  set recording(value: boolean) {
    this.setAttribute("recording", `${value}`);
  }

  get totalTime(): number {
    return this.track.length ? this.track[this.track.length - 1].time - this.track[0].time : 0;
  }

  private get recordButton(): HTMLButtonElement {
    return this.root.querySelector("button[data-record]") as HTMLButtonElement;
  }

  private get playButton(): HTMLButtonElement {
    return this.root.querySelector("button[data-play]") as HTMLButtonElement;
  }

  private get progressBar(): ProgressBar {
    return this.root.querySelector("progress-bar") as ProgressBar;
  }

  private get time(): HTMLSpanElement {
    return this.root.querySelector("span.time") as HTMLSpanElement;
  }

  private handleRecord = (): void => {
    this.recording = !this.recording;
  };

  private handlePlay = (): void => {
    if (this.track.length) {
      this.playButton.setAttribute("disabled", "disabled");
      this.recordButton.setAttribute("disabled", "disabled");

      this.progressBar.handleAnimate(this.totalTime);

      this.play().then(() => {
        this.playButton.removeAttribute("disabled");
        this.recordButton.removeAttribute("disabled");
      });
    }
  };

  private play = (): Promise<void> => {
    const body = document.querySelector("body") as HTMLElement;

    for (let index = 0; index < this.track.length; index++) {
      setTimeout(() => {
        body.dispatchEvent(new KeyboardEvent("keypress", { key: this.track[index].key }));
      }, this.track[index].time - this.track[0].time);
    }

    return new Promise((resolve) => setTimeout(resolve, this.totalTime));
  };

  private render = (): void => {
    this.root.appendChild(this.styles);
    this.root.appendChild(this.template);
    this.recording = false;
  };

  static get observedAttributes() {
    return ["recording"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "recording") {
      this.updateRecordingButtonState();
    }
  }

  connectedCallback() {
    this.render();
    this.setAttribute("data-record", `${this.recording}`);
    this.recordButton.addEventListener("click", this.handleRecord);
    this.playButton.addEventListener("click", this.handlePlay);
  }

  disconnectedCallback() {
    this.recordButton.removeEventListener("click", this.handleRecord);
    this.playButton.removeEventListener("click", this.handlePlay);
  }

  updateRecordingButtonState = (): void => {
    let btn = this.recordButton;

    if (!this.recording) {
      btn.innerHTML = "Record";
      btn.classList.add("stop");
      btn.classList.remove("record");
      this.playButton.hasAttribute("disabled") ? this.playButton.removeAttribute("disabled") : null;
      this.time.innerText = `${(this.totalTime / 1000).toFixed(2)} s`;

      if (this.track.length) {
        this.playButton.removeAttribute("disabled");
      } else {
        this.playButton.setAttribute("disabled", "disabled");
      }
    } else {
      this.track = [];
      btn.innerHTML = "Stop";
      btn.classList.add("record");
      btn.classList.remove("stop");
      this.playButton.setAttribute("disabled", "disabled");
    }
  };
}

export default TrackComponent;

import { IMediator, IAudioComponentProperties } from "../types";

class AudioComponent extends HTMLElement {
  private mediator: IMediator;
  private sound: string;
  private name: string;
  private key: string;
  private root: ShadowRoot = this.attachShadow({ mode: "closed" });

  constructor(medaitor: IMediator, properties: IAudioComponentProperties) {
    super();
    this.mediator = medaitor;
    this.sound = properties.sound;
    this.name = properties.name;
    this.key = properties.key;
  }

  private get styles(): HTMLStyleElement {
    const styles = document.createElement("style");
    styles.textContent = `
        :host {
            display: inline-block;
        }
        div {
            background-color: rgba(52, 73, 94,1.0);
            color: #FFF;
            border-radius: 2px;
            margin: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 150px;
            height:150px;
            color: #FFF;
            text-align: center;
            transition: all 300ms ease;
        }
        div:hover {
            cursor: pointer;
            background-color: #16a085;
        }
        `;
    return styles;
  }

  private get template(): HTMLElement {
    let element = document.createElement("div");
    element.innerHTML = /*html*/ `
            <div class="container">
                <p>Sound <strong>${this.name.toUpperCase()}</strong></p>
                <span>Key: ${this.key.toUpperCase()}</span>
                <audio data-sound='${this.name}'></audio>
            </div> `;

    return element;
  }

  private get body(): HTMLElement {
    return document.querySelector("body") as HTMLElement;
  }

  private get container(): HTMLElement {
    return this.root.querySelector(".container") as HTMLAudioElement;
  }

  private get audio(): HTMLAudioElement {
    return this.root.querySelector("audio") as HTMLAudioElement;
  }

  private render = (): void => {
    this.root.appendChild(this.styles);
    this.root.appendChild(this.template);
  };

  private handleAnimate = (): void => {
    (this.audio.parentElement as HTMLElement).animate(
      [
        {
          transform: "scale(1)",
          backgroundColor: "#16a085",
        },
        {
          transform: "scale(1.2)",
          backgroundColor: "#16a085",
        },
      ],
      {
        duration: 250,
      }
    );
  };

  private handlePlay = (ev: Event): void => {
    const registerSound = (timeStamp: number): void => {
      this.audio.currentTime = 0;
      this.audio.play();
      this.handleAnimate();
      this.mediator.notify({ key: this.key, time: timeStamp });
    };

    if ((ev as KeyboardEvent).key === this.key) {
      registerSound(ev.timeStamp);
    } else if (ev instanceof MouseEvent) {
      registerSound(ev.timeStamp);
    }
  };

  connectedCallback() {
    this.render();
    this.audio.src = this.sound;
    this.body.addEventListener("keypress", this.handlePlay);
    this.container.addEventListener("click", this.handlePlay);
  }

  disconnectedCallback() {
    this.body.removeEventListener("keypress", this.handlePlay);
  }
}

export default AudioComponent;

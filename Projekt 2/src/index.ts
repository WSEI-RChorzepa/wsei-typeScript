import { Mediator } from "./mediator";
import { IMediator } from "./types";
import { Factory, ISample, Sample } from "./sampleLibray";
import { AudioComponent, TrackComponent, ProgressBar } from "./components/index";

class App {
  private mediator: IMediator;
  private samples: Map<string, ISample> = new Map();
  private select: HTMLSelectElement;

  get samplesContainer(): HTMLElement {
    return document.querySelector(".samples__wrapper") as HTMLElement;
  }

  constructor(mediator: IMediator) {
    this.mediator = mediator;
    this.select = document.querySelector("#instrument") as HTMLSelectElement;
    this.attachEvents();
  }

  attachEvents = (): void => {
    this.select.addEventListener("change", ({ target }) => {
      let value: string = (target as HTMLInputElement).value;
      this.samples = Factory.getSamples(value as Sample) as Map<string, ISample>;
      if (this.samples !== undefined) {
        this.samplesContainer.innerHTML = "";
        this.render();
      }
    });
  };

  render = (): void => {
    this.samples.forEach((value, key) => {
      let audio = new AudioComponent(this.mediator, { key: value.key, name: key, sound: value.sound });
      this.samplesContainer.appendChild(audio);
    });
  };
}

window.customElements.define("audio-component", AudioComponent);
window.customElements.define("track-component", TrackComponent);
window.customElements.define("progress-bar", ProgressBar);

const mediator = new Mediator();
new App(mediator);

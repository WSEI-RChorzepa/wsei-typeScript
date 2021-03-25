import { RecordingMediator } from "./recordingMediator";
import { IMediator } from "./types";
import { Factory, ISample, Sample } from "./sampleLibray";
import { AudioComponent, TrackComponent, ConsoleButton, ProgressBar } from "./components/index";

class App {
  private mediator: IMediator;
  private samples: Map<string, ISample> = new Map();
  private select: HTMLSelectElement;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
    this.select = document.querySelector("#instrument") as HTMLSelectElement;
    this.attachEvents();
  }

  get samplesContainer(): HTMLElement {
    return document.querySelector(".samples__wrapper") as HTMLElement;
  }

  get tracksContainer(): HTMLElement {
    return document.querySelector(".tracks__wrapper") as HTMLElement;
  }

  private resetTracks = (): void => {
    let tracks = this.tracksContainer.querySelectorAll("track-component") as NodeListOf<TrackComponent>;

    for (let track of tracks) {
      track.reset();
    }
  };

  private showConsole = (): void => {
    this.samplesContainer.innerHTML = "";
    this.tracksContainer.classList.remove("hidden");
    this.render();
    this.resetTracks();
  };

  private renderSamples = (value: string): void => {
    this.samples = Factory.getSamples(value as Sample) as Map<string, ISample>;
  };

  attachEvents = (): void => {
    this.select.addEventListener("change", ({ target }) => {
      this.renderSamples((target as HTMLInputElement).value);
      if (this.samples !== undefined) {
        this.showConsole();
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
window.customElements.define("console-button", ConsoleButton, {
  extends: "button",
});

const mediator = new RecordingMediator();
new App(mediator);

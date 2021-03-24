import { IMediator, ITrack } from "./types";
import TrackComponent from "./components/TrackComponent";

export class Mediator implements IMediator {
  private components: TrackComponent[] = [];

  constructor() {
    this.refreshTrackingComponents();
  }

  private get trackingComponents(): TrackComponent[] {
    const components = document.querySelectorAll("track-component") as NodeListOf<TrackComponent>;
    return Array.from(components);
  }

  public refreshTrackingComponents = (): void => {
    this.components = [];
    this.components = this.trackingComponents;
  };

  notify(ev: KeyboardEvent): void {
    for (let component of this.components) {
      if (component.recording) {
        component.track.push({ key: ev.key, time: ev.timeStamp });
      }
    }
  }
}

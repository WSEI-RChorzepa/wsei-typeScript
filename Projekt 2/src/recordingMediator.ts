import { IMediator, ITrack } from "./types";
import TrackComponent from "./components/TrackComponent";

export class RecordingMediator implements IMediator {
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

  notify(track: ITrack): void {
    for (let component of this.components) {
      if (component.recording) {
        component.track.push(track);
      }
    }
  }
}

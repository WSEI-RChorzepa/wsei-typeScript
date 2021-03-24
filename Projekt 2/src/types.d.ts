export interface IMediator {
  notify(ev: Event): void;
}

export interface ITrack {
  key: string;
  time: number;
}

export interface IAudioComponentProperties {
  key: string;
  name: string;
  sound: string;
}

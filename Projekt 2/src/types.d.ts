export interface IMediator {
  notify(track: ITrack): void;
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

export enum SampleType {
    Drums
}

export interface ISample {
    key: string,
    sound: string
}

const library: Map<SampleType, Map<string, ISample>> = new Map();
library.set(SampleType.Drums, new Map<string, ISample>([
    ['clap', {
        key: 'q',
        sound: './samples/drums/clap.wav'
    }],
    ['kick', {
        key: 'w',
        sound: './samples/drums/kick.wav'
    }],
    ['hihat', {
        key: 'e',
        sound: './samples/drums/hihat.wav'
    }],
]))

export class Factory {
    public static getSamples(name: SampleType): Map<string, ISample> {
        return library.get(name) as Map<string, ISample>;
    }
}
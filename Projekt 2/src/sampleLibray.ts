export enum SampleType {
    Drums
}

export type Sample = 'drums' | 'violin';

export interface ISample {
    key: string,
    sound: string
}

const library: Map<Sample, Map<string, ISample>> = new Map();
library.set('drums', new Map<string, ISample>([
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
    ['perc', {
        key: 'r',
        sound: './samples/drums/perc.wav'
    }],
    ['snare', {
        key: 'a',
        sound: './samples/drums/snare.wav'
    }],
    ['cowbell', {
        key: 's',
        sound: './samples/drums/cowbell.wav'
    }],
    ['crash', {
        key: 'd',
        sound: './samples/drums/crash.wav'
    }],
    ['openhat', {
        key: 'f',
        sound: './samples/drums/openhat.wav'
    }],
]))

library.set('violin', new Map<string, ISample>([
    ['detache', {
        key: 'q',
        sound: './samples/violin/detache.mp3'
    }],
    ['glissando', {
        key: 'w',
        sound: './samples/violin/glissando.mp3'
    }],
    ['legato', {
        key: 'e',
        sound: './samples/violin/legato.mp3'
    }],
    ['martele', {
        key: 'r',
        sound: './samples/violin/martele.mp3'
    }],
    ['spiccato', {
        key: 'a',
        sound: './samples/violin/spiccato.mp3'
    }],
    ['talon', {
        key: 's',
        sound: './samples/violin/talon.mp3'
    }],
    ['tenuto', {
        key: 'd',
        sound: './samples/violin/tenuto.mp3'
    }],
    ['tremolo', {
        key: 'f',
        sound: './samples/violin/tremolo.mp3'
    }],
    ['trill', {
        key: 'g',
        sound: './samples/violin/trill.mp3'
    }],
]))


export class Factory {
    public static getSamples(name: Sample): Map<string, ISample> {
        return library.get(name) as Map<string, ISample>;
    }
}
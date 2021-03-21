class Sounds {

    public Samples: Map<string, string> = new Map();

    load =(): void => {
        this.Samples.set('q', './samples/drums/clap.wav');
        this.Samples.set('w', './samples/drums/kick.wav');
        this.Samples.set('e', './samples/drums/hihat.wav');
    }

}

class App {

    private Sounds: Sounds = new Sounds();

    constructor() {
        this.Sounds.load();
        this.attachEvents();
        this.renderAudioComponents();
    }

    attachEvents = (): void  => {
        const body: HTMLElement = document.querySelector('body') as HTMLElement;
        body.addEventListener('keypress', this.playSound);
    }

    renderAudioComponents = (): void => {
        let body: HTMLElement =  document.querySelector('body') as HTMLElement;

        console.log(this.Sounds.Samples)

       this.Sounds.Samples.forEach(sample =>{
         body.appendChild(AudioElement(sample));
       });

    }

    playSound =(ev: KeyboardEvent): void=> {
    
        if(this.Sounds.Samples.has(ev.key)){
            let sound = this.Sounds.Samples.get(ev.key);      
        }
    }

}

function AudioElement(path: string): HTMLElement{

    const name = path.substr(path.lastIndexOf('/')+1,  path.lastIndexOf('.') - path.lastIndexOf('/')-1)

    const template = document.createElement('audio');
    template.setAttribute('data-sound', name);
    template.src = path;
    template.currentTime = 0;

    return template;
}

new App();
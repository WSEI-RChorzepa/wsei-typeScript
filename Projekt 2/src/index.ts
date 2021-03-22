import AudioComponent from'./components/AudioComponent';
import  {Factory, ISample, Sample } from './sampleLibray'

class App {

    private samples: Map<string, ISample> = new Map();
    private select: HTMLSelectElement;

    get samplesContainer(): HTMLElement {
        return  document.querySelector('.samples__wrapper') as HTMLElement;
    }

    constructor() {
        this.select =document.querySelector('#instrument') as HTMLSelectElement;
        this.attachEvents();
    }

    attachEvents = ():void => {
        this.select.addEventListener('change', ({ target }) => {
            let value: string = (target as HTMLInputElement).value;
            this.samples = Factory.getSamples(value as Sample) as Map<string, ISample>;
            if(this.samples !== undefined) {
                this.samplesContainer.innerHTML = "";
                this.render();
            }
        })
    }

   render =(): void => {

    this.samples.forEach((value, key) => {
        let audio = new AudioComponent(key, value.key, value.sound);
        this.samplesContainer.appendChild(audio);
    });
   }

}


window.customElements.define('audio-component', AudioComponent);

new App();
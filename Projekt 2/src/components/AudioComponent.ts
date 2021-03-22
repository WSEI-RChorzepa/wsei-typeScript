class AudioComponent extends HTMLElement {

    private sound: string;
    private name: string;
    private key: string;
    private root: ShadowRoot;

    constructor(name: string, key: string, sound: string) {
        super();
        this.sound =sound;
        this.name = name;
        this.key = key;

        this.root = this.attachShadow({mode: 'closed'});
    }

    get styles (): HTMLStyleElement {
        const styles = document.createElement('style');
        styles.textContent = `
        :host {
            display: inline-block;
        }
        div {
            background-color: #3498db;
            color: #FFF;
            border-radius: 2px;
            margin: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 150px;
            height:150px;
            color: #FFF;
            text-align: center;
            transition: all 300ms ease;
        }
        div:hover {
            cursor: pointer;
            background-color: #16a085;
        }
        div:active {
            transform: scale(1.1);
        }
        @keyframes press {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(2);
            }
          }
          
          .press-animation {
            animation: press 300ms;
          }
        `;
        return styles;
    }

    private get template(): HTMLElement {
        let element = document.createElement('div');
        element.innerHTML = `
            <div class="container">
                <p>Sound <strong>${this.name.toUpperCase()}</strong></p>
                <span>Key: ${this.key.toUpperCase()}</span>
                <audio data-sound=['${this.name}']></audio>
            </div> `;

            return element;
    }

    private get body(): HTMLElement {
        return document.querySelector('body') as HTMLElement;
    }

    private get container(): HTMLElement{
        return this.root.querySelector('div.container') as HTMLElement;
    }

    private get audio() :HTMLAudioElement {
        return this.root.querySelector('audio') as HTMLAudioElement;
    }

    private render = ():void => {
            this.root.appendChild(this.styles);
            this.root.appendChild(this.template);
    }

    private handlePlay= (ev: Event):void => {

        if(ev instanceof KeyboardEvent ) {
             if((ev as KeyboardEvent).key === this.key){
            this.audio.currentTime = 0;
            this.audio.play();
            ((this.audio.parentElement) as HTMLElement).animate([
                {transform: 'scale(1)'},
                {transform: 'scale(1.2)', backgroundColor: '#34495e'},
              ], {
                duration: 250
              })
        }  
    }else if(ev instanceof MouseEvent ) {
        this.audio.currentTime = 0;
        this.audio.play();
      }

}

    connectedCallback() {
        this.render();
        this.audio.src = this.sound;
        this.body.addEventListener('keypress', this.handlePlay);  
        this.container.addEventListener('click', this.handlePlay);  
    }

    disconnectedCallback() {
        this.body.removeEventListener('keypress', this.handlePlay);  
        this.container.removeEventListener('click', this.handlePlay);  
    }

}

export default AudioComponent;
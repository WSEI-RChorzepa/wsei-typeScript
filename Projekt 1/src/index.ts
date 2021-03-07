class InputGroupTemplate {

    private handleDelete(parentNode : HTMLElement, inputGroup: HTMLElement) : void {
        parentNode.removeChild(inputGroup);
    }

    private _inputGroup() : HTMLElement {
        let inputGroup = document.createElement("div");
        inputGroup.classList.add("col-2", "input-group", "m-1");

        return inputGroup;
    }

    private _input() : HTMLInputElement {
        let input = document.createElement("input");
        input.classList.add("form-control");
        input.setAttribute('type', "number");
        input.setAttribute('value', '0');

        return input;
    }

    private _closeButton() : HTMLButtonElement {
        let closeButton = document.createElement('button');
        closeButton.classList.add("btn", "btn-danger", "btn-sm");
        closeButton.innerHTML = '&times;'

        return closeButton;
    }

    private _createInputGroup(parentNode : HTMLElement) : HTMLElement {
       let inputGroup = this._inputGroup();
        let input = this._input();
        let closeButton = this._closeButton();

        closeButton.addEventListener('click', () => this.handleDelete(parentNode, inputGroup))

        inputGroup.appendChild(input);
        inputGroup.appendChild(closeButton);

        return inputGroup;
    }

    public Create(parentNode : HTMLElement) : HTMLElement {
        return this._createInputGroup(parentNode);
    }

}

class Input {

    private _quantity : HTMLInputElement =  document.querySelector("#quantity") as HTMLInputElement;
    private _generate : HTMLButtonElement = document.querySelector("#generate") as HTMLButtonElement;
    private _inputsContainer : HTMLElement = document.querySelector("#input-container") as HTMLElement;

    private _inputGroupGenerator : InputGroupTemplate = new InputGroupTemplate();

    constructor() {
        this._generate.addEventListener('click', () => this.generateInputs())
    }

    get _getQuantity() : number {
        return  +this._quantity.value;
    }


    private generateInputs() : void {
        for (let index = 0; index < this._getQuantity; index++) {
            this._inputsContainer.appendChild(this._inputGroupGenerator.Create(this._inputsContainer))
        } 
    }

}

let project = new Input();
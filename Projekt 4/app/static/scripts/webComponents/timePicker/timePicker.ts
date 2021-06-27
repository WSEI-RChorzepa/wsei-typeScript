class TimePicker extends HTMLSelectElement {
  public min: number;
  public max: number;

  constructor() {
    super();
    this.appendOptions(6);
    this.style.width = '100%';
    this.min = 6;
    this.max = 23;
  }

  private appendOptions = (start: number) => {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Please select time';
    defaultOption.selected = true;
    defaultOption.disabled = true;

    this.appendChild(defaultOption);

    for (let index = start; index < 24; index++) {
      const option = document.createElement('option');
      option.value = `${index}`;
      option.text = index <= 9 ? `0${index}:00` : `${index}:00`;

      this.appendChild(option);
    }
  };

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log(`Change: ${name}`);
  }

  static get observedAttributes() {
    return ['min', 'max'];
  }

  //TODO UPDATE AVAILABLE HOURS

  public refresh = (start: number) => {
    const options = Array.from(this.options);

    for (let option of this.options) {
      option.disabled = true;
    }

    for (let index = start - 4; index < options.length; index++) {
      options[index].disabled = false;
    }
  };
}

export default TimePicker;

import template from "./template.html";
import { Autocomplete, Component } from "app/components/types";
import ComponentWithState from "@components/ComponentWithState";

const initialState: Autocomplete.IState = {
  placeholder: "",
  value: "",
  items: [],
  autocompleteItems: [],
  timeout: {
    delay: 500,
  },
  open: false,
  callback: () => {},
};

export class AutocompleteComponent extends ComponentWithState<Autocomplete.IState> {
  constructor() {
    super(template);
  }

  protected state: Autocomplete.IState = new Proxy<Autocomplete.IState>(initialState, {
    get(object, target, receiver) {
      return Reflect.get(object, target, receiver);
    },
    set: (object, target, value) => {
      const key = target as string;
      object[key] = value;

      this.configuration.bindings[target as string]?.onChange();

      return Reflect.set(object, target, value);
    },
  });

  protected configuration: Component.IConfiguration = {
    bindings: {
      placeholder: {
        onChange: () => this.updateElement("placeholder"),
      },
      value: {
        onChange: () => {
          this.updateElement("value");
          const itemsWrapper = this.root.querySelector("div.items-container") as HTMLDivElement;
          if (itemsWrapper.classList.contains("open")) {
            itemsWrapper.classList.remove("open");
          }
        },
      },
      autocompleteItems: {
        onChange: () => {
          this.updateElement("autocompleteItems", undefined, this.handleSelect);
          this.state.open = this.state.autocompleteItems.length ? true : false;
        },
      },
      open: {
        onChange: () => this.updateElement("open"),
      },
    },
  };

  private handleSelect = (ev: Event) => {
    const value = (ev.target as HTMLElement).innerText;
    if (value.length) {
      this.state.value = value;
    }
    console.log(value);
  };

  private get autocompleteItems(): HTMLDivElement {
    return this.root.querySelector(".items-container") as HTMLDivElement;
  }

  private get input(): HTMLInputElement {
    return this.root.querySelector("input") as HTMLInputElement;
  }

  set value(value: string) {
    this.state.value = value;
  }

  set placeholder(value: string) {
    this.state.placeholder = value;
  }

  set items(values: string[]) {
    this.state.items = values;
  }

  set callback(callback: (value: string) => void) {
    this.state.callback = callback;
  }

  private handleChange = (ev: KeyboardEvent): void => {
    const { value } = ev.target as HTMLInputElement;
    this.state.value = value;

    const timeout = this.state.timeout;

    clearTimeout(this.state.timeout.value as ReturnType<typeof setTimeout>);

    timeout.value = setTimeout(() => {
      if (value.length === 0) {
        this.state.autocompleteItems = [];
      } else {
        let items = this.state.items.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
        this.state.autocompleteItems = items;
      }
    }, timeout.delay);
  };

  connectedCallback() {
    this.input.addEventListener("keyup", this.handleChange);
  }

  disconnectedCallback() {
    // this.configuration.elements["input"].removeEventListener("keyup", this.handleChange);
  }
}

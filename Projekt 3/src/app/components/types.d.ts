import { Weather } from "app/services/types";

export type State = {
  [key: string]: object | string | number | boolean | Date | null;
};

export type Binding = {
  [key: string]: {
    execute: () => void;
  };
};

export type Element = {
  [key: string]: HTMLElement;
};

export interface IConfiguration {
  bindings: Binding;
  elements: Element;
}

namespace Card {
  interface IState extends State {
    data: Weather.RootObject;
    pending: boolean = false;
  }
}

namespace Component {
  type Binding = {
    [key: string]: {
      onChange: () => void;
    };
  };

  interface IConfiguration {
    bindings: Binding;
  }
}

namespace Autocomplete {
  interface IState extends State {
    placeholder: string;
    value: string;
    items: string[];
    autocompleteItems: string[];
    timeout: {
      delay: number;
      value?: ReturnType<typeof setTimeout>;
    };
    open: boolean = false;
    callback: (value: string) => void;
  }

  interface IProps {
    timeoutValue: number;
    callback(value: string): void;
    placeholder?: string;
  }
}

namespace Alert {
  interface IState extends State {
    message: string;
    type: "default" | "success" | "info" | "warning" | "danger";
  }
  interface IProps {
    message: string;
    type: "default" | "success" | "info" | "warning" | "danger";
  }
}

namespace Tile {
  interface IState extends State {
    pending: boolean;
    updatedAt: Date;
    place: string;
    icon: string;
    description: string;
    temp: {
      current: number;
      min: number;
      max: number;
    };
    humidity: number;
    pressure: number;
    wind: {
      deg: number;
      speed: number;
    };
  }

  interface IProps {
    data: Weather.RootObject;
  }
}

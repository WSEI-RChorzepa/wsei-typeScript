import { DateTime } from "app/types";
import { Weather } from "@services/types";

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
    title: string;
    message: string;
    type: "default" | "success" | "info" | "warning" | "danger";
    duration: number;
  }
  interface IProps {
    title: string;
    message: string;
    type: "default" | "success" | "info" | "warning" | "danger";
    duration?: number;
  }
}

namespace Tile {
  interface IState extends State {
    pending: boolean;
    updatedAt: DateTime;
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
    coord: {
      lat: number;
      lon: number;
    };
    refresh: {
      delay: number;
      auto: boolean;
      timeout: ReturnType<typeof setTimeout> | null;
    };
  }

  interface IProps {
    data?: Weather.RootObject;
    onRefresh(place: string): Promise<Weather.RootObject>;
  }
}

namespace WeatherDaily {
  interface IState extends State {
    date: DateTime;
    sunrise: DateTime;
    sunset: DateTime;
    moonrise: DateTime;
    moonset: DateTime;
    temp: {
      min: number;
      max: number;
    };
    pressure: number;
    humidity: number;
    wind: {
      deg: number;
      speed: number;
    };
    icon: string;
    description: string;
    timezone_offset: number;
  }
}

namespace WeatherHourly {
  interface IState extends State {
    date: DateTime;
    temp: number;
    pressure: number;
    humidity: number;
    wind: {
      deg: number;
      speed: number;
    };
    icon: string;
    description: string;
    timezone_offset: number;
  }
}

namespace Forecast {
  interface IState extends State {
    place: string;
    timezone: string;
    timezone_offset: number;
    hourly: Hourly[];
    daily: Daily[];
    view: "hourly" | "daily";
  }
}

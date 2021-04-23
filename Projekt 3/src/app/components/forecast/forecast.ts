import template from "./templateForecast.html";
import { Forecast } from "@services/types";
import { Component, Forecast as ForecastState } from "@components/types";
import { ComponentWithState } from "@components";
import { HourlyComponent } from "./hourly";

export class ForecastComponent extends ComponentWithState<ForecastState.IState> {
  constructor() {
    super(template);
  }

  private initialState: ForecastState.IState = {
    timezone: "",
    timezone_offset: 0,
    hourly: [],
    daily: [],
  };

  protected state: ForecastState.IState = new Proxy<ForecastState.IState>(this.initialState, {
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
      hourly: {
        onChange: () => {
          this.hourlyContainer.innerHTML = "";

          const df = document.createDocumentFragment();

          for (let item of this.state.hourly) {
            df.appendChild(new HourlyComponent(item, this.state.timezone_offset));
          }

          this.hourlyContainer.appendChild(df);
        },
      },
      daily: {
        onChange: () => {
          //   console.log(this.state.daily);
        },
      },
    },
  };

  private get hourlyContainer(): HTMLDivElement {
    return this.root.querySelector("#hourly") as HTMLDivElement;
  }

  set setState(newState: Forecast.RootObject) {
    const { timezone_offset, timezone, daily, hourly } = newState;
    this.state.timezone_offset = timezone_offset;
    this.state.timezone = timezone;
    this.state.hourly = hourly;
    this.state.daily = daily;
  }
}

import template from "./templateForecast.html";
import { Forecast } from "@services/types";
import { Component, Forecast as ForecastState } from "@components/types";
import { ComponentWithState } from "@components";
import { HourlyComponent } from "./hourly";
import { getDate } from "@utils/dateHelpers";
import { DailyComponent } from "./daily";

export class ForecastComponent extends ComponentWithState<ForecastState.IState> {
  constructor() {
    super(template);
  }

  protected state: ForecastState.IState = this.createState<ForecastState.IState>({
    place: "",
    timezone: "",
    timezone_offset: 0,
    hourly: [],
    daily: [],
    view: "hourly",
  });

  protected configuration: Component.IConfiguration = {
    bindings: {
      place: {
        onChange: () => {
          this.updateElement("place");
        },
      },
      view: {
        onChange: () => {
          const label = this.state.view === "daily" ? "hourly" : "daily";
          this.switchButton.innerHTML = `Switch to ${this.state.view} view`;
          this.updateElement("view", `Actualt view: ${label}`);

          this.dailyContainer.style.display = this.state.view === "hourly" ? "block" : "none";
          this.hourlyContainer.style.display = this.state.view === "daily" ? "block" : "none";
        },
      },
      hourly: {
        onChange: () => {
          const df = document.createDocumentFragment();
          this.hourlyContainer.innerHTML = "";

          let group = this.groupByDate();

          for (let key in group) {
            const wrapper = document.createElement("div");
            const day = document.createElement("div");
            const container = document.createElement("div");

            wrapper.classList.add("wrapper");
            day.classList.add("day");
            container.classList.add("container");

            day.innerText = new Date().toLocaleDateString("pl") === key ? "Current weather" : `Weather forecast for ${key}`;

            for (let item of group[key] as Forecast.Hourly[]) {
              container.appendChild(new HourlyComponent(item, this.state.timezone_offset));
            }

            wrapper.appendChild(day);
            wrapper.appendChild(container);
            df.appendChild(wrapper);

            if (this.switchButton.style.display === "none") {
              this.switchButton.style.display = "block";
            }
          }

          this.hourlyContainer.appendChild(df);
          this.state.view = "hourly";
        },
      },
      daily: {
        onChange: () => {
          const df = document.createDocumentFragment();
          this.dailyContainer.innerHTML = "";

          const wrapper = document.createElement("div");
          const container = document.createElement("div");

          wrapper.classList.add("wrapper");
          container.classList.add("container");

          for (let item of this.state.daily as Forecast.Daily[]) {
            container.appendChild(new DailyComponent(item, this.state.timezone_offset));
          }

          wrapper.appendChild(container);
          df.appendChild(wrapper);

          if (this.switchButton.style.display === "none") {
            this.switchButton.style.display = "block";
          }

          this.dailyContainer.appendChild(df);
          this.state.view = "daily";
        },
      },
    },
  };

  private get hourlyContainer(): HTMLDivElement {
    return this.root.querySelector("#hourly") as HTMLDivElement;
  }

  private get dailyContainer(): HTMLDivElement {
    return this.root.querySelector("#daily") as HTMLDivElement;
  }

  private get switchButton(): HTMLButtonElement {
    return this.root.querySelector("button") as HTMLButtonElement;
  }

  set setPlace(place: string) {
    this.state.place = place;
  }

  set setState(newState: Forecast.RootObject) {
    const { timezone_offset, timezone, daily, hourly } = newState;
    this.state.timezone_offset = timezone_offset;
    this.state.timezone = timezone;
    this.state.hourly = hourly;
    this.state.daily = daily;
  }

  private groupByDate = () => {
    return this.state.hourly
      .map((a) => {
        const item = a as Forecast.Hourly;
        return {
          dateShort: getDate(item.dt, this.state.timezone_offset).toLocaleDateString("pl"),
          time: getDate(item.dt, this.state.timezone_offset).toLocaleTimeString("pl"),
          ...item,
        };
      })
      .reduce((accumulator: any, current: any) => {
        accumulator[current.dateShort] = [...(accumulator[current.dateShort] || []), current];
        return accumulator;
      }, {});
  };

  private handleSwitchView = () => {
    this.state.view = this.state.view === "hourly" ? "daily" : "hourly";
  };

  connectedCallback() {
    this.switchButton.addEventListener("click", this.handleSwitchView);
  }

  disconnectedCallback() {
    this.switchButton.removeEventListener("click", this.handleSwitchView);
  }
}

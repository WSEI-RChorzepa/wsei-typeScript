import template from './template.handlebars';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Dicember',
];

class CalendarComponent extends HTMLElement {
  currentDate: Date;
  today: Date;

  onEmit?: (ev: Event) => void;
  onNext?: Observable<Date>;
  onPrev?: Observable<Date>;

  constructor() {
    super();
    this.currentDate = new Date();
    this.today = new Date();
  }

  private root: ShadowRoot = this.attachShadow({ mode: 'closed' });

  private subscribeOnEvents = (): void => {
    this.onNext?.subscribe(value => {
      this.currentDate = value;
      this.updates.month();
      this.updates.year();
      this.renderGrid();
    });

    this.onPrev?.subscribe(value => {
      this.currentDate = value;
      this.updates.month();
      this.updates.year();
      this.renderGrid();
    });
  };

  private elements = {
    year: () => this.root.querySelector('#year') as HTMLDivElement,
    month: () => this.root.querySelector('#month') as HTMLDivElement,
    date: () => this.root.querySelector('#date') as HTMLDivElement,
    next: () => this.root.querySelector('#next') as HTMLDivElement,
    prev: () => this.root.querySelector('#previous') as HTMLDivElement,
    grid: () => this.root.querySelector('#grid-wrapper') as HTMLDivElement,
    days: () => this.root.querySelectorAll('#grid-wrapper .grid button') as NodeListOf<HTMLButtonElement>,
  };

  private updates = {
    year: () => (this.elements.year().innerHTML = this.currentDate.getFullYear().toString()),
    month: () => (this.elements.month().innerHTML = months[this.currentDate.getMonth()]),
  };

  private cleanUp = (emitCallback: (e: Event) => void) => {
    Array.from(this.elements.days()).forEach(button => button.removeEventListener('click', emitCallback));
    this.elements.grid().innerHTML = '';
  };

  public setActive = (element: HTMLButtonElement) => {
    Array.from(this.elements.grid().querySelectorAll('button')).forEach(button => button.classList.remove('active'));
    element.classList.add('active');
  };

  private renderGrid = (): void => {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const createButton = (date: Date, day: number, onClick: (ev: Event) => void) => {
      const btn = document.createElement('button') as HTMLButtonElement;
      btn.value = date.getTime().toString();
      btn.innerHTML = day.toString();
      btn.addEventListener('click', onClick);

      if (date.getDay() === 0) btn.classList.add('sun');
      if (date.getDay() === 6) btn.classList.add('sat');
      if (this.today.toDateString() === date.toDateString()) btn.classList.add('current');

      return btn;
    };

    const createNewDate = (index: number): Date => {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), index);
    };

    let counter = 1;
    const grid = document.createElement('div') as HTMLDivElement;
    grid.classList.add('grid');

    for (let index = 0; index < 42; index++) {
      const el = document.createElement('div');
      grid.appendChild(el);
    }

    const appendFrom = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    for (let index = appendFrom; index < lastDayOfMonth.getDate() + appendFrom; index++) {
      const newButton = createButton(createNewDate(counter), counter, this.onEmit ? this.onEmit : () => {});
      Array.from(grid.querySelectorAll('div'))[index].appendChild(newButton);

      counter++;
    }

    this.cleanUp(this.onEmit ? this.onEmit : () => {});
    this.elements.grid().appendChild(grid);
  };

  execute() {
    this.render();
    this.renderGrid();

    this.onNext = fromEvent(this.elements.next(), 'click').pipe(
      map(() => this.currentDate),
      map(date => new Date(date.getFullYear(), date.getMonth() + 1, 1)),
      map(int => new Date(int)),
    );

    this.onPrev = fromEvent(this.elements.prev(), 'click').pipe(
      map(() => this.currentDate),
      map(date => new Date(date.getFullYear(), date.getMonth() - 1, 1)),
      map(int => new Date(int)),
    );

    this.subscribeOnEvents();
  }

  private render(): void {
    this.root.innerHTML = template({
      year: this.currentDate.getFullYear(),
      month: months[this.currentDate.getMonth()],
      today: this.today.toLocaleDateString(),
    });
  }
}

export default CalendarComponent;

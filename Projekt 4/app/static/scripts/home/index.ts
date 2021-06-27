import '../../scss/views/home.scss';
import { Subject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import validationSchema from '../../../validator/availability.form.validator';
import { CalendarComponent, TimePicker } from '../webComponents';

window.customElements.define('calendar-component', CalendarComponent);
window.customElements.define('time-picker', TimePicker, { extends: 'select' });

interface FormData {
  date: string;
  from: number;
  to: number;
}

const elements = {
  form: document.querySelector('form'),
  date: document.querySelector('form [name="date"]'),
  from: document.querySelector('form [name="from"]'),
  to: document.querySelector('form [name="to"]') as HTMLSelectElement,
  submit: document.querySelector('form [type="submit"]'),
  fromComponent: document.querySelector('form [name="from"]') as TimePicker,
  toComponent: document.querySelector('form [name="to"]') as TimePicker,
};

const calendarSubject = new Subject();
const fromSubject = new Subject();
const toSubject = new Subject();

const next = (ev: Event) => calendarSubject.next(ev);

const calendar = document.getElementById('calendar-component') as CalendarComponent;
calendar.onEmit = next;
calendar.execute();

calendarSubject.pipe(map(a => (a as MouseEvent).target)).subscribe(a => calendar.setActive(a as HTMLButtonElement));
calendarSubject
  .pipe(
    map(a => (a as MouseEvent).target),
    map(a => (a as HTMLButtonElement).value),
    map(a => new Date(+a)),
  )
  .subscribe(a => ((elements.date as HTMLInputElement).value = (a as Date).toLocaleDateString('pl')));

const fromObservable = fromEvent(document.querySelector('[name="from"]') as HTMLSelectElement, 'change').pipe(
  map(el => el.currentTarget as HTMLSelectElement),
  map(el => el.value),
);

const toObservable = fromEvent(document.querySelector('[name="to"]') as HTMLSelectElement, 'change').pipe(
  map(el => el.currentTarget as HTMLSelectElement),
  map(el => el.value),
);

fromObservable.subscribe(value => {
  elements.toComponent.refresh(+value);
  (elements.to.querySelectorAll('option:not([disabled])')[0] as HTMLOptionElement).selected = true;
});

toObservable.subscribe(value => {
  elements.fromComponent.refresh(+value);
});

elements.submit;

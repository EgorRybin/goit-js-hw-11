import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');
button.disabled = true;
input.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Qui timide rogat docet negare');
      button.disabled = true;
    } else {
      button.disabled = false;
    }

    button.addEventListener('click', onButtonClick);

    function onButtonClick() {
      button.disabled = true;
      input.disabled = true;
      const intervalId = setInterval(() => {
        const dateSelected = selectedDates[0].getTime();
        const delta = convertMs(dateSelected - Date.now());

        if (dateSelected - Date.now() < 0) {
          clearInterval(intervalId);
          4;
          return;
        }

        days.textContent = addLeadingZero(delta.days);
        hours.textContent = addLeadingZero(delta.hours);
        minutes.textContent = addLeadingZero(delta.minutes);
        seconds.textContent = addLeadingZero(delta.seconds);
      }, 1000);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

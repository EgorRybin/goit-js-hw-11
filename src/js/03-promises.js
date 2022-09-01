import Notiflix from 'notiflix';

const form = document.querySelector('form');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');
const button = document.querySelector('button');
let delay = 1000;
let step = 1000;
let amount = 5;

form.addEventListener('submit', onButtonClick);
function onButtonClick(evt) {
  evt.preventDefault();
  delay = Number(firstDelay.value);
  step = Number(delayStep.value);
  amount = amountRef.value;

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
    return promise;
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

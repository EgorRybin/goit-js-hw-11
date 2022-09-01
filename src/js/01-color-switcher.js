const startBtn = document.querySelector('button');
const stopBtn = startBtn.nextElementSibling;
const body = document.querySelector('body');
let colorInterval = null;
startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
 startBtn.disabled = true;
  stopBtn.disabled = false;
  colorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtn.addEventListener('click', onStopColorise);

function onStopColorise() {
 startBtn.disabled = false;
 stopBtn.disabled = true;
  clearInterval(colorInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

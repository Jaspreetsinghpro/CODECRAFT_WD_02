const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];

const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centisecond = document.querySelector(".msec");
const laps= document.getElementsByClassName("laps")[0];
const bg= document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let intervalId;
let msecCounter = 0;
let secCounter = 0;
let minCounter = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (isPlay) {
        playButton.innerHTML = "Play";
        bg.classList.remove("animation-bg");
        clearInterval(intervalId);
        isPlay = false;
    } 
    else {
        playButton.innerHTML = "Pause";
        isPlay = true;

        intervalId = setInterval(() => {
            msecCounter += 1;

            if (msecCounter === 100) 
             { 
                msecCounter = 0;
                secCounter++;
             }

            if (secCounter === 60) 
            {
                secCounter = 0;
                minCounter++;
            }

            centisecond.innerHTML = msecCounter.toString().padStart(2, '0');
            second.innerHTML = secCounter.toString().padStart(2, '0') + ' :';
            minute.innerHTML = minCounter.toString().padStart(2, '0') + ' :';
        }, 10); 
        bg.classList.add("animation-bg");
    }
    toggleButton();
}

const reset = () => {
    clearInterval(intervalId);
    isPlay = false;
    msecCounter = 0;
    secCounter = 0;
    minCounter = 0;
    lapCount = 1;

    centisecond.innerHTML = '00';
    second.innerHTML = '00 :';
    minute.innerHTML = '00 :';

    const lapItems = laps.querySelectorAll(".lap-item");
    lapItems.forEach(item => item.remove());

    playButton.innerHTML = "Play";
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
};

 
let lapCount = 1;

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `#${lapCount++}`;
    timeStamp.innerHTML = `${minCounter.toString().padStart(2, '0')} : ${secCounter.toString().padStart(2, '0')} : ${msecCounter.toString().padStart(2, '0')}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);

    clearButton.classList.add("hidden");
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click", clearAll);
"use strict";
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const grid = document.querySelector('.sequence');
let currentLetter = 0;
let sequence = '';
function appendLetter(i) {
    const letter = document.createElement('div');
    const nextSeq = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    letter.textContent = nextSeq;
    letter.classList.add('bg-white', 'h-20', 'w-16', 'flex', 'items-center', 'justify-center', 'text-5xl', 'font-bold', 'rounded-lg', 'shadow-md', `seq-${i}`);
    sequence += nextSeq;
    grid === null || grid === void 0 ? void 0 : grid.appendChild(letter);
}
function refreshSequence() {
    if (grid == null)
        return;
    currentLetter = 0;
    sequence = '';
    grid.innerHTML = '';
    for (let i = 0; i < 12; i++)
        appendLetter(i);
}
function highlightCurrentLetter() {
    const curr = document.querySelector(`.seq-${currentLetter}`);
    if (!curr)
        return;
    for (let i = 0; i < sequence.length; i++) {
        const temp = document.querySelector(`.seq-${i}`);
        if (!temp)
            continue;
        if (i < currentLetter)
            temp.style.backgroundColor = 'black';
        else
            temp.style.backgroundColor = 'white';
    }
    curr.style.backgroundColor = 'green';
}
function clearTimer() {
    const bar = document.querySelector('.timer-progress-bar');
    if (bar)
        bar.style.width = `0%`;
}
function startTimer() {
    let timer = 0;
    let time = setInterval(() => {
        timer++;
        const bar = document.querySelector('.timer-progress-bar');
        if (bar)
            bar.style.width = `${timer * 10}%`;
        if (timer === 10) {
            refreshSequence();
            if (bar)
                bar.style.width = `0%`;
            clearInterval(time);
        }
    }, 1000);
}
refreshSequence();
highlightCurrentLetter();
startTimer();
document.body.addEventListener('keydown', (key) => {
    const keyPressed = key.key.toUpperCase();
    if (keyPressed === sequence[currentLetter])
        currentLetter++;
    else {
        clearTimer();
        refreshSequence();
    }
    if (currentLetter === sequence.length) {
        refreshSequence();
        clearTimer();
    }
    highlightCurrentLetter();
});

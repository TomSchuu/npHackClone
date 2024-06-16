"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = __importDefault(require("./timer"));
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const grid = document.querySelector('.sequence');
const modal = document.querySelector('.modal');
const timer = new timer_1.default();
let currentLetter = 0;
let sequence = '';
function appendLetter(i) {
    if (grid == null)
        return;
    const letter = document.createElement('div');
    const nextSeq = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    letter.textContent = nextSeq;
    letter.classList.add('bg-white', 'h-20', 'w-16', 'flex', 'items-center', 'justify-center', 'text-5xl', 'font-bold', 'rounded-lg', 'shadow-md', `seq-${i}`);
    sequence += nextSeq;
    grid.appendChild(letter);
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
function gameOver(win) {
    timer.stopTimer();
    if (!modal)
        return;
    if (win) {
        document.querySelector('.modal-title').textContent = 'Success!';
        modal.style.backgroundColor = 'green';
    }
    else {
        document.querySelector('.modal-title').textContent = 'Game Over!';
        modal.style.backgroundColor = 'red';
    }
    modal.style.display = 'block';
    modal.focus();
}
exports.default = gameOver;
document.body.addEventListener('keydown', (key) => {
    const keyPressed = key.key.toUpperCase();
    if (!LETTERS.includes(keyPressed) || modal.style.display === 'block') {
        return;
    }
    if (keyPressed === sequence[currentLetter]) {
        currentLetter++;
    }
    else {
        gameOver(false);
    }
    if (currentLetter === sequence.length) {
        gameOver(true);
    }
    highlightCurrentLetter();
});
modal.addEventListener('keydown', (key) => {
    if (key.key === 'Enter') {
        modal.style.display = 'none';
        refreshSequence();
        timer.startTimer();
    }
});
function main() {
    refreshSequence();
    highlightCurrentLetter();
    timer.startTimer();
}
main();

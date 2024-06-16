(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    if (!LETTERS.includes(keyPressed)) {
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

},{"./timer":2}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = __importDefault(require("./script"));
class Timer {
    constructor() {
        this.time = 10;
    }
    startTimer() {
        this.time = 10 * 10;
        this.interval = setInterval(() => {
            if (this.time <= 0) {
                clearInterval(this.interval);
                (0, script_1.default)(false);
            }
            document.querySelector('.timer-progress-bar').style.width = this.time + '%';
            this.time--;
        }, 40);
    }
    stopTimer() {
        clearInterval(this.interval);
    }
}
exports.default = Timer;

},{"./script":1}]},{},[1,2]);

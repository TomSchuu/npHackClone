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

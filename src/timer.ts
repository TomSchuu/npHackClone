import gameOver from './script';

export default class Timer {
  private time: number = 10;
  private interval: any;

  constructor() {}

  startTimer() {
    this.time = 10 * 10;

    this.interval = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.interval);
        gameOver(false);
      }

      document.querySelector<HTMLDivElement>('.timer-progress-bar')!.style.width = this.time + '%';
      this.time--;
    }, 40);
  }

  stopTimer() {
    clearInterval(this.interval);
  }
}

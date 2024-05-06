export default class Timer {
  private time: number;

  constructor() {
    this.time = 0;
  }

  get currentTime(): number {
    return this.time;
  }
}

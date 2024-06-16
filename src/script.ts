import Timer from './timer';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const grid = document.querySelector<HTMLDivElement>('.sequence');
const modal = document.querySelector<HTMLDivElement>('.modal');

const timer: Timer = new Timer();

let currentLetter: number = 0;
let sequence: string = '';

function appendLetter(i: number): void {
  if (grid == null) return;

  const letter = document.createElement('div');
  const nextSeq = LETTERS[Math.floor(Math.random() * LETTERS.length)];
  letter.textContent = nextSeq;
  letter.classList.add(
    'bg-white',
    'h-20',
    'w-16',
    'flex',
    'items-center',
    'justify-center',
    'text-5xl',
    'font-bold',
    'rounded-lg',
    'shadow-md',
    `seq-${i}`,
  );

  sequence += nextSeq;
  grid.appendChild(letter);
}

function refreshSequence(): void {
  if (grid == null) return;

  currentLetter = 0;
  sequence = '';

  grid.innerHTML = '';
  for (let i = 0; i < 12; i++) appendLetter(i);
}

function highlightCurrentLetter(): void {
  const curr = document.querySelector<HTMLDivElement>(`.seq-${currentLetter}`);

  if (!curr) return;

  for (let i = 0; i < sequence.length; i++) {
    const temp = document.querySelector<HTMLDivElement>(`.seq-${i}`);

    if (!temp) continue;

    if (i < currentLetter) temp.style.backgroundColor = 'black';
    else temp.style.backgroundColor = 'white';
  }

  curr.style.backgroundColor = 'green';
}

export default function gameOver(win: boolean): void {
  timer.stopTimer();

  if (!modal) return;

  if (win) {
    document.querySelector<HTMLHeadingElement>('.modal-title')!.textContent = 'Success!';
    modal.style.backgroundColor = 'green';
  } else {
    document.querySelector<HTMLHeadingElement>('.modal-title')!.textContent = 'Game Over!';
    modal.style.backgroundColor = 'red';
  }

  modal.style.display = 'block';
  modal.focus();
}

document.body.addEventListener('keydown', (key: KeyboardEvent) => {
  const keyPressed: string = key.key.toUpperCase();

  if (!LETTERS.includes(keyPressed)) {
    return;
  }

  if (keyPressed === sequence[currentLetter]) {
    currentLetter++;
  } else {
    gameOver(false);
  }

  if (currentLetter === sequence.length) {
    gameOver(true);
  }

  highlightCurrentLetter();
});

modal!.addEventListener('keydown', (key: KeyboardEvent) => {
  if (key.key === 'Enter') {
    modal!.style.display = 'none';
    refreshSequence();
    timer.startTimer();
  }
});

function main(): void {
  refreshSequence();
  highlightCurrentLetter();
  timer.startTimer();
}

main();

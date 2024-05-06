// import Timer from './timer';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const grid = document.querySelector<HTMLDivElement>('.sequence');

let currentLetter: number = 0;
let sequence: string = '';

function appendLetter(i: number) {
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

function refreshSequence() {
  if (grid == null) return;

  currentLetter = 0;
  sequence = '';

  grid.innerHTML = '';
  for (let i = 0; i < 12; i++) appendLetter(i);
}

function highlightCurrentLetter() {
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

document.body.addEventListener('keydown', (key: KeyboardEvent) => {
  const keyPressed: string = key.key.toUpperCase();

  if (keyPressed === sequence[currentLetter]) currentLetter++;
  else {
    refreshSequence();
  }

  if (currentLetter === sequence.length) {
    refreshSequence();
  }

  highlightCurrentLetter();
});

refreshSequence();
highlightCurrentLetter();
// const timer = new Timer();
// console.log(timer.currentTime);

import { fromEvent } from 'rxjs';
import { TweenLite } from 'gsap';

console.log('Welcome to Ninja Blocks');
let grid: HTMLElement;
let player: HTMLElement;
let inMove: boolean = false;
let tick = 0;

document.addEventListener('DOMContentLoaded', () => {
  grid = document.getElementById('squaresGrid');
  player = document.getElementById('player');

  const playerPos = player.getBoundingClientRect();

  grid.style.transform = `translate(${playerPos.left}px, ${playerPos.top}px)`;
});

function onCompleteMove() {
  inMove = false;
}

function reverseMotion(motion: { x?: string, y?: string }) {
  const reversedMotion = Object.assign({}, motion);
  if (motion.x) {
    if (motion.x.startsWith('-')) {
      reversedMotion.x = motion.x.replace('-', '+');
    } else {
      reversedMotion.x = motion.x.replace('+', '-');
    }
  }

  if (motion.y) {
    if (motion.y.startsWith('-')) {
      reversedMotion.y = motion.y.replace('-', '+');
    } else {
      reversedMotion.y = motion.y.replace('+', '-');
    }
  }

  return reversedMotion;
}

function moveElementTo(elem: HTMLElement, motion: { x?: any, y?: any }) {
  let worldTweenVars = Object.assign({}, reverseMotion(motion),
    {
      duration: 0.3,
      ease: 'power0.none',
    } as GSAPStatic.tweenVars
  );

  let elemTweenVars = Object.assign({}, motion,
    {
      duration: 0.3,
      ease: 'power0.none',
    } as GSAPStatic.tweenVars,
    {
    data: {
      elem
    },
    onUpdate: (tween: GSAPStatic.Tween) => {
      tick++;
      if (tick % (6 * (1 / tween.timeScale())) === 0) {
        let target = (tween.data as any).elem as HTMLElement;

        let dup: HTMLElement = target.cloneNode() as HTMLElement;
        target.parentElement.appendChild(dup);
        dup.style.opacity = '0.8';

        TweenLite.to(dup, {  opacity: 0, scale: 0.5, duration: 1.5, data: { dup }, onComplete: (tween) => {
          (tween.data.dup as HTMLElement).remove();
        }});
      }
    },
    onComplete: onCompleteMove
  });

  const moveToTween = TweenLite.to(elem, elemTweenVars);
  const worldMoveToTween = TweenLite.to(grid, worldTweenVars);

  // moveToTween.timeScale(0.1);
  inMove = true;
}

fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
  if (!inMove) {
    switch (e.key) {
      case 'w':
        moveElementTo(player, { y: '-=50px' });
        break;
      case 'a':
        moveElementTo(player, { x: '-=50px' });
        break;
      case 's':
        moveElementTo(player, { y: '+=50px' });
        break;
      case 'd':
        moveElementTo(player, { x: '+=50px' });
        break;
    }
  }
});

import { fromEvent, merge, interval } from 'rxjs';
import { TweenLite } from 'gsap';
import {
  groupBy,
  mergeAll,
  distinctUntilChanged,
  map,
  filter,
  takeUntil,
  tap,
  take,
  takeWhile
} from 'rxjs/operators';

console.log('Welcome to Ninja Blocks');
let grid: HTMLElement;
let player: HTMLElement;
let inMove: boolean = false;
let tick = 0;

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  grid = document.getElementById('squaresGrid');
  player = document.getElementById('player');

  const playerPos = player.getBoundingClientRect();

  // grid.style.transform = `translate(${playerPos.left}px, ${playerPos.top}px)`;
});

function onCompleteMove() {
  inMove = false;
}

function reverseMotion(motion: { x?: string; y?: string }) {
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

function moveElementTo(
  elem: HTMLElement,
  motion: { x?: any; y?: any },
  effect: boolean = false
) {
  let worldTweenVars = Object.assign({}, reverseMotion(motion), {
    duration: 0.3,
    ease: 'power0.none'
  } as GSAPStatic.tweenVars);

  let elemTweenVars = Object.assign(
    {},
    motion,
    {
      duration: 0.3,
      ease: 'power0.none'
    } as GSAPStatic.tweenVars,
    {
      data: {
        elem
      },
      onComplete: onCompleteMove
    }
  );

  if (effect) {
    elemTweenVars.onUpdate = (tween: GSAPStatic.Tween) => {
      tick++;
      if (tick % (6 * (1 / tween.timeScale())) === 0) {
        let target = (tween.data as any).elem as HTMLElement;

        let dup: HTMLElement = target.cloneNode() as HTMLElement;
        target.parentElement.appendChild(dup);
        dup.style.opacity = '0.8';

        TweenLite.to(dup, {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          data: { dup },
          onComplete: tween => {
            (tween.data.dup as HTMLElement).remove();
          }
        });
      }
    };
  }

  const moveToTween = TweenLite.to(elem, elemTweenVars);
  const worldMoveToTween = TweenLite.to(grid, worldTweenVars);

  if (effect) {
    moveToTween.timeScale(2);
  }

  // moveToTween.timeScale(0.1);
  inMove = true;
}

merge(fromEvent(document, 'keydown'), fromEvent(document, 'keyup'))
  .pipe(
    groupBy((e: KeyboardEvent) => {
      return e.keyCode;
    }),
    map(group => {
      return group.pipe(
        distinctUntilChanged((x, y) => {
          return x.type === y.type;
        })
      );
    }),
    mergeAll()
  )
  .subscribe((e: KeyboardEvent) => {
    console.log(e);
    if (e.type !== 'keydown') {
      return;
    }

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
        case 'W':
          moveElementTo(player, { y: '-=100px' }, true);
          break;
        case 'A':
          moveElementTo(player, { x: '-=100px' }, true);
          break;
        case 'S':
          moveElementTo(player, { y: '+=100px' }, true);
          break;
        case 'D':
          moveElementTo(player, { x: '+=100px' }, true);
          break;
      }
    }
  });

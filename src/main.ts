import { TweenLite } from 'gsap';
import { fromEvent } from 'rxjs';
import {} from 'rxjs/operators';

interface MotionVector {
  x?: string;
  y?: string;
}

let player = document.getElementById('player');
let levelContainer = document.getElementById('levelContainer');
let playerIsMoving = false;
let tick = 0;
focusOnPlayer();

console.log('Welcome to Ninja Blocks');

fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
  if (!playerIsMoving) {
    switch (e.key) {
      case 'w':
        moveTo(player, { y: '-=5rem' });
        moveTo(levelContainer, { y: '+=5rem' });
        playerIsMoving = true;
        break;
      case 'W':
        moveTo(player, { y: '-=10rem' }, true);
        moveTo(levelContainer, { y: '+=10rem' });
        playerIsMoving = true;
        break;
      case 's':
        moveTo(player, { y: '+=5rem' });
        moveTo(levelContainer, { y: '-=5rem' });
        playerIsMoving = true;
        break;
      case 'S':
        moveTo(player, { y: '+=10rem' }, true);
        moveTo(levelContainer, { y: '-=10rem' });
        playerIsMoving = true;
        break;
      case 'a':
        moveTo(player, { x: '-=5rem' });
        moveTo(levelContainer, { x: '+=5rem' });
        playerIsMoving = true;
        break;
      case 'A':
        moveTo(player, { x: '-=10rem' }, true);
        moveTo(levelContainer, { x: '+=10rem' });
        playerIsMoving = true;
        break;
      case 'd':
        moveTo(player, { x: '+=5rem' });
        moveTo(levelContainer, { x: '-=5rem' });
        playerIsMoving = true;
        break;
      case 'D':
        moveTo(player, { x: '+=10rem' }, true);
        moveTo(levelContainer, { x: '-=10rem' });
        playerIsMoving = true;
        break;
    }
  }
});

function moveTo(
  target: HTMLElement,
  motionVector: MotionVector,
  evadeEffect: boolean = false
) {
  let moveTweenVars: GSAPStatic.tweenVars = {
    ease: 'none',
    duration: 0.3,
    ...motionVector,
    onComplete: () => {
      playerIsMoving = false;
    }
  };

  if (evadeEffect) {
    moveTweenVars.onUpdateParams = [target];
    moveTweenVars.onUpdate = (target: HTMLElement) => {
      tick++;
      if (tick % 6 === 3) {
        let clone = target.cloneNode() as HTMLElement;
        target.parentElement.appendChild(clone);
        clone.style.opacity = '0.8';
        TweenLite.to(clone, {
          duration: 0.5,
          opacity: 0,
          scaleX: 0.5,
          onCompleteParams: [clone],
          onComplete: (clone: HTMLElement) => {
            clone.remove();
            tick = 0;
          }
        });
      }
    };
  }

  TweenLite.to(target, moveTweenVars);
}

function focusOnPlayer() {
  let playerPos = player.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let translateX = `${windowWidth / 2 - playerPos.left}px`;
  let translateY = `${windowHeight / 2 - playerPos.top}px`;

  moveTo(levelContainer, {
    x: translateX,
    y: translateY
  });
}

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
      case 's':
        moveTo(player, { y: '+=5rem' });
        moveTo(levelContainer, { y: '-=5rem' });
        playerIsMoving = true;
        break;
      case 'a':
        moveTo(player, { x: '-=5rem' });
        moveTo(levelContainer, { x: '+=5rem' });
        playerIsMoving = true;
        break;
      case 'd':
        moveTo(player, { x: '+=5rem' });
        moveTo(levelContainer, { x: '-=5rem' });
        playerIsMoving = true;
        break;
    }
  }
});

function moveTo(target: HTMLElement, motionVector: MotionVector) {
  let moveTweenVars: GSAPStatic.tweenVars = {
    ease: 'power0.none',
    duration: 0.3,
    ...motionVector,
    onComplete: () => {
      playerIsMoving = false;
    }
  };

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

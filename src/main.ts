import { TweenLite } from 'gsap';
import { fromEvent } from 'rxjs';
import {} from 'rxjs/operators';

let player = document.getElementById('player');

console.log('Welcome to Ninja Blocks');

fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
  switch (e.key) {
    case 'w':
      TweenLite.to(player, {
        ease: 'power0.none',
        y: '-=5rem'
      });
      break;
    case 's':
      TweenLite.to(player, {
        ease: 'power0.none',
        y: '+=5rem'
      });
      break;
    case 'a':
      TweenLite.to(player, {
        ease: 'power0.none',
        x: '-=5rem'
      });
      break;
    case 'd':
      TweenLite.to(player, {
        ease: 'power0.none',
        x: '+=5rem'
      });
      break;
  }
});

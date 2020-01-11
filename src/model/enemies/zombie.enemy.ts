import { TweenLite } from 'gsap';
import { Enemy } from './enemy';
import { MotionConfig, PositionVector } from '../motion';
import { Observable, Subject } from 'rxjs';
import { MotionService } from '../../services/motion.service';

export class Zombie extends Enemy {
  constructor(element: HTMLElement, position: PositionVector) {
    const zombieMotionConfig: MotionConfig = {
      duration: 1,
      ease: 'none',
      stepSize: 5
    };

    super(element, zombieMotionConfig, 50, position, 2);
  }

  heal(health: number): void {
    // Do Nothing
  }

  hit(damage: number): void {
    this.hp -= damage;
  }

  killAnimation(): Observable<null> {
    let killAnimationEnded$ = new Subject<null>();
    TweenLite.to(this.element, {
      duration: 1,
      scale: 0,
      onComplete: () => {
        killAnimationEnded$.next();
      }
    });
    return killAnimationEnded$;
  }

  revive(): void {
    // Play the revie animation
  }

  nextMove(): PositionVector {
    return this.moveTo(Math.floor(Math.random() * 4), 1);
  }
}

import { Enemy } from './enemy';
import { Observable, Subject } from 'rxjs';
import { PositionVector, MotionConfig } from '../motion';
import { TweenLite } from 'gsap';

export const zombieMotionConfig: MotionConfig = {
  duration: 0.6,
  ease: 'none',
  stepSize: 5
};

export class Zombie extends Enemy {
  constructor(element: HTMLElement, position: PositionVector) {
    super(element, zombieMotionConfig, 50, position, 1000);
  }

  hit(damage: number): void {
    this.hp -= damage;
  }

  heal(health: number): void {
    // Nothing
  }

  revive() {
    // Nothing
  }

  playKillAnimation(): Observable<null> {
    const killAnimationEnded$ = new Subject<null>();
    TweenLite.to(this.element, {
      duration: this.motionConfig.duration,
      scale: 0,
      onComplete: () => {
        killAnimationEnded$.next(null);
      }
    });

    return killAnimationEnded$;
  }

  nextMove(): PositionVector {
    return this.moveTo(Math.floor(Math.random() * 4), 1);
  }
}

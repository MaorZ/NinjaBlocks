import { Actor } from '../actor';
import { MotionConfig, PositionVector } from '../motion';
import { interval, Subscription, Observable } from 'rxjs';

export abstract class Enemy extends Actor {
  private stepIntervalSubscription: Subscription;

  constructor(
    elemnt: HTMLElement,
    motionConfig: MotionConfig,
    hp: number,
    position: PositionVector,
    stepTime: number
  ) {
    super(elemnt, motionConfig, hp, position);

    this.stepIntervalSubscription = interval(
      stepTime + this.motionConfig.duration * 1000
    ).subscribe((index: number) => {
      this.nextMove();
    });
  }

  kill(): void {
    this.stepIntervalSubscription.unsubscribe();
    this.playKillAnimation().subscribe(() => {
      this.element.remove();
      delete this.element;
      this.deleteMe.next(null);
      this.deleteMe.complete();
    });
  }

  abstract playKillAnimation(): Observable<null>;
  abstract nextMove(): PositionVector;
}

import { Actor } from '../actor';
import { MotionConfig, PositionVector } from '../motion';
import { interval, Observable, Subscription } from 'rxjs';

export abstract class Enemy extends Actor {
  private stepInterval$: Observable<number>;
  private stepIntervalSubscription: Subscription;
  private memoryLeak = 'Memory Leak';

  constructor(
    element: HTMLElement,
    enemyMotionConfig: MotionConfig,
    hp: number,
    position: PositionVector,
    stepTime: number
  ) {
    super(element, enemyMotionConfig, hp, position);

    this.stepInterval$ = interval(
      (stepTime + enemyMotionConfig.duration) * 1000
    );
    this.stepIntervalSubscription = this.stepInterval$.subscribe(
      (stepIndex: number) => {
        console.log('nextMove');
        this.nextMove();
      }
    );
  }

  kill(): void {
    this.stepIntervalSubscription.unsubscribe();
    this.killAnimation().subscribe(() => {
      this.element.remove();
      delete this.element;
      this.deleteMe.next();
    });
  }

  abstract killAnimation(): Observable<null>;
  abstract nextMove(): PositionVector;
}

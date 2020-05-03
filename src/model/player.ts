import { Actor } from './actor';
import { fromEvent } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { MotionService } from '../services/motion.service';

export const playerMotionConfig = {
  stepSize: 5,
  ease: 'none',
  duration: 0.3,
};

export class Player extends Actor {
  private attackIndex = 1;

  constructor(element: HTMLElement) {
    super(element, playerMotionConfig, 100, { x: 0, y: 0 });

    fromEvent(window, 'mousemove').subscribe((e: MouseEvent) => {
      this.aimAngle = UtilsService.angleFromCenter(this.absolutePos, {
        x: e.pageX,
        y: e.pageY,
      });
    });

    fromEvent(window, 'click').subscribe(() => {
      this.attack();
    });
  }

  hit(damage: number): void {
    this.hp -= damage;
  }

  heal(health: number): void {
    this.hp += health;
  }

  kill(): void {
    // Play the Kill animation
  }

  revive(): void {
    // Play the revie animation
  }

  attack(): void {
    const attackDirection = UtilsService.directionFromAngle(this.aimAngle);
    let attackElm: HTMLElement = UtilsService.createImgElement(
      `assets/attack${this.attackIndex}.png`
    );
    this.attackIndex %= 2;
    this.attackIndex += 1;
    attackElm = UtilsService.placeOnFloor(
      this.position,
      attackElm,
      attackDirection
    );
    MotionService.attackTo(
      attackElm,
      {
        ease: 'none',
        duration: 0.3,
        stepSize: 1,
      },
      attackDirection,
      1
    );
  }
}

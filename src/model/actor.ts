import { TweenLite } from 'gsap';
import { MotionService } from '../services/motion.service';
import {
  MotionDirection,
  IMovable,
  PositionVector,
  MotionConfig
} from './motion';
import { UtilsService } from '../services/utils.service';
import { Subject } from 'rxjs';

export abstract class Actor implements IMovable {
  private _alive: boolean = true;
  private _isMoving: boolean = false;
  private _aimAngle: number;
  public deleteMe: Subject<null> = new Subject<null>();

  constructor(
    public element: HTMLElement,
    private _motionConfig: MotionConfig,
    private _hp: number,
    private _position: PositionVector
  ) {}

  get absolutePos(): PositionVector {
    const elementPos = this.element.getBoundingClientRect();
    return {
      x: elementPos.left + elementPos.width / 2,
      y: elementPos.top + elementPos.height / 2
    };
  }

  get aimer(): HTMLElement {
    return this.element.querySelector('.aimer');
  }

  get isMoving(): boolean {
    return this._isMoving;
  }

  get motionConfig(): MotionConfig {
    return this._motionConfig;
  }

  set motionConfig(motionConfig: MotionConfig) {
    this._motionConfig = motionConfig;
  }

  get position(): PositionVector {
    return { ...this._position };
  }

  set position(position: PositionVector) {
    this._position = position;
  }

  get alive(): boolean {
    return this._alive;
  }

  get hp(): number {
    return this._hp;
  }

  set hp(hp: number) {
    this._hp = hp;
    if (this._hp <= 0) {
      this._hp = 0;
      this._alive = false;
      this.kill();
    } else if (!this._alive) {
      this._alive = true;
      this.revive();
    }
  }

  get aimAngle(): number {
    return this._aimAngle;
  }

  set aimAngle(aimAngle: number) {
    this._aimAngle = aimAngle % 360;
    TweenLite.to(this.aimer, {
      duration: 0,
      rotate: this.aimAngle
    });
  }

  get aimDirection(): MotionDirection {
    return UtilsService.directionFromAngle(this._aimAngle);
  }

  abstract hit(damage: number): void;
  abstract heal(health: number): void;
  abstract kill(): void;
  abstract revive(): void;

  moveTo(direction: MotionDirection, numOfSteps: number = 1): PositionVector {
    if (!this._isMoving) {
      MotionService.moveTo(
        this.element,
        this.motionConfig,
        direction,
        numOfSteps,
        () => {
          this._isMoving = false;
        }
      );
      this._isMoving = true;
      return this.updatePosition(direction, numOfSteps);
    }
  }

  dashTo(direction: MotionDirection, numOfSteps: number = 2): PositionVector {
    if (!this._isMoving) {
      MotionService.dashTo(
        this.element,
        this.motionConfig,
        direction,
        numOfSteps,
        () => {
          this._isMoving = false;
        }
      );
      this._isMoving = true;
      return this.updatePosition(direction, numOfSteps);
    }
  }

  updatePosition(
    direction: MotionDirection,
    numOfSteps: number
  ): PositionVector {
    switch (direction) {
      case MotionDirection.UP:
        this._position.y += numOfSteps;
        break;
      case MotionDirection.DOWN:
        this._position.y -= numOfSteps;
        break;
      case MotionDirection.LEFT:
        this._position.x -= numOfSteps;
        break;
      case MotionDirection.RIGHT:
        this._position.x += numOfSteps;
        break;
    }

    return this._position;
  }
}

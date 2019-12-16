import { Actor } from './actor';
import { fromEvent } from 'rxjs';
import { UtilsService } from '../services/utils.service';

export const playerMotionConfig = {
    stepSize: 5,
    ease: 'none',
    duration: 0.3
};

export class Player extends Actor {
    constructor(element: HTMLElement) {
        super(element, playerMotionConfig, 100, { x: 0, y: 0 });

        fromEvent(window, 'mousemove').subscribe((e: MouseEvent) => {
            this.aimAngle = UtilsService.angleFromCenter(this.absolutePos, {
                x: e.pageX,
                y: e.pageY
            });
        });

        fromEvent(window, 'click').subscribe(() => {
            console.log(UtilsService.directionFromAngle(this.aimAngle));
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
}
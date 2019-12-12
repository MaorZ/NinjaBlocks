import { Actor } from './actor';

export const playerMotionConfig = {
    stepSize: 5,
    ease: 'none',
    duration: 0.3
};

export class Player extends Actor {
    constructor(element: HTMLElement) {
        super(element, playerMotionConfig, 100, { x: 0, y: 0 });
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
export interface PositionVector {
  x?: number;
  y?: number;
}

export interface MotionVector {
  x?: string;
  y?: string;
}

export enum MotionDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export interface MotionConfig {
  stepSize: number;
  duration: number;
  ease: string;
}

export interface IMovable {
  moveTo(direction: MotionDirection, numOfSteps: number): PositionVector;
  dashTo(direction: MotionDirection, numOfSteps: number): PositionVector;
}
import { MotionDirection, MotionVector, MotionConfig } from '../model/motion';
import { TweenLite } from 'gsap';

export class MotionService {
  static moveTo(
    target: HTMLElement,
    motionConfig: MotionConfig,
    direction: MotionDirection,
    numOfSteps: number,
    onMoved?: () => void
  ) {
    const motionVector = this.calcMotionTweenVars(
      motionConfig.stepSize,
      direction,
      numOfSteps
    );
    TweenLite.to(
      target,
      {
        ...motionVector,
        duration: motionConfig.duration,
        ease: motionConfig.ease,
        onComplete: onMoved
      }
    );
  }

  static dashTo(
    target: HTMLElement,
    motionConfig: MotionConfig,
    direction: MotionDirection,
    numOfSteps: number,
    onMoved?: () => void
  ) {
    let tick = 0;

    const motionVector = this.calcMotionTweenVars(
      motionConfig.stepSize,
      direction,
      numOfSteps
    );

    TweenLite.to(
      target,
      {
        ...motionVector,
        duration: motionConfig.duration,
        ease: motionConfig.ease,
        onComplete: onMoved,
        onUpdateParams: [target],
        onUpdate: (target: HTMLElement) => {
          tick++;
          if (tick % 6 === 3) {
            let clone = target.cloneNode() as HTMLElement;
            let cloneCharacter = target.querySelector('.character').cloneNode(true);
            clone.appendChild(cloneCharacter);
            target.parentElement.appendChild(clone);
            clone.style.opacity = '0.8';
            TweenLite.to(clone, {
              duration: 0.5,
              opacity: 0,
              scaleX: 0.5,
              onCompleteParams: [clone],
              onComplete: (clone: HTMLElement) => {
                clone.remove();
                tick = 0;
              }
            });
          }
        }
      }
    );
  }

  private static calcMotionTweenVars(
    stepSize: number,
    direction: MotionDirection,
    numOfSteps: number
  ): MotionVector {
    const motionVector: MotionVector = {};
    switch (direction) {
      case MotionDirection.UP:
        motionVector.y = `-=${stepSize * numOfSteps}rem`;
        break;
      case MotionDirection.DOWN:
        motionVector.y = `+=${stepSize * numOfSteps}rem`;
        break;
      case MotionDirection.LEFT:
        motionVector.x = `-=${stepSize * numOfSteps}rem`;
        break;
      case MotionDirection.RIGHT:
        motionVector.x = `+=${stepSize * numOfSteps}rem`;
        break;
    }
    return motionVector;
  }
}
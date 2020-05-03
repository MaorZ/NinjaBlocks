import { PositionVector, MotionDirection } from '../model/motion';

export class UtilsService {
  static focusLevelOnElement(element: HTMLElement, level: HTMLElement) {
    let playerPos = element.getBoundingClientRect();
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let translateX = `${windowWidth / 2 - playerPos.left}px`;
    let translateY = `${windowHeight / 2 - playerPos.top}px`;

    level.style.transform = `translate(${translateX}, ${translateY})`;
  }

  static angleFromCenter(
    center: PositionVector,
    point: PositionVector
  ): number {
    const delta_x = point.x - center.x;
    const delta_y = point.y - center.y;
    const angle = (Math.atan2(delta_y, delta_x) * 180) / Math.PI;
    // return angle;
    return angle < 0 ? angle + 360 : angle;
  }

  static directionFromAngle(angle: number): MotionDirection {
    if (angle >= 45 && angle < 135) {
      return MotionDirection.DOWN;
    }
    if (angle >= 135 && angle < 225) {
      return MotionDirection.LEFT;
    }
    if (angle >= 225 && angle < 315) {
      return MotionDirection.UP;
    }
    return MotionDirection.RIGHT;
  }

  static createImgElement(imgSrc: string) {
    const img = document.createElement('img');
    img.src = imgSrc;
    return img as HTMLImageElement;
  }

  static placeOnFloor(
    rootfloorPos: PositionVector,
    targetElement: HTMLElement,
    direction: MotionDirection
  ): HTMLElement {
    targetElement.style.position = 'absolute';
    targetElement.style.top = rootfloorPos.y * -5 + 2.5 + 'rem';
    targetElement.style.left = rootfloorPos.x * 5 + 2.5 + 'rem';
    targetElement.style.transformOrigin = '0% 50%';
    targetElement.style.transform = 'translateY(-50%)';

    switch (direction) {
      case MotionDirection.RIGHT:
        targetElement.style.transform += ' translateX(50%)';
        break;
      case MotionDirection.DOWN:
        targetElement.style.transform += ' rotate(90deg) translateX(50%)';
        break;
      case MotionDirection.LEFT:
        targetElement.style.transform += ' rotate(180deg) translateX(50%)';
        break;
      case MotionDirection.UP:
        targetElement.style.transform += ' rotate(270deg) translateX(50%)';
        break;
    }

    document.querySelector('.floor').appendChild(targetElement);
    return targetElement;
  }
}

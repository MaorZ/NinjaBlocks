import { fromEvent } from 'rxjs';
import { } from 'rxjs/operators';
import { MotionDirection } from './model/motion';
import { Player, playerMotionConfig } from './model/player';
import { MotionService } from './services/motion.service';
import { UtilsService } from './services/utils.service';

let playerElement = document.getElementById('player');
let levelContainer = document.getElementById('levelContainer');
let player = new Player(playerElement);
UtilsService.focusLevelOnElement(playerElement, levelContainer);

console.log('Welcome to Ninja Blocks');

fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
  if (!player.isMoving) {
    switch (e.key) {
      case 'w':
        player.moveTo(MotionDirection.UP, 1);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.DOWN, 1);
        break;
      case 'W':
        player.dashTo(MotionDirection.UP, 2);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.DOWN, 2);
        break;
      case 's':
        player.moveTo(MotionDirection.DOWN, 1);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.UP, 1);
        break;
      case 'S':
        player.dashTo(MotionDirection.DOWN, 2);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.UP, 2);
        break;
      case 'a':
        player.moveTo(MotionDirection.LEFT, 1);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.RIGHT, 1);
        break;
      case 'A':
        player.dashTo(MotionDirection.LEFT, 2);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.RIGHT, 2);
        break;
      case 'd':
        player.moveTo(MotionDirection.RIGHT, 1);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.LEFT, 1);
        break;
      case 'D':
        player.dashTo(MotionDirection.RIGHT, 2);
        MotionService.moveTo(levelContainer, playerMotionConfig, MotionDirection.LEFT, 2);
        break;
    }
  }
});
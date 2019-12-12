export class UtilsService {
    static focusLevelOnElement(element: HTMLElement, level: HTMLElement) {
        let playerPos = element.getBoundingClientRect();
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let translateX = `${windowWidth / 2 - playerPos.left}px`;
        let translateY = `${windowHeight / 2 - playerPos.top}px`;

        level.style.transform = `translate(${translateX}, ${translateY})`;
    }
}
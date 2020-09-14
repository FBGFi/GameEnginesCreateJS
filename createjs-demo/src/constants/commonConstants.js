export class Constants {
    constructor() {
        this.canvasMaxWidth = 600;
    }
    sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
    scaleFactor(){
        return window.innerWidth >= this.canvasMaxWidth ? 1 : window.innerWidth / this.canvasMaxWidth;
    }
}
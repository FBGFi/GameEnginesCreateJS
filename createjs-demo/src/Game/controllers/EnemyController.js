// Enemy behaviour
import Constants, { canvasMaxHeight, canvasMaxWidth } from "../../constants/commonConstants";

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    state = {
        maxHP: 1,
        currentHP: this.state.maxHP,
        pos: {
            x: Constants.canvasMaxWidth * 1.05,
            y:  Constants.canvasMaxHeight * (Math.random() * 0.9 + 0.05)
        }
    }

    constructor() {}

    move = (x, y) => {
        let poxX = this.state.pos.x += x;
        let posY = this.state.pos.y += y;
    }

    takeDamage = (damage) => {
        let newHP = this.state.currentHP -= damage;
        if (newHP <= this.state.maxHP) this.destructor;
    }

    destructor() {
        let dropObject = Math.random() < 0.1 ? true : false;
        if (dropObject === true) {
            
        }
    }
}
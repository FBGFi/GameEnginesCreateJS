// Enemy behaviour
import Constants, { canvasMaxHeight, canvasMaxWidth } from "../../constants/commonConstants";

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    state = {
        maxHP: 1,
        currentHP: 0,
        pos: {
            x: Constants.canvasMaxWidth,
            y:  Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05)
        }
    }

    constructor() {
        this.state.currentHP = this.state.maxHP;
    }

    move = (x, y) => {
        this.state.pos.x += x;
        this.state.pos.y += y;
    }

    takeDamage = (damage) => {
        let newHP = this.state.currentHP -= damage;
        if (newHP <= this.state.maxHP) return this.destructor();
    }

    destructor() {
        return Math.random() < 0.1 ? true : false;
    }
}
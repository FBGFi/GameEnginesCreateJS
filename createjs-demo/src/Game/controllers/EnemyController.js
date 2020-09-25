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

    /**
     * @author Sami - default constructor
     */
    constructor() {
        this.state.currentHP = this.state.maxHP;
    }

    /**
     * @author Sami - Move this enemy on the game stage for the amount of x and y
     * @param {Number} x 
     * @param {Number} y 
     */
    move = (x, y) => {
        this.state.pos.x += x;
        this.state.pos.y += y;
    }

    /**
     * @author Sami - The enemy takes damage for the amount of damage variable
     * @param {Number} damage 
     */
    takeDamage = (damage) => {
        let newHP = this.state.currentHP -= damage;
        if (newHP <= this.state.maxHP) return this.destructor();
    }

    /**
     * @author Sami - The enemy is destroyed and it creates a random number while doing so
     */
    destructor() {
        return Math.random() < 0.1 ? true : false;
    }
}
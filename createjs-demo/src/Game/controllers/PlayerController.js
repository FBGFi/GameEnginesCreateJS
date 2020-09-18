// Player functionalities
import Constants from "../../constants/commonConstants";

/**
 * @author Aleksi - class controlling player actions
 */
export class PlayerController{
    state = {
        maxHP: Constants.maxHP,
        currentHP: Constants.maxHP,
        rocketsLeft: Constants.initRockets,
        posY: 0
    }

    constructor(){
        this.state.posY = Constants.canvasMaxWidth * 0.5625 / 2;
    }

    /**
     * @author Aleksi - move the player on Y-axis
     * @param {Number} y - amount moved
     */
    move = (y) => this.state.posY -= y;

    /**
     * @author Aleksi - increase or decrease currentHP
     * @param {Number} hp - amount changed
     */
    hpChanged = (hp) => {
        let compHp = this.state.currentHP += hp;
        this.state.currentHP = compHp > this.state.maxHP ? this.state.maxHP : compHp;
    }
}
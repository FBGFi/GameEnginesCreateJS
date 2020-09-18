// Player functionalities
import Constants from "../../constants/commonConstants";

/**
 * @author Aleksi - class controlling player actions¨
 * @param {Number} posY - Y-position of the player at the beginning of the game (canvas height / 2)
 */
export class PlayerController{
    state = {
        maxHP: Constants.maxHP,
        currentHP: Constants.maxHP,
        rocketsLeft: Constants.initRockets,
        posY: 0
    }

    constructor(posY){
        this.state.posY = posY;
    }

    /**
     * @author Aleksi - move the player on Y-axis
     * @param {Number} y - amount moved
     */
    move = (y) => this.state.posY += y;

    /**
     * @author Aleksi - increase or decrease currentHP
     * @param {*} hp - amount changed
     */
    hpChanged = (hp) => {
        let compHp = this.state.currentHP += hp;
        this.state.currentHP = compHp > this.state.maxHP ? this.state.maxHP : compHp;
    }
}
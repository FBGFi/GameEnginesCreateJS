// Player functionalities
import Constants from "../../constants/commonConstants";

/**
 * @author Aleksi - class controlling player actions
 */
export class PlayerController{
    state = {
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
        this.state.currentHP = compHp > Constants.maxHP ? Constants.maxHP : compHp;
    }

    /**
     * @author Aleksi - player is shooting
     * @param {String} weapon - "MAIN" or "ROCKET"
     * @returns {Boolean}
     */
    shoot = (weapon) => { 
        if(weapon === "MAIN") return true;
        if(weapon === "ROCKET" && this.state.rocketsLeft > 0){
            this.state.rocketsLeft--;
            return true;
        }
        return false;
    }
}
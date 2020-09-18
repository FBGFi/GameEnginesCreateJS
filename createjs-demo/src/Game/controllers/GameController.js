// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";

const createjs = window.createjs;

export class GameController{
    state = {

    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage){
        this.stage = stage;
        this.playerController = new PlayerController();
        
        this.initPlayer();
    }

    initPlayer = () => {       
        this.player = new createjs.Shape();
        this.player.graphics.beginFill("red").drawCircle(0,0,20);
        this.player.x = Constants.playerXPos;
        this.player.y = this.playerController.state.posY;
        this.stage.addChild(this.player);
        this.stage.update();

        document.onkeydown = e => {
            console.log(e);
        };
    }
}
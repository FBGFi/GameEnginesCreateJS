// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import { UIController } from "./UIController"
import { EnemyController } from "./EnemyController";
import { BackgroundController } from "./BackgroundController";
import playerSprite from "../sprites/playermodel.png";

const createjs = window.createjs;

export class GameController {
    state = {
        playerDirection: "NONE",
        shooting: false,
        goingUp: false,
        goingDown: false
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage, canvas, ui, updateUi, dealDMG) {
        
        this.canvas = canvas
        this.ui = ui
        this.stage = stage;
        this.BackgroundController = new BackgroundController(stage, canvas);
        this.playerController = new PlayerController(stage, updateUi, dealDMG);
        this.UIController = new UIController(this.stage, this.canvas, this.ui)
        this.initPlayer();

        this.enemyController = new EnemyController(stage, dealDMG);

        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
        createjs.Sound.setVolume(0.5);
    }

    initPlayer = () => {
        this.player = new createjs.Bitmap(playerSprite);
        this.player.scale = Constants.playerScale;
        this.player.x = Constants.playerXPos;
        this.player.y = this.playerController.state.posY;
        this.stage.addChild(this.player);
        
        
        
        
        this.stage.update();

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        document.onkeypress = this.handleKeyPress;
    }

    handleGameOver = () => {
        createjs.Ticker.removeAllEventListeners("tick");
    }

    handleKeyPress = e => {
        switch (e.key) {
            case "Space":
            case " ":
                if (!this.state.shooting) {
                    this.state.shooting = true;
                    this.playerController.shoot("MAIN");
                }
                break;
            case "KeyR":
            case "r":
                if (!this.state.shooting) {
                    this.state.shooting = true;
                    this.playerController.shoot("ROCKET");
                }
                break;
            default:
                break;
        }
    }

    handleKeyDown = e => {
        switch (e.key) {
            case "w":
            case "ArrowUp":
                this.state.goingUp = true;
                this.state.playerDirection = "UP";
                break;
            case "s":
            case "ArrowDown":
                this.state.goingDown = true;
                this.state.playerDirection = "DOWN";
                break;
            default:
                break;
        }
    }

    handleKeyUp = e => {
        switch (e.key) {
            case "w":
            case "ArrowUp":
                this.state.goingUp = false;
                if(!this.state.goingDown && !this.state.goingUp){
                    this.state.playerDirection = "NONE";
                } else if(this.state.goingDown){
                    this.state.playerDirection = "DOWN"
                }
                break;
            case "s":
            case "ArrowDown":
                this.state.goingDown = false;
                if(!this.state.goingDown && !this.state.goingUp){
                    this.state.playerDirection = "NONE";
                } else if(this.state.goingUp){
                    this.state.playerDirection = "UP"
                }
                break;
            case " ":
            case "r":
                this.state.shooting = false;
                break;
            default:
                break;
        }
    }

    handleTick = (event) => {
        this.playerController.playerMovement(this.player, this.state.playerDirection);
        this.playerController.handleProjectileMovement();
        this.stage.update(event);

    }
}
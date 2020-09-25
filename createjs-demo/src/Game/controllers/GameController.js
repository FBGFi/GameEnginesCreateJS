// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import { EnemyController } from "./EnemyController";
import { BackgroundController } from "./BackgroundController";
import playerSprite from "../sprites/playermodel.png";

const createjs = window.createjs;

export class GameController {
    state = {
        playerDirection: "NONE",
        shooting: false
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage, canvas) {
        this.stage = stage;
        this.BackgroundController = new BackgroundController(stage, canvas);
        this.playerController = new PlayerController(stage);
        this.initPlayer();

        this.enemyController = new EnemyController(stage);

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
                this.state.playerDirection = "UP";
                break;
            case "s":
            case "ArrowDown":
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
            case "s":
            case "ArrowDown":
                this.state.playerDirection = "NONE";
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
// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";

const createjs = window.createjs;

export class GameController {
    state = {
        playerDirection: "NONE"
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage) {
        this.stage = stage;
        this.playerController = new PlayerController();
        this.initPlayer();
        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);

    }

    initPlayer = () => {
        this.player = new createjs.Shape();
        this.player.graphics.beginFill("red").drawCircle(0, 0, Constants.playerHeight);
        this.player.x = Constants.playerXPos;
        this.player.y = this.playerController.state.posY;
        this.stage.addChild(this.player);
        this.stage.update();

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
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
            default:
                break;
        }
    }

    playerMovement = () => {
        switch (this.state.playerDirection) {
            case "UP":
                if (this.playerController.state.posY > Constants.playerHeight) {
                    this.playerController.move(Constants.playerMovementSpeed);
                    this.player.y = this.playerController.state.posY;
                }
                break;
            case "DOWN":
                if (this.playerController.state.posY < Constants.canvasMaxHeight - Constants.playerHeight) {
                    this.playerController.move(-Constants.playerMovementSpeed);
                    this.player.y = this.playerController.state.posY;
                }
                break;

            default:
                break;
        }
    }

    handleTick = (event) => {
        this.playerMovement();
        this.stage.update();
    }
}
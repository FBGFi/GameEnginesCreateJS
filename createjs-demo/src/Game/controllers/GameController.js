// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import playerSprite from "../sprites/playermodel.png";

const createjs = window.createjs;

export class GameController {
    state = {
        playerDirection: "NONE"
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage, canvas) {
        this.stage = stage;
        canvas.getContext('2d').imageSmoothingEnabled = false;
        this.playerController = new PlayerController();
        this.initPlayer();

        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
    }

    initPlayer = () => {
        this.player = new createjs.Bitmap(playerSprite);
        this.player.scale = Constants.playerScale;
        this.player.x = Constants.playerXPos;
        this.player.y = this.playerController.state.posY;
        this.stage.addChild(this.player);
        this.stage.update();

        this.playerProjectiles = [];

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        document.onkeypress = this.handleKeyPress;
    }

    createPlayerProjectile = type => {
        let projectile;
        switch (type) {
            case "MAIN":
                projectile = new createjs.Shape();
                projectile.graphics.beginFill("black").drawCircle(0, 0, 5);
                projectile.x = this.player.x;
                projectile.y = this.player.y;
                this.playerProjectiles.push(projectile);
                this.stage.addChild(projectile);
                break;
            case "ROCKET":
                break;
            default:
                break;
        }
    }

    handleKeyPress = e => {
        switch (e.key) {
            case "Space":
            case " ":
                if (this.playerController.shoot("MAIN")) {
                    // add sound here
                    this.createPlayerProjectile("MAIN");
                }
                break;
            case "KeyR":
            case "r":
                if (this.playerController.shoot("ROCKET")) {
                    // add sound here
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
            default:
                break;
        }
    }

    playerMovement = () => {
        switch (this.state.playerDirection) {
            case "UP":
                if (this.playerController.state.posY > 0) {
                    this.playerController.move(Constants.playerMovementSpeed);
                    this.player.y = this.playerController.state.posY;
                }
                break;
            case "DOWN":
                if (this.playerController.state.posY < Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
                    this.playerController.move(-Constants.playerMovementSpeed);
                    this.player.y = this.playerController.state.posY;
                }
                break;

            default:
                break;
        }
    }

    handleProjectileMovement = async () => {
        for (let i = this.playerProjectiles.length - 1; i >= 0; i--) {
            if (this.playerProjectiles[i] !== undefined) {
                if (this.playerProjectiles[i].x < Constants.canvasMaxWidth) {
                    this.playerProjectiles[i].x += Constants.projectileSpeed;
                } else if (this.playerProjectiles[i].x > Constants.canvasMaxWidth) {
                    this.stage.removeChild(this.playerProjectiles[i]);
                    if (this.playerProjectiles.length > 1) {
                        await this.playerProjectiles.splice(0, i);
                    } else {
                        this.playerProjectiles = [];
                    }
                    break;
                }
            }
        }
    }

    handleTick = (event) => {
        this.playerMovement();
        this.handleProjectileMovement();

        this.stage.update();
    }
}
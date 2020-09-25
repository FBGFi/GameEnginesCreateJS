// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import { EnemyController } from "./EnemyController";
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
        canvas.getContext('2d').imageSmoothingEnabled = false;
        this.playerController = new PlayerController(stage);
        this.initPlayer();

        this.enemyController = new EnemyController();
        this.spawnEnemies();

        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
        createjs.Sound.setVolume(0.5);
    }

    spawnEnemies = () => {
        this.enemyController.enemies.forEach(e => {
            this.stage.addChild(e);
        });
        this.stage.update();
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

    handleEnemyMovement = () => {
        for (let i = this.enemyController.enemies.length - 1; i >= 0; i--) {

            this.enemyController.enemies[i].x -= Constants.enemySpeed;

            if (this.enemyController.enemies[i].x < 0) {
                this.stage.removeChild(this.enemyController.enemies[i]);
                this.enemyController.enemies.splice(i, 1);
                break;
            }
        }
    }

    handleTick = (event) => {
        this.playerController.playerMovement(this.player, this.state.playerDirection);
        this.playerController.handleProjectileMovement();
        this.handleEnemyMovement();
        this.stage.update(event);
    }
}
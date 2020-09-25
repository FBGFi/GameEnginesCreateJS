// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import playerSprite from "../sprites/playermodel.png";

import { EnemyController } from "./EnemyController";
import enemySprite from "../sprites/blob_0001.png";
import enemySprite2 from "../sprites/blob_0002.png";
import enemySprite3 from "../sprites/longboy.png";

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

        this.enemiesList = [];
        this.spawnEnemies();

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

    /**
     * @author Sami - Create enemies on interval
     */
    spawnEnemies = () => {
        let interval = setInterval(() => {
            this.createEnemy(1);
        }, 2000);
    }

    /**
     * @author Sami - Create a new enemy on the stage
     * @param {Number} x 
     */
    createEnemy = (x) => {
        let enemyController;
        let enemy;
        let randNum;
        for (let i = 0; i < x; i++) {
            randNum = Math.random(Math.random());
            enemyController = new EnemyController();
            if (randNum <= 0.33) enemy = new createjs.Bitmap(enemySprite);
            else if (randNum > 0.33 && randNum < 0.66) enemy = new createjs.Bitmap(enemySprite2);
            else enemy = new createjs.Bitmap(enemySprite3);
            enemy.scale = Constants.playerScale;
            enemy.x = enemyController.state.pos.x;
            enemy.y = enemyController.state.pos.y;
            this.enemiesList.push({
                enemy: enemy,
                enemyController: enemyController
            });

            this.stage.addChild(enemy);
            this.stage.update();
        }
    }

    /**
     * @author Sami - move existing enemies and remove them after they are out of game area
     */
    handleEnemyMovement = () => {
        let length = this.enemiesList.length;
        for (let i = 0; i < length; i++) {
            if (this.enemiesList[i] !== undefined) {
                if (this.enemiesList[i].enemyController.state.pos.x > Constants.canvasMaxWidth * 0 - Constants.playerHeight * Constants.playerScale) {
                    this.enemiesList[i].enemyController.move(-5, 0);
                    this.enemiesList[i].enemy.x = this.enemiesList[i].enemyController.state.pos.x;
                    this.enemiesList[i].enemy.y = this.enemiesList[i].enemyController.state.pos.y;
                } else {
                    this.removeEnemy(i);
                }
            }
        }
    }

    /**
     * @author Sami - removes an enemy from the stage and the enemyList
     * @param {Number} i 
     */
    removeEnemy = (i) => {
        this.stage.removeChild(this.enemiesList[i].enemy);
        this.enemiesList.splice(i, 1);
    }

    handleTick = (event) => {
        this.playerMovement();
        this.handleProjectileMovement();

        this.handleEnemyMovement();

        this.stage.update();
    }
}
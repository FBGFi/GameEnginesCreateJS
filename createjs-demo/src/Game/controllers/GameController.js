// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import { UIController } from "./UIController"
import { EnemyController } from "./EnemyController";
import { BackgroundController } from "./BackgroundController";
import playerSprite from "../sprites/playermodel.png";

import shootSound from "../assets/sounds/shoot.wav";
import rocketSound from "../assets/sounds/rocket.wav";
import hurtSound from "../assets/sounds/hurt.wav";
import explosionSound from "../assets/sounds/explosion.wav";

const createjs = window.createjs;

export class GameController {
    state = {
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage, canvas, ui, updateUi, dealDMG, addScore) {
        
        this.canvas = canvas
        this.ui = ui
        this.stage = stage;
        this.BackgroundController = new BackgroundController(stage, canvas);
        this.playerController = new PlayerController(stage, updateUi, dealDMG, addScore);
        this.UIController = new UIController(this.stage, this.canvas, this.ui)
        this.initPlayer();

        this.enemyController = new EnemyController(stage, dealDMG);

        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
        createjs.Ticker.init();
        createjs.Sound.setVolume(0.5);
        
        createjs.Sound.registerSound(shootSound, Constants.tokens.sounds.playerShoot);
        createjs.Sound.registerSound(rocketSound, Constants.tokens.sounds.rocket);
        createjs.Sound.registerSound(hurtSound, Constants.tokens.sounds.playerHit);
        createjs.Sound.registerSound(explosionSound, Constants.tokens.sounds.explosion);
    }

    initPlayer = () => {
        this.player = new createjs.Bitmap(playerSprite);
        this.player.scale = Constants.playerScale;
        this.player.x = Constants.playerXPos;
        this.player.y = this.playerController.state.posY;
        this.stage.addChild(this.player);
               
        this.stage.update();

    }

    handleGameOver = () => {
        createjs.Sound.setVolume(0);
        createjs.Ticker.reset();        
    }

    handleTick = (event) => {
        this.playerController.playerMovement(this.player);
        this.playerController.handleProjectileMovement();
        this.playerController.checkIfEnemyHit(this.enemyController.enemies);
        this.playerController.checkIfHitByEnemy(this.enemyController.enemies);
        this.stage.update(event);
        this.BackgroundController.handleWeeds();
    }
}
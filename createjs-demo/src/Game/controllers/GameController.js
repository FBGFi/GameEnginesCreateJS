// Teh Game

import Constants from "../../constants/commonConstants";
import { PlayerController } from "./PlayerController";
import { EnemyController } from "./EnemyController";
import { BackgroundController } from "./BackgroundController";
import playerSprite from "../sprites/playermodel.png";

import shootSound from "../assets/sounds/shoot.wav";
import rocketSound from "../assets/sounds/rocket.wav";
import hurtSound from "../assets/sounds/hurt.wav";
import explosionSound from "../assets/sounds/explosion.wav";
import gameOverSound from "../assets/sounds/gameover.wav";
import healthPickUpSound from "../assets/sounds/health.wav";
import rocketPickUpSound from "../assets/sounds/rocketPick.wav";
import gameMusic from '../assets/sounds/gameMusic.mp3';

const createjs = window.createjs;

createjs.Sound.registerSound(gameMusic, Constants.tokens.sounds.gameMusic);

export class GameController {
    state = {
    }

    /**
     * @author Aleksi - class containing game logic
     * @param {Stage} stage 
     */
    constructor(stage, canvas, ui, updateUi, changeHP, addScore) {

        this.canvas = canvas
        this.ui = ui
        this.stage = stage;
        this.BackgroundController = new BackgroundController(stage, canvas);
        this.playerController = new PlayerController(stage, updateUi, changeHP, addScore);
        this.initPlayer();

        this.enemyController = new EnemyController(stage, changeHP, this.playerController.addRockets);

        createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
        createjs.Ticker.init();
        createjs.Sound.setVolume(0.4);

        createjs.Sound.registerSound(shootSound, Constants.tokens.sounds.playerShoot);
        createjs.Sound.registerSound(rocketSound, Constants.tokens.sounds.rocket);
        createjs.Sound.registerSound(hurtSound, Constants.tokens.sounds.playerHit);
        createjs.Sound.registerSound(explosionSound, Constants.tokens.sounds.explosion);
        createjs.Sound.registerSound(gameOverSound, Constants.tokens.sounds.gameOver);
        createjs.Sound.registerSound(healthPickUpSound, Constants.tokens.sounds.healthPickup);
        createjs.Sound.registerSound(rocketPickUpSound, Constants.tokens.sounds.rocketPickup);

        // Set background music
        const gameMusic = createjs.Sound.play(Constants.tokens.sounds.gameMusic, {loop: 10});
        gameMusic.volume = gameMusic.volume * 0.28;
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
        document.onkeydown = null;
        document.onkeyup = null;
        document.onkeypress = null;
        
        createjs.Sound.stop(); // Stop the game music on the background
        createjs.Sound.play(Constants.tokens.sounds.gameOver);

        createjs.Ticker.reset();
    }

    handleTick = async(event) => {
        this.playerController.playerMovement(this.player);
        this.playerController.handleProjectileMovement();
        this.playerController.checkIfEnemyHit(this.enemyController.enemies);
        this.playerController.checkIfHitByObject(this.enemyController.enemies);
        this.playerController.checkIfHitByObject(this.enemyController.pickUps);
        this.BackgroundController.handleWeeds();
        this.stage.update(event);
    }
}
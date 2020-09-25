// Player functionalities
import Constants from "../../constants/commonConstants";

import rocketSprite from "../sprites/rocket.png";
import bulletSprite from "../sprites/bullet.png";
import shootSound from "../assets/sounds/shoot.wav";
import rocketSound from "../assets/sounds/rocket.wav";

const createjs = window.createjs;

/**
 * @author Aleksi - class controlling player actions
 */
export class PlayerController{
    state = {
        currentHP: Constants.maxHP,
        rocketsLeft: Constants.initRockets,
        posY: 0,
        projectiles: []
    }

    constructor(stage){
        this.state.posY = Constants.canvasMaxWidth * 0.5625 / 2;
        this.stage = stage;       
        createjs.Sound.registerSound(shootSound, "shoot");
        createjs.Sound.registerSound(rocketSound, "rocket");
    }

    /**
     * @author Aleksi - move the player on Y-axis
     * @param {Number} y - amount moved
     */
    move = (y) => { 
        if(this.state.posY - y >= Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
            this.state.posY = Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale);
        }
        else if(this.state.posY - y <= 0){ 
            this.state.posY = 0;
        }
        else {
            this.state.posY -= y;
        }
    }

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
     */
    shoot = (weapon) => { 
        if(weapon === "MAIN"){
            this.createProjectile(weapon)
            createjs.Sound.play("shoot");
        }
        else if(weapon === "ROCKET" && this.state.rocketsLeft > 0){
            this.state.rocketsLeft--;
            this.createProjectile(weapon);
            createjs.Sound.play("rocket");
        }
    }

    /**
     * @author Aleksi - handle player movement
     * @param {Object} player - player object drawn to stage
     * @param {String} direction - "UP" / "DOWN"
     */
    playerMovement = (player, direction) => {
        switch (direction) {
            case "UP":
                if (this.state.posY > 0) {
                    this.move(Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                }
                break;
            case "DOWN":
                if (this.state.posY < Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
                    this.move(-Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                }
                break;

            default:
                break;
        }
    }

    /**
     * @author Aleksi - create player projectiles
     * @param {String} type - "MAIN" / "ROCKET"
     */
    createProjectile = type => {
        let projectile;
        let scale;
        switch (type) {
            case "MAIN":
                scale = 5;
                projectile = new createjs.Bitmap(bulletSprite);
                projectile.y = this.state.posY + (Constants.playerHeight * Constants.playerScale / 2) - (scale / 2);
                break;
            case "ROCKET":
                scale = 4;
                projectile = new createjs.Bitmap(rocketSprite);
                projectile.y = this.state.posY + (Constants.playerHeight * Constants.playerScale / 2) - (scale + scale/2);
                break;
            default:
                break;
        }
        projectile.scale = scale;
        projectile.x = Constants.playerXPos;
        this.state.projectiles.push(projectile);
        this.stage.addChild(projectile);
    }

    /**
     * @author Aleksi - move the projectiles
     */
    handleProjectileMovement = async () => {
        for (let i = this.state.projectiles.length - 1; i >= 0; i--) {
            if (this.state.projectiles[i] !== undefined) {
                if (this.state.projectiles[i].x < Constants.canvasMaxWidth) {
                    this.state.projectiles[i].x += Constants.projectileSpeed;
                } else if (this.state.projectiles[i].x > Constants.canvasMaxWidth) {
                    this.stage.removeChild(this.state.projectiles[i]);
                    if (this.state.projectiles.length > 1) {
                        await this.state.projectiles.splice(0, i);
                    } else {
                        this.state.projectiles = [];
                    }
                    break;
                }
            }
        }
    }
}
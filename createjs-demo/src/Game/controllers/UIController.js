// Add UI functionalities here
import Constants from "../../constants/commonConstants";


const createjs = window.createjs
/**
 * @author Henri - class for handling the user interface
 */

export class UIController{
    state = {
        missiles: 10,
        uiHeight: 50,
        uiFontSize: 25,
        uiHealthbar: {
            x: 500,
            y: 5,
            width: 300,
            height: 40
        },
        currHP: 33,
    }
    constructor(stage, canvas, ui){
        this.canvas = canvas
        this.stage = stage
        this.ui = ui
        this.drawUI(ui);
        // this.drawUIv2(stage)
    }

    drawUIv2 = () => {
        let g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke("#000000");
        g.beginFill("red");
        g.drawCircle(0,0,30);
        // this.stage.addChild(g);
        // this.stage.update();
        // g.beginFill("#ff00ff")
        // g.moveTo(0, this.state.uiHeight)
        // g.lineTo(this.canvas.width, this.state.uiHeight)
        console.log(g)
        
    }

    drawUI = () => {
        // //let canvas = document.getElementById("game-stage");
        // let ctx = this.canvas.getContext("2d");
        // ctx.moveTo(0, this.state.uiHeight);
        // ctx.lineTo(this.canvas.width, this.state.uiHeight);
        // ctx.font = `${this.state.uiFontSize}px Arial`;
        // ctx.fillText(`Health left: ${this.state.currHP}/${Constants.maxHP} Missiles remaining: ${this.state.missiles}`, 10, (this.state.uiHeight/2+this.state.uiFontSize/2));
        
        // // pohjalle musta suorakulmio
        // ctx.fillStyle = "black";
        // ctx.fillRect(this.state.uiHealthbar.x, this.state.uiHealthbar.y, this.state.uiHealthbar.width, this.state.uiHealthbar.height);

        // // päälle punainen suorakulmio kuvaamaan healthremaining
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.state.uiHealthbar.x, this.state.uiHealthbar.y, this.state.uiHealthbar.width * (this.state.currHP/Constants.maxHP), this.state.uiHealthbar.height);
        // ctx.stroke();
    }
}
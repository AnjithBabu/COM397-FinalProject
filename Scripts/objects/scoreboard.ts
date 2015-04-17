/// <reference path="label.ts" />
module objects {
    // Scoreboard Class
    export class Scoreboard {
        lives: number;
        score: number;
        highScore: number;
        livesValueLabel: objects.Label;
        livesLabel: objects.Label;
        scoreValueLabel: objects.Label;
        livesValueLabelString: string = "";
        scoreLabel: objects.Label;
        scoreValueLabelString: string = "";

        constructor() {

            //intializes the scoreboard
            this.lives = config.HERO_LIVES;
            this.score = 0;

            this.livesLabel = new objects.Label(stage.canvas.width * 0.10, 0, "lives");
            this.livesLabel.regX = 0;
            this.livesLabel.regY = 0;
            this.livesLabel.fontSize(40);

            this.livesValueLabel = new objects.Label(stage.canvas.width * 0.10, 40, this.lives.toString());
            this.livesValueLabel.regX = 0;
            this.livesValueLabel.regY = 0;
            this.livesValueLabel.fontSize(40);

            this.scoreLabel = new objects.Label(stage.canvas.width * 0.70, 0, "score");
            this.scoreLabel.regX = 0;
            this.scoreLabel.regY = 0;
            this.scoreLabel.fontSize(40);

            this.scoreValueLabel = new objects.Label(stage.canvas.width * 0.70, 40, this.score.toString());
            this.scoreValueLabel.regX = 0;
            this.scoreValueLabel.regY = 0;
            this.scoreValueLabel.fontSize(40);


            this.update();

            this.showScoreBoard();
        }

        // method to show score board and add it to screen
        showScoreBoard() {
            stage.addChild(this.livesLabel);
            stage.addChild(this.livesValueLabel);
            stage.addChild(this.scoreLabel);
            stage.addChild(this.scoreValueLabel);
        }

        // updates score on the screen
        update() {
            this.livesValueLabelString = config.HERO_LIVES.toString();
            this.livesValueLabel.text = this.livesValueLabelString;

            this.scoreValueLabelString = config.score.toString();
            this.scoreValueLabel.text = this.scoreValueLabelString;
        }

        // removes scoreboard
        destroy() {
            stage.removeChild(this.livesLabel);
            stage.removeChild(this.livesValueLabel);
            stage.removeChild(this.scoreLabel);
            stage.removeChild(this.scoreValueLabel);
        }
    }
} 
var states;
(function (states) {
    var GameOver = (function () {
        function GameOver() {
            this.play = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            var background = new createjs.Bitmap("assets/images/gamescreens/gameover.png");
            background.x = 0;
            background.y = 200;
            this.game.addChild(background);
            this.scoreLabel = new objects.Label(350, 250, "score");
            this.scoreLabel.regX = 0;
            this.scoreLabel.regY = 0;
            this.scoreLabel.fontSize(40);
            this.scoreValueLabel = new objects.Label(550, 250, config.score.toString());
            this.scoreValueLabel.regX = 0;
            this.scoreValueLabel.regY = 0;
            this.scoreValueLabel.fontSize(40);
            this.game.addChild(this.scoreLabel);
            this.game.addChild(this.scoreValueLabel);
            stage.addChild(this.game);
            config.HERO_LIVES = 5;
            //Loading the game audio
            createjs.Sound.registerSound({ id: "game", src: "assets/sounds/game.mp3" });
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
                // A sound has been preloaded.
                if (event.id == 'game') {
                    createjs.Sound.play("game", { loop: -1 });
                }
            }
            this.assignControls();
        }
        // function to perform whn key is pressed
        GameOver.prototype.assignControls = function () {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        };
        GameOver.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
            }
        };
        GameOver.prototype.update = function () {
            if (controls.playGameLevel1) {
                createjs.Sound.removeSound("assets/sounds/game.mp3", ""); // remove sound on state change
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.MENU_STATE; // call next stage
                stateChanged = true;
                controls.playGameLevel1 = false;
            }
            stage.update();
        };
        return GameOver;
    })();
    states.GameOver = GameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map
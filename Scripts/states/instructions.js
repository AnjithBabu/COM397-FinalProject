var states;
(function (states) {
    var GameInstructions = (function () {
        function GameInstructions() {
            this.play = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            var background = new createjs.Bitmap("assets/images/gamescreens/instructions.png");
            background.x = 0;
            background.y = 160;
            this.game.addChild(background);
            stage.addChild(this.game);
            this.assignControls();
        }
        GameInstructions.prototype.assignControls = function () {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        };
        GameInstructions.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
            }
        };
        GameInstructions.prototype.update = function () {
            if (controls.playGameLevel1) {
                createjs.Sound.removeSound("assets/sounds/game.mp3", ""); // remove sound on state change
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.PLAY_STATE_LEVEL_1;
                stateChanged = true;
                controls.playGameLevel1 = false;
            }
            stage.update();
        };
        return GameInstructions;
    })();
    states.GameInstructions = GameInstructions;
})(states || (states = {}));
//# sourceMappingURL=instructions.js.map
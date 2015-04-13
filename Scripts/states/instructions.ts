
module states {
    export class GameInstructions {
        // Game Objects 
        public game: createjs.Container;
        public play: boolean = false;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            var background = new createjs.Bitmap("assets/images/gamescreens/instructions.png")
            background.x = 0;
            background.y = 160;
            this.game.addChild(background);

            stage.addChild(this.game);
            this.assignControls();
        }

        assignControls() {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        }


        onControlUp(e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
            }
        }

        update() {
            if (controls.playGameLevel1) {
                createjs.Sound.removeSound("assets/sounds/game.mp3", ""); // remove sound on state change
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.PLAY_STATE_LEVEL_1;
                stateChanged = true;
                controls.playGameLevel1 = false;
            }
            stage.update();
        }
    }
}
  
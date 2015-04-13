
module states {
    export class GameOver {
        // Game Objects 
        public game: createjs.Container;
        public play: boolean = false;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            var background = new createjs.Bitmap("assets/images/gamescreens/gameover.png")
            background.x = 0;
            background.y = 200;
            this.game.addChild(background);

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
                currentState = config.MENU_STATE;
                stateChanged = true;
                controls.playGameLevel1 = false;
            } 

            stage.update();
        }
    }
}
 
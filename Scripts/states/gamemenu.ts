/// <reference path="../box2d.ts" />
/// <reference path="../config.ts" />
/// <reference path="../keys.ts" />
/// <reference path="../controls.ts" />
/// <reference path="../managers/asset.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/reality.ts" />
/// <reference path="../objects/platform.ts" />
/// <reference path="../objects/hero.ts" />
/// <reference path="../objects/enemyfire.ts" />
/// <reference path="../objects/fire.ts" />
/// <reference path="../objects/spaceship.ts" />
/// <reference path="../objects/package.ts" />

module states {
    export class Menu {

        // Game Objects 
        public game: createjs.Container;
        public play: boolean = false;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            var background = new createjs.Bitmap("assets/images/gamescreens/menu-background.png")
            background.x = 0;
            background.y = 152;
            this.game.addChild(background);

            //Loading the game audio
            createjs.Sound.registerSound({ id: "game", src: "assets/sounds/game.mp3" });
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
                // A sound has been preloaded.
                if (event.id == 'game') {
                    createjs.Sound.play("game", { loop: -1 });

                }
            }

            stage.addChild(this.game);
            this.assignControls();
        }

        assignControls() {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        }

        // function to perform whn key is pressed
        onControlUp(e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
                case keys.lowerI:
                case keys.upperI:
                    controls.instructions = true;
            }
        }

        // function to update the game details on each tick
        update() {
            if (controls.playGameLevel1) {
                createjs.Sound.removeSound("assets/sounds/game.mp3", ""); // remove sound on state change
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.PLAY_STATE_LEVEL_1; // call next stage
                stateChanged = true;
                controls.playGameLevel1 = false;
            } else if (controls.instructions){
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.INSTRUCTION_STATE; // call next stage
                stateChanged = true;
                controls.instructions = false;
            }

            stage.update();
        }
    }
} 
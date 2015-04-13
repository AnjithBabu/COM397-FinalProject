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
/// <reference path="../objects/enemy.ts" />
/// <reference path="../objects/enemyfire.ts" />
/// <reference path="../objects/fire.ts" />
/// <reference path="../objects/spaceship.ts" />
/// <reference path="../objects/coin.ts" />
/// <reference path="../objects/package.ts" />
var states;
(function (states) {
    var Menu = (function () {
        function Menu() {
            this.play = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            var background = new createjs.Bitmap("assets/images/gamescreens/menu-background.png");
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
        Menu.prototype.assignControls = function () {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        };
        Menu.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
                case keys.lowerI:
                case keys.upperI:
                    controls.instructions = true;
            }
        };
        Menu.prototype.update = function () {
            if (controls.playGameLevel1) {
                createjs.Sound.removeSound("assets/sounds/game.mp3", ""); // remove sound on state change
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.PLAY_STATE_LEVEL_1;
                stateChanged = true;
                controls.playGameLevel1 = false;
            }
            else if (controls.instructions) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.INSTRUCTION_STATE;
                stateChanged = true;
                controls.instructions = false;
            }
            stage.update();
        };
        return Menu;
    })();
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=gamemenu.js.map
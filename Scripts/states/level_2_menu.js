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
    var LevleTwoMenu = (function () {
        function LevleTwoMenu() {
            this.play = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            var background = new createjs.Bitmap("assets/images/gamescreens/level1.png");
            background.x = 0;
            background.y = 220;
            this.game.addChild(background);
            stage.addChild(this.game);
            this.assignControls();
        }
        LevleTwoMenu.prototype.assignControls = function () {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        };
        LevleTwoMenu.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
                case keys.lowerI:
                case keys.upperI:
                    controls.instructions = true;
            }
        };
        LevleTwoMenu.prototype.update = function () {
            if (controls.playGameLevel1) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = config.PLAY_STATE_LEVEL_2;
                stateChanged = true;
                controls.playGameLevel1 = false;
            }
            else if (controls.instructions) {
                controls.instructions = false;
            }
            stage.update();
        };
        return LevleTwoMenu;
    })();
    states.LevleTwoMenu = LevleTwoMenu;
})(states || (states = {}));
//# sourceMappingURL=level_2_menu.js.map
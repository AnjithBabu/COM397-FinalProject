/// <reference path="platform.ts" />
/// <reference path="enemyfire.ts" />
/// <reference path="spaceship.ts" />
/// <reference path="package.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Fire CLASS
    var MotherShip = (function (_super) {
        __extends(MotherShip, _super);
        // CONSTRUCTOR
        function MotherShip(path, level) {
            _super.call(this, path);
            this.reachedBounds = false;
            this.moveleft = true;
            this.levelTwo = false;
            this.gotHit = 0;
            this.levelTwo = level;
            this.x = 800 - this.getBounds().width;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        MotherShip.prototype.update = function () {
            if (this.moveleft) {
                this.x -= 5;
            }
            else {
                this.x += 5;
            }
            this._checkBounds();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        MotherShip.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.x <= (0)) {
                this.moveleft = false;
            }
            else if (this.x >= 1000 - this.getBounds().width) {
                this.moveleft = true;
            }
        };
        MotherShip.prototype.createEnemyFireBall = function () {
            var fire = 0;
            var lavaBall = 0;
            var gift = 0;
            switch (this.x) {
                case 100:
                case 102:
                case 104:
                    fire = 1;
                    break;
                case 300:
                    gift = 1;
                    break;
                case 330:
                    lavaBall = 1;
                    break;
                case 450:
                    fire = 1;
                    break;
                case 560:
                    gift = 1;
                    break;
                case 570:
                case 573:
                    lavaBall = 1;
                    break;
                case 675:
                    gift = 1;
                    break;
            }
            if (fire == 1) {
                this.enemyFire = new objects.EnemyFire(this.x, this.y, "assets/images/heroEnemy.png", 1);
                createjs.Sound.play("enemyfire");
                fire = 0;
                return this.enemyFire;
            }
            if (lavaBall == 1 && this.levelTwo) {
                this.enemyFire = new objects.EnemyFire(this.x, this.y, "assets/images/lava.png", 2);
                createjs.Sound.play("enemyfire");
                fire = 0;
                return this.enemyFire;
            }
            return null;
        };
        MotherShip.prototype.releaseMinions = function () {
            if (this.gotHit > 3) {
                this.minionship = new objects.SpaceShip("assets/images/spaceshipblack.png", true);
                stage.addChild(this.minionship);
            }
        };
        MotherShip.prototype.createGift = function () {
            var gift = 0;
            var packageList = ["green", "red", "blue"];
            var randNum;
            switch (this.x) {
                case 320:
                    gift = 1;
                    break;
                case 550:
                    gift = 1;
                    break;
            }
            if (gift == 1) {
                randNum = this.getRandomInt(0, 2);
                this.bonusPackage = new objects.Package(this.x, this.y, "assets/images/package/" + packageList[randNum] + ".png", randNum);
                createjs.Sound.play("package");
                gift = 0;
                return this.bonusPackage;
            }
            return null;
        };
        /**
        * Returns a random integer between min (inclusive) and max (inclusive)
        * Using Math.round() will give you a non-uniform distribution!
        */
        MotherShip.prototype.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return MotherShip;
    })(createjs.Bitmap);
    objects.MotherShip = MotherShip;
})(objects || (objects = {}));
//# sourceMappingURL=mothership.js.map
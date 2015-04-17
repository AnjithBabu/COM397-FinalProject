/// <reference path="enemyfire.ts" />
/// <reference path="package.ts" />

module objects {
    // Spaceship CLASS
    export class SpaceShip extends createjs.Bitmap {

        //bitmapImage: createjs.Bitmap;
        public _dy: number;
        public _dx: number;
        public reachedBounds: boolean = false;
        moveleft: boolean = true;
        enemyFire: objects.EnemyFire;
        bonusPackage: objects.Package;
        levelTwo: boolean = false;
        height: number;
        

        // CONSTRUCTOR
        constructor(path, level) {
            super(path);
            this.levelTwo = level;
            this.x = 750;
            this.height = 97;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            if (this.moveleft) {
                this.x -= 5;
            } else {
                this.x += 5;
            }
            this._checkBounds();
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if ship has left the side of the screen
            if (this.x <= (0)) {
                this.moveleft = false;
            } else if (this.x >= 900){
                this.moveleft = true;
            }
        }

         // method to generate fire at specific points
        public createEnemyFireBall() {
            var fire = 0;
            var lavaBall = 0;
            var gift = 0;

            switch (this.x) {
                case 100 :
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
                    lavaBall = 1;
                    break;
                case 675:
                    gift = 1;
                    break;
            }
              // creates enemy fireballs 

            if (fire == 1) {
                this.enemyFire = new objects.EnemyFire(this.x, this.y + 56, "assets/images/heroEnemy.png", 1);
                createjs.Sound.play("enemyfire");
                fire = 0;
                return this.enemyFire;
            } 

            if (lavaBall == 1 && this.levelTwo) {
                this.enemyFire = new objects.EnemyFire(this.x, this.y + 56, "assets/images/lava.png", 2);
                createjs.Sound.play("enemyfire");
                fire = 0;
                return this.enemyFire;
            }

            return null;
        }

       // creates and release random gift packages
        public createGift() {
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
                randNum = this.getRandomInt(0, 2)
                this.bonusPackage = new objects.Package(this.x, this.y + 70,
                    "assets/images/package/" + packageList[randNum] + ".png", randNum);
                createjs.Sound.play("package");
                gift = 0;
                return this.bonusPackage;
            }

            return null;
        }


        /**
        * Returns a random integer between min (inclusive) and max (inclusive)
        * Using Math.round() will give you a non-uniform distribution!
        */
        private getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

}  
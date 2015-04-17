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

    export class GamePlayLevelThree {
        
        // Game Objects 
        game: createjs.Container;
        hero: objects.Hero;
        fireballs: objects.Fire[] = [];
        enemyFireBalls: objects.EnemyFire[] = [];
        bonusFirePackages: objects.Package[] = [];
        fireballObj: objects.Fire;
        enemy: objects.SpaceShip;
        enemyFireBall: objects.EnemyFire;
        bonusFirePackage: objects.Package
        scoreboard: objects.Scoreboard;
        
        // Game Variables
        ground: objects.Platform;
        fireballCount: number;
        enemyFireBallCount: number;
        bonusPackageCount: number;


        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            this.ground = new objects.Platform(9, 20, 46, 1);
            this.game.addChild(this.ground.view);

            var leftWall = new objects.Platform(0, 0, 1, 40);
            this.game.addChild(leftWall.view);

            var rightWall = new objects.Platform(33.2, 0, 1, 40);
            this.game.addChild(rightWall.view);

            var background = new createjs.Bitmap("assets/images/background.png")
            background.x = 0;
            background.y = 250;
            this.game.addChild(background);

            var cloud1 = new createjs.Bitmap("assets/images/cloud.png")
            cloud1.x = 40;
            cloud1.y = 70;
            this.game.addChild(cloud1);

            var cloud2 = new createjs.Bitmap("assets/images/cloud.png")
            cloud2.x = 500;
            cloud2.y = 100;
            this.game.addChild(cloud2);


            var cow1 = new createjs.Bitmap("assets/images/cow.png")
            cow1.x = 20;
            cow1.y = 400;
            this.game.addChild(cow1);

            var cow2 = new createjs.Bitmap("assets/images/cow.png")
            cow2.x = 500;
            cow2.y = 360;
            this.game.addChild(cow2);
            var cow3 = new createjs.Bitmap("assets/images/cow.png")
            cow3.x = 640;
            cow3.y = 390;
            this.game.addChild(cow3);

            this.hero = new objects.Hero();
            this.game.addChild(this.hero.view);

            var grass = new createjs.Bitmap("assets/images/grass.png")
            grass.x = 0;
            grass.y = 500;
            this.game.addChild(grass);

            this.scoreboard = new objects.Scoreboard();

            this.enemy = new objects.SpaceShip("assets/images/mothership.png", true);
            this.game.addChild(this.enemy);

            stage.addChild(this.game);

            // credit hero some lives for reaching level three
            config.HERO_LIVES += 5;
            this.scoreboard.update();
        }

        update() {
            this.hero.update();
            this.enemy.update();

            // creating  fireballs
            this.fireballObj = this.hero.createFireBall();
            this.enemyFireBall = this.enemy.createEnemyFireBall();
            this.bonusFirePackage = this.enemy.createGift();
            this.fireballCount = this.fireballs.length;
            this.enemyFireBallCount = this.enemyFireBalls.length;
            this.bonusPackageCount = this.bonusFirePackages.length;


            if (this.fireballObj != null) {
                this.fireballs.push(this.fireballObj);
                stage.addChild(this.fireballObj);
            }

            if (this.enemyFireBall != null) {
                this.enemyFireBalls.push(this.enemyFireBall);
                stage.addChild(this.enemyFireBall);
            }

            if (this.bonusFirePackage != null) {
                this.bonusFirePackages.push(this.bonusFirePackage);
                stage.addChild(this.bonusFirePackage);
            }

            // check fireball hit or reached end of the screen

            if (this.fireballs.length > 0) {

                for (var countValue = this.fireballCount - 1; countValue >= 0; countValue--) {
                    this.fireballs[countValue].update();

                    if (this.fireballs[countValue].reachedBounds) {
                        stage.removeChild(this.fireballs[countValue]);
                        this.fireballs.splice(countValue, 1);
                    } else {
                        this.checkCollisionEnemy(this.fireballs[countValue], countValue, this.fireballs);
                    }
                }
            }

            if (this.enemyFireBalls.length > 0) {

                for (var countValue = this.enemyFireBallCount - 1; countValue >= 0; countValue--) {
                    this.enemyFireBalls[countValue].update();

                    if (this.enemyFireBalls[countValue].reachedBounds) {
                        stage.removeChild(this.enemyFireBalls[countValue]);
                        this.enemyFireBalls.splice(countValue, 1);
                    } else {
                        this.checkCollision(this.enemyFireBalls[countValue], countValue, this.enemyFireBalls);
                    }
                }
            }

            if (this.bonusFirePackages.length > 0) {

                for (var countValue = this.bonusPackageCount - 1; countValue >= 0; countValue--) {
                    this.bonusFirePackages[countValue].update();

                    if (this.bonusFirePackages[countValue].reachedBounds) {
                        stage.removeChild(this.bonusFirePackages[countValue]);
                        this.bonusFirePackages.splice(countValue, 1);
                    } else {
                        this.checkCollisionPackage(this.bonusFirePackages[countValue], countValue, this.bonusFirePackages);
                    }
                }
            }
            if (config.HERO_LIVES <= 0) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                stage.removeAllChildren();
                currentState = config.GAME_OVER_STATE;
                stateChanged = true;
                this.scoreboard.destroy();
            }

            stage.update();

        }

        // DISTANCE CHECKING METHOD
        distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHODS FOR ENEMY FIREBALL AND HERO FIREBALLS
        checkCollision(fireObj: objects.EnemyFire, countValue: number, fireballs: objects.EnemyFire[]) {
            var planePosition: createjs.Point = this.hero.getHeroPosition();
            var objectPosition: createjs.Point = new createjs.Point(fireObj.x, fireObj.y);
            var theDistance = this.distance(planePosition, objectPosition);

            if (theDistance < ((this.hero.height * 0.5) + (fireObj.height * 0.5))) {
                this.hero.heroGotHit();
                if (this.enemyFireBalls[countValue].bitmapId == 2) {
                    config.HERO_LIVES -= 2;
                } else {
                    config.HERO_LIVES--;
                }
                this.scoreboard.update();
                stage.removeChild(this.enemyFireBalls[countValue]);
                this.enemyFireBalls.splice(countValue, 1);
            } else {

            }
        } // c

        checkCollisionEnemy(enemyFireObj: objects.Fire, countValue: number, fireballs: objects.Fire[]) {
            var planePosition: createjs.Point = new createjs.Point(this.enemy.x, this.enemy.y);
            var objectPosition: createjs.Point = new createjs.Point(enemyFireObj.x, enemyFireObj.y);
            var theDistance = this.distance(planePosition, objectPosition);

            if (theDistance < ((170 * 0.5) + (enemyFireObj.height * 0.5))) {
                stage.removeChild(fireballs[countValue]);
                fireballs.splice(countValue, 1);
            } else {

            }
        } // c

        checkCollisionPackage(packageObj: objects.Package, countValue: number, packages: objects.Package[]) {
            var planePosition: createjs.Point = this.hero.getHeroPosition();
            var objectPosition: createjs.Point = new createjs.Point(packageObj.x, packageObj.y);
            var theDistance = this.distance(planePosition, objectPosition);

            if (theDistance < ((this.hero.height * 0.5) + (packageObj.height * 0.5))) {
                this.hero.heroGotPoint();
                //scoring system 
                config.score += (packages[countValue].bitmapId + 1) * 100;
                this.scoreboard.update();
                //
                stage.removeChild(packages[countValue]);
                packages.splice(countValue, 1);
            } else {

            }
        } // 
    }
} 
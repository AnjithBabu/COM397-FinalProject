/// <reference path="box2d.ts" />
/// <reference path="config.ts" />
/// <reference path="keys.ts" />
/// <reference path="controls.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/reality.ts" />
/// <reference path="objects/platform.ts" />
/// <reference path="objects/hero.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/enemyfire.ts" />
/// <reference path="objects/fire.ts" />
/// <reference path="objects/spaceship.ts" />
/// <reference path="objects/coin.ts" />
/// <reference path="objects/package.ts" />

// Game Variables
var arcadeCanvas;
var debugCanvas;
var stats: Stats;
var stage: createjs.Stage;
var ground: objects.Platform;
var fireballCount: number;
var enemyFireBallCount: number;
var bonusPackageCount: number;


// Physics Variables
var world: Box2D.Dynamics.b2World;
var reality: objects.Reality;

// Game Objects
var hero: objects.Hero;
var coin: objects.Coin;
var scoreboard: objects.Scoreboard;
var fireballs: objects.Fire[] = [];
var enemyFireBalls: objects.EnemyFire[] = [];
var bonusFirePackages: objects.Package[] = [];
var fireballObj: objects.Fire;
var enemy: objects.SpaceShip;
var enemyFireBall: objects.EnemyFire;
var bonusFirePackage: objects.Package

function preload(): void {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

function init(): void {
    // Setup box2d reality
    reality = new objects.Reality();
    stage = new createjs.Stage(arcadeCanvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    fireballCount = 0;
    setupStats();
    gameStart();
}

function gameLoop(event): void {
     // Start counting for FPS stats
    if (config.SHOW_FPS) {
        this.stats.begin();
    } 
    hero.update();
    enemy.update();

    fireballObj = hero.createFireBall();
    enemyFireBall = enemy.createEnemyFireBall();
    bonusFirePackage = enemy.createGift();
    fireballCount = fireballs.length;
    enemyFireBallCount = enemyFireBalls.length;
    bonusPackageCount = bonusFirePackages.length;


    if (fireballObj != null) {
        fireballs.push(fireballObj);
        stage.addChild(fireballObj);
    }

    if (enemyFireBall != null) {
        enemyFireBalls.push(enemyFireBall);
        stage.addChild(enemyFireBall);
    }

    if (bonusFirePackage != null) {
        bonusFirePackages.push(bonusFirePackage);
        stage.addChild(bonusFirePackage);
    }

    if (fireballs.length > 0) {

        for (var countValue = fireballCount-1; countValue >= 0; countValue--) {
            fireballs[countValue].update();

            if (fireballs[countValue].reachedBounds) {
                stage.removeChild(fireballs[countValue]);
                fireballs.splice(countValue, 1);
            } else {
                checkCollisionEnemy(fireballs[countValue], countValue, fireballs);
            }
        }
    }

    if (enemyFireBalls.length > 0) {
 
        for (var countValue = enemyFireBallCount - 1; countValue >= 0; countValue--) {
            enemyFireBalls[countValue].update();

            if (enemyFireBalls[countValue].reachedBounds) {
                stage.removeChild(enemyFireBalls[countValue]);
                enemyFireBalls.splice(countValue, 1);
            } else {
                checkCollision(enemyFireBalls[countValue], countValue, enemyFireBalls);
            }
        }
    }

    if (bonusFirePackages.length > 0) {

        for (var countValue = bonusPackageCount - 1; countValue >= 0; countValue--) {
            bonusFirePackages[countValue].update();

            if (bonusFirePackages[countValue].reachedBounds) {
                stage.removeChild(bonusFirePackages[countValue]);
                bonusFirePackages.splice(countValue, 1);
            } else {
                checkCollisionPackage(bonusFirePackages[countValue], countValue, bonusFirePackages);
            }
        }
    }
    
  //  scoreboard.update();

    stage.update();

    reality.update();

    // End counting for FPS stats
    if (config.SHOW_FPS) {
        return this.stats.end();
    } 
}

// DISTANCE CHECKING METHOD
    function distance(p1: createjs.Point, p2: createjs.Point): number {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
    } //Distance Method

    //    // CHECK COLLISION METHOD
    function checkCollision(fireObj: objects.EnemyFire, countValue: number, fireballs: objects.EnemyFire[]) {
            var planePosition: createjs.Point = hero.getHeroPosition();
            var objectPosition: createjs.Point = new createjs.Point(fireObj.x, fireObj.y);
            var theDistance = distance(planePosition, objectPosition);

            if (theDistance < ((hero.height * 0.5) + (fireObj.height * 0.5))) {
                hero.heroGotHit();
                stage.removeChild(enemyFireBalls[countValue]);
                enemyFireBalls.splice(countValue, 1);
            } else {
                
            }
    } // c

    function checkCollisionEnemy(enemyFireObj: objects.Fire, countValue: number, fireballs: objects.Fire[]) {
        var planePosition: createjs.Point = new createjs.Point(enemy.x, enemy.y);
        var objectPosition: createjs.Point = new createjs.Point(enemyFireObj.x, enemyFireObj.y);
        var theDistance = distance(planePosition, objectPosition);

        if (theDistance < ((enemy.getBounds().height * 0.5) + (enemyFireObj.height * 0.5))) {
           // hero.heroGotHit();
            stage.removeChild(fireballs[countValue]);
            fireballs.splice(countValue, 1);
        } else {

        }
    } // c

    function checkCollisionPackage(packageObj: objects.Package, countValue: number, packages: objects.Package[]) {
        var planePosition: createjs.Point = hero.getHeroPosition();
        var objectPosition: createjs.Point = new createjs.Point(packageObj.x, packageObj.y);
        var theDistance = distance(planePosition, objectPosition);

        if (theDistance < ((hero.height * 0.5) + (packageObj.height * 0.5))) {
            hero.heroGotPoint();
            //scoring system 
            //score = (packages[countValue].bitmapId+1) * 100;
            //
            stage.removeChild(packages[countValue]);
            packages.splice(countValue, 1);
        } else {

        }
    } // 

function setupStats() {
    // Uses stats.js
    stats = new Stats();
    stats.setMode(0)
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function gameStart(): void {

    ground = new objects.Platform(9, 20, 46, 1);
    stage.addChild(ground.view);

    var leftWall = new objects.Platform(0, 0, 1, 40);
    stage.addChild(leftWall.view);

    var rightWall = new objects.Platform(33.2, 0, 1, 40);
    stage.addChild(rightWall.view);

    var background = new createjs.Bitmap("assets/images/background.png")
    background.x = 0;
    background.y = 250;
    stage.addChild(background);

    var cloud1 = new createjs.Bitmap("assets/images/cloud.png")
    cloud1.x = 40;
    cloud1.y = 70;
    stage.addChild(cloud1);

    var cloud2 = new createjs.Bitmap("assets/images/cloud.png")
    cloud2.x = 500;
    cloud2.y = 100;
    stage.addChild(cloud2);


    var cow1 = new createjs.Bitmap("assets/images/cow.png")
    cow1.x = 20;
    cow1.y = 400;
    stage.addChild(cow1);

    var cow2 = new createjs.Bitmap("assets/images/cow.png")
    cow2.x = 500;
    cow2.y = 360;
    stage.addChild(cow2);
    var cow3 = new createjs.Bitmap("assets/images/cow.png")
    cow3.x = 640;
    cow3.y = 390;
    stage.addChild(cow3);

    

   // var platform1 = new objects.Platform(8, 16, 5, 1);
   // stage.addChild(platform1.view);

   // var platform2 = new objects.Platform(11, 12, 5, 1);
   // stage.addChild(platform2.view);

    //var platform3 = new objects.Platform(14, 8, 5, 1);
   // stage.addChild(platform3.view);

    //var platform4 = new objects.Platform(22, 5, 9, 1);
    //stage.addChild(platform4.view);

    hero = new objects.Hero();
    stage.addChild(hero.view);

    var grass = new createjs.Bitmap("assets/images/grass.png")
    grass.x = 0;
    grass.y = 500;
    stage.addChild(grass);



    enemy = new objects.SpaceShip();
    stage.addChild(enemy);




  //  scoreboard = new objects.Scoreboard();


    var fixDef = new box2d.b2FixtureDef;
    fixDef.density = 0.5;
    fixDef.friction = 0.2;
    fixDef.restitution = 0.5;

    var bodyDef = new box2d.b2BodyDef;
    var fixDefShape;

    //create some objects
/*    bodyDef.type = box2d.b2Body.b2_dynamicBody;
    for (var i = 0; i < 10; ++i) {
        if (Math.random() > 0.5) {
            fixDefShape = new box2d.b2PolygonShape();
            fixDefShape.SetAsBox(
                Math.random() + 0.1 //half width
                , Math.random() + 0.1 //half height
                );
            fixDef.shape = fixDefShape;
        } else {
            fixDefShape = new box2d.b2CircleShape(
                Math.random() + 0.1 //radius
                );
            fixDef.shape = fixDefShape;
        }
        bodyDef.position.x = Math.random() * stage.canvas.width / config.SCALE;
        bodyDef.position.y = Math.random() * stage.canvas.height / config.SCALE;
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    } */

}
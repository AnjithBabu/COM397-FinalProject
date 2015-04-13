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
/// <reference path="objects/package.ts" />
/// <reference path="objects/enemyfire.ts" />
/// <reference path="objects/fire.ts" />
/// <reference path="objects/spaceship.ts" />
/// <reference path="objects/coin.ts" />
/// <reference path="states/gamemenu.ts" />
/// <reference path="states/instructions.ts" />
/// <reference path="states/gameplay_lvl_3.ts" />
/// <reference path="states/gameplay_lvl_2.ts" />
/// <reference path="states/gameplay_lvl_1.ts" />
/// <reference path="states/level_2_menu.ts" />
/// <reference path="states/level_3_menu.ts" />
/// <reference path="states/gameover.ts" />


// Game Variables
var arcadeCanvas;
var debugCanvas;
var stats: Stats;
var stage: createjs.Stage;
var gameplayLvlOne: states.GamePlayLevelOne;
var gameplayLvlTwo: states.GamePlayLevelTwo;
var gameplayLvlThree: states.GamePlayLevelThree;
var menu: states.Menu;
var instructions: states.GameInstructions;
var menuTwo: states.LevleTwoMenu;
var menuThree: states.LevelThreeMenu;
var gameover: states.GameOver;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

// Physics Variables
var world: Box2D.Dynamics.b2World;
var reality: objects.Reality;


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
    setupStats();
    gameStart();
    currentState = config.MENU_STATE;
    changeState(currentState);   
}

function gameLoop(event): void {
     // Start counting for FPS stats
    if (config.SHOW_FPS) {
        this.stats.begin();
    } 

    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }


     reality.update();

    // End counting for FPS stats
    if (config.SHOW_FPS) {
        return this.stats.end();
    } 
}

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

    //var playButton = new objects.Button(50, 300, "assets/images/offbtn.png");
    //playButton.addEventListener("click", this.playClicked);
    //stage.addChild(playButton);

    var fixDef = new box2d.b2FixtureDef;
    fixDef.density = 0.5;
    fixDef.friction = 0.2;
    fixDef.restitution = 0.5;

    var bodyDef = new box2d.b2BodyDef;
    var fixDefShape;
}

function changeState(state: number): void {

    

    // Launch Various "screens"
    switch (state) {
        case config.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;

        case config.PLAY_STATE_LEVEL_1:
            // instantiate game play screen
            gameplayLvlOne = new states.GamePlayLevelOne();
            currentStateFunction = gameplayLvlOne;
            break;

        case config.PLAY_STATE_LEVEL_2:
            // instantiate game play screen
            gameplayLvlTwo = new states.GamePlayLevelTwo();
            currentStateFunction = gameplayLvlTwo;
            break;

        case config.PLAY_STATE_LEVEL_3:
            // instantiate game play screen
            gameplayLvlThree = new states.GamePlayLevelThree();
            currentStateFunction = gameplayLvlThree;
            break;
        case config.INSTRUCTION_STATE:
            // instantiate game play screen
            instructions = new states.GameInstructions;
            currentStateFunction = instructions;
            break;
        case config.MENU_STATE_2:
            // instantiate game play screen
            menuTwo = new states.LevleTwoMenu();
            currentStateFunction = menuTwo;
            break;

        case config.MENU_STATE_3:
            // instantiate game play screen
            menuThree = new states.LevelThreeMenu();
            currentStateFunction = menuThree;
            break;

        case config.GAME_OVER_STATE:
            // instantiate game over screen
            gameover = new states.GameOver();
            currentStateFunction = gameover;
            break;
    }
}
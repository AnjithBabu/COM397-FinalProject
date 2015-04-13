module config {
    // Canvases
    export var ARCADE_CANVAS = document.getElementById("arcade");
    export var DEBUG_CANVAS = document.getElementById("debug");

    // Some sizes used throughout
    export var WIDTH: number = 800;
    export var HEIGHT: number = 600;
    export var SCALE: number = 30;
    

    // Used for stats
    export var SHOW_FPS: boolean = true;

    // Hero Constants
    export var HERO_LIVES: number = 5;
    export var score: number = 0;

    // Game state constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE_LEVEL_1: number = 1;
    export var PLAY_STATE_LEVEL_2: number = 2;
    export var PLAY_STATE_LEVEL_3: number = 3;
    export var INSTRUCTION_STATE: number = 4
    export var MENU_STATE_2: number = 5;
    export var MENU_STATE_3: number = 6;
    export var GAME_OVER_STATE: number = 7;
} 
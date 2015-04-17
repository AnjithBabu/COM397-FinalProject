// configuraion file for the game
var config;
(function (config) {
    // Canvases
    config.ARCADE_CANVAS = document.getElementById("arcade");
    config.DEBUG_CANVAS = document.getElementById("debug");
    // Some sizes used throughout
    config.WIDTH = 800;
    config.HEIGHT = 600;
    config.SCALE = 30;
    // Used for stats
    config.SHOW_FPS = true;
    // Hero Constants
    config.HERO_LIVES = 5;
    config.score = 0;
    // Game state constants
    config.MENU_STATE = 0;
    config.PLAY_STATE_LEVEL_1 = 1;
    config.PLAY_STATE_LEVEL_2 = 2;
    config.PLAY_STATE_LEVEL_3 = 3;
    config.INSTRUCTION_STATE = 4;
    config.MENU_STATE_2 = 5;
    config.MENU_STATE_3 = 6;
    config.GAME_OVER_STATE = 7;
})(config || (config = {}));
//# sourceMappingURL=config.js.map
var managers;
(function (managers) {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "loading", src: "assets/images/loading.jpg" },
        { id: "cow", src: "assets/images/cow.png" },
        { id: "grass", src: "assets/images/grass.png" },
        { id: "pickup", src: "assets/sounds/coin.mp3" },
        { id: "hurt", src: "assets/sounds/hurt.mp3" },
        { id: "enemyfire", src: "assets/sounds/enemyfire.mp3" },
        { id: "herofire", src: "assets/sounds/herofire.mp3" },
        { id: "package", src: "assets/sounds/package.mp3" },
        { id: "jump", src: "assets/sounds/jump.mp3" }
    ];
    var heroData = {
        "images": ["assets/images/hero/heroAtlas.png"],
        "frames": [
            [2, 154, 60, 85],
            [126, 126, 60, 85],
            [177, 2, 69, 60],
            [177, 64, 69, 60],
            [103, 2, 72, 62],
            [2, 64, 60, 88],
            [64, 156, 60, 81],
            [188, 126, 60, 81],
            [188, 209, 60, 80],
            [126, 213, 60, 80],
            [64, 239, 60, 80],
            [2, 241, 60, 80],
            [2, 2, 99, 60],
            [64, 66, 60, 88]
        ],
        "animations": {
            "heroIdle": {
                frames: [6, 7],
                speed: 0.5,
            },
            "heroJump": {
                frames: [13, 5],
                speed: 0.2,
            },
            "heroWalk": {
                frames: [8, 9, 10, 11],
                speed: 0.5,
            },
            "heroDizzy": {
                frames: [0, 1],
                speed: 0.5,
            }
        }
    };
    // BitMap Font SpriteSheet Data object
    var bitMapFontData = {
        "images": ["assets/fonts/fontAtlas.png"],
        "frames": [
            [2, 169, 83, 82],
            [768, 166, 32, 81],
            [218, 168, 60, 83],
            [585, 87, 61, 82],
            [307, 85, 68, 81],
            [651, 166, 57, 82],
            [154, 169, 62, 82],
            [525, 170, 58, 81],
            [87, 169, 65, 82],
            [337, 170, 62, 81],
            [275, 2, 82, 81],
            [518, 87, 65, 81],
            [523, 2, 75, 83],
            [600, 2, 75, 80],
            [401, 170, 61, 81],
            [464, 170, 59, 81],
            [2, 84, 83, 83],
            [234, 86, 71, 80],
            [802, 166, 26, 80],
            [713, 84, 61, 80],
            [87, 86, 71, 81],
            [776, 84, 52, 80],
            [442, 2, 79, 80],
            [377, 84, 70, 80],
            [191, 2, 82, 82],
            [648, 84, 63, 80],
            [106, 2, 83, 82],
            [585, 171, 64, 80],
            [280, 168, 55, 83],
            [710, 166, 56, 80],
            [449, 84, 67, 80],
            [359, 2, 81, 80],
            [2, 2, 102, 80],
            [677, 2, 75, 80],
            [754, 2, 73, 80],
            [160, 86, 72, 80]
        ],
        "animations": {
            "0": [0],
            "1": [1],
            "2": [2],
            "3": [3],
            "4": [4],
            "5": [5],
            "6": [6],
            "7": [7],
            "8": [8],
            "9": [9],
            "a": [10],
            "b": [11],
            "c": [12],
            "d": [13],
            "e": [14],
            "f": [15],
            "g": [16],
            "h": [17],
            "i": [18],
            "j": [19],
            "k": [20],
            "l": [21],
            "m": [22],
            "n": [23],
            "o": [24],
            "p": [25],
            "q": [26],
            "r": [27],
            "s": [28],
            "t": [29],
            "u": [30],
            "v": [31],
            "w": [32],
            "x": [33],
            "y": [34],
            "z": [35]
        }
    };
    // Asset Manager Class
    var Assets = (function () {
        function Assets() {
        }
        Assets.init = function () {
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.alternateExtensions = ["mp3"];
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            this.heroAtlas = new createjs.SpriteSheet(heroData);
            this.bitMapFont = new createjs.SpriteSheet(bitMapFontData);
        };
        return Assets;
    })();
    managers.Assets = Assets;
})(managers || (managers = {}));
//# sourceMappingURL=asset.js.map
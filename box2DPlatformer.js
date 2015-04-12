// Alias Module for Box2D Classes
var box2d;
(function (box2d) {
    box2d.b2Vec2 = Box2D.Common.Math.b2Vec2;
    box2d.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    box2d.b2Body = Box2D.Dynamics.b2Body;
    box2d.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    box2d.b2Fixture = Box2D.Dynamics.b2Fixture;
    box2d.b2World = Box2D.Dynamics.b2World;
    box2d.b2MassData = Box2D.Collision.Shapes.b2MassData;
    box2d.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    box2d.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    box2d.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
})(box2d || (box2d = {}));
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
    config.HERO_LIVES = 3;
})(config || (config = {}));
/// <reference path="config.ts" />
/// <reference path="box2d.ts" />
var controls;
(function (controls) {
    controls.jumping = false;
    controls.left = false;
    controls.right = false;
    controls.rTally = 0;
    controls.lTally = 0;
})(controls || (controls = {}));
var keys;
(function (keys) {
    // Keyboard values
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.SPACEBAR = 32;
    keys.UP = 38;
    keys.A = 65;
    keys.D = 68;
    keys.W = 87;
})(keys || (keys = {}));
var managers;
(function (managers) {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "loading", src: "assets/images/loading.jpg" },
        { id: "pickup", src: "assets/sounds/coin.mp3" },
        { id: "hurt", src: "assets/sounds/hurt.mp3" },
        { id: "jump", src: "assets/sounds/jump.mp3" }
    ];

    var heroData = {
        "images": ["assets/images/hero/heroAtlas.png"],
        "frames": [
            [178, 2, 67, 65],
            [178, 69, 67, 65],
            [178, 136, 67, 65],
            [178, 203, 67, 65],
            [178, 270, 67, 65],
            [178, 337, 67, 65],
            [178, 404, 67, 65],
            [2, 938, 67, 65],
            [90, 464, 67, 65],
            [78, 531, 67, 65],
            [78, 598, 67, 65],
            [78, 665, 67, 65],
            [78, 732, 67, 65],
            [78, 799, 67, 65],
            [78, 866, 67, 65],
            [159, 471, 67, 65],
            [147, 538, 67, 65],
            [147, 605, 67, 65],
            [147, 672, 67, 65],
            [147, 739, 67, 65],
            [147, 806, 67, 65],
            [147, 873, 67, 65],
            [71, 940, 67, 65],
            [140, 940, 67, 65],
            [2, 530, 74, 66],
            [2, 598, 74, 66],
            [2, 666, 74, 66],
            [2, 734, 74, 66],
            [2, 802, 74, 66],
            [2, 870, 74, 66],
            [2, 2, 86, 64],
            [2, 68, 86, 64],
            [90, 2, 86, 64],
            [90, 68, 86, 64],
            [2, 134, 86, 64],
            [90, 134, 86, 64],
            [2, 200, 86, 64],
            [90, 200, 86, 64],
            [2, 266, 86, 64],
            [90, 266, 86, 64],
            [2, 332, 86, 64],
            [90, 332, 86, 64],
            [2, 398, 86, 64],
            [90, 398, 86, 64],
            [2, 464, 86, 64]
        ],
        "animations": {
            "heroIdle": {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                speed: 0.5
            },
            "heroJump": {
                frames: [24, 25, 26, 27, 28, 29],
                speed: 0.2
            },
            "heroWalk": {
                frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                speed: 0.5
            }
        }
    };

    var enemyData = {
        "images": ["assets/images/enemy/enemyAtlas.png"],
        "frames": [
            [162, 564, 60, 119],
            [2, 2, 81, 145],
            [85, 2, 81, 145],
            [168, 2, 81, 145],
            [2, 149, 81, 145],
            [85, 149, 81, 145],
            [168, 149, 81, 145],
            [2, 296, 78, 132],
            [82, 296, 78, 132],
            [82, 296, 78, 132],
            [162, 296, 78, 132],
            [2, 430, 78, 132],
            [2, 430, 78, 132],
            [2, 564, 78, 132],
            [82, 430, 78, 132],
            [82, 430, 78, 132],
            [82, 564, 78, 132],
            [162, 430, 78, 132],
            [162, 430, 78, 132]
        ],
        "animations": {
            "enemyIdle": {
                frames: [0],
                speed: 0.5
            },
            "enemyJump": {
                frames: [1, 6],
                speed: 0.5
            },
            "enemyWalk": {
                frames: [7, 18],
                speed: 0.5
            }
        }
    };

    var coinData = {
        "images": ["assets/images/coin/coinAtlas.png"],
        "frames": [
            [2, 2, 44, 40],
            [48, 2, 44, 40],
            [94, 2, 44, 40],
            [140, 2, 44, 40],
            [186, 2, 44, 40],
            [232, 2, 44, 40],
            [278, 2, 44, 40],
            [324, 2, 44, 40],
            [370, 2, 44, 40],
            [416, 2, 44, 40]
        ],
        "animations": {
            "coin": {
                frames: [0, 9],
                speed: 0.5
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
            this.enemyAtlas = new createjs.SpriteSheet(enemyData);
            this.coinAtlas = new createjs.SpriteSheet(coinData);
            this.bitMapFont = new createjs.SpriteSheet(bitMapFontData);
        };
        return Assets;
    })();
    managers.Assets = Assets;
})(managers || (managers = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(x, y, labelText) {
            _super.call(this, labelText, managers.Assets.bitMapFont);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
        }
        // Utility Method to change the default font size
        Label.prototype.fontSize = function (size) {
            var scale = size / this.getBounds().height;

            this.scaleX = scale;
            this.scaleY = scale;
        };
        return Label;
    })(createjs.BitmapText);
    objects.Label = Label;
})(objects || (objects = {}));
/// <reference path="label.ts" />
var objects;
(function (objects) {
    // Scoreboard Class
    var Scoreboard = (function () {
        function Scoreboard() {
            this.livesValueLabelString = "";
            this.scoreValueLabelString = "";
            this.lives = config.HERO_LIVES;
            this.score = 0;

            this.livesLabel = new objects.Label(stage.canvas.width * 0.10, 0, "lives");
            this.livesLabel.regX = 0;
            this.livesLabel.regY = 0;
            this.livesLabel.fontSize(40);

            this.livesValueLabel = new objects.Label(stage.canvas.width * 0.10, 40, this.lives.toString());
            this.livesValueLabel.regX = 0;
            this.livesValueLabel.regY = 0;
            this.livesValueLabel.fontSize(40);

            this.scoreLabel = new objects.Label(stage.canvas.width * 0.60, 0, "score");
            this.scoreLabel.regX = 0;
            this.scoreLabel.regY = 0;
            this.scoreLabel.fontSize(40);

            this.scoreValueLabel = new objects.Label(stage.canvas.width * 0.60, 40, this.score.toString());
            this.scoreValueLabel.regX = 0;
            this.scoreValueLabel.regY = 0;
            this.scoreValueLabel.fontSize(40);

            this.update();

            this.showScoreBoard();
        }
        Scoreboard.prototype.showScoreBoard = function () {
            stage.addChild(this.livesLabel);
            stage.addChild(this.livesValueLabel);
            stage.addChild(this.scoreLabel);
            stage.addChild(this.scoreValueLabel);
        };

        Scoreboard.prototype.update = function () {
            this.livesValueLabelString = this.lives.toString();
            this.livesValueLabel.text = this.livesValueLabelString;

            this.scoreValueLabelString = this.score.toString();
            this.scoreValueLabel.text = this.scoreValueLabelString;
        };

        Scoreboard.prototype.destroy = function () {
            stage.removeChild(this.livesLabel);
            stage.removeChild(this.livesValueLabel);
            stage.removeChild(this.scoreLabel);
            stage.removeChild(this.scoreValueLabel);
        };
        return Scoreboard;
    })();
    objects.Scoreboard = Scoreboard;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Reality = (function () {
        function Reality() {
            this.createPhysics();
            this.createArcadeCanvas();
            this.createDebugCanvas();
            this.createDebugDraw();
        }
        Reality.prototype.createPhysics = function () {
            // Adds gravity to world, no horizontal
            // gravity, but 50 pixel vertical gravity
            this.gravity = new box2d.b2Vec2(0, 50);

            // Creates our Box2D World.CREATION!
            world = new box2d.b2World(this.gravity, true);
        };

        Reality.prototype.createArcadeCanvas = function () {
            arcadeCanvas = config.ARCADE_CANVAS;
        };

        Reality.prototype.createDebugCanvas = function () {
            debugCanvas = config.DEBUG_CANVAS;
            this.debugContext = debugCanvas.getContext("2d"); // set context
        };

        Reality.prototype.createDebugDraw = function () {
            // This is what our box2d bodies get drawn to
            this.debugDraw = new box2d.b2DebugDraw();
            this.debugDraw.SetSprite(this.debugContext);
            this.debugDraw.SetDrawScale(config.SCALE);
            this.debugDraw.SetFillAlpha(0.3); // Set the Opacity of objects
            this.debugDraw.SetLineThickness(1.0);
            this.debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
            world.SetDebugDraw(this.debugDraw); // Set world's draw container
        };

        Reality.prototype.update = function () {
            world.Step(1 / 60, 10, 10);
            world.DrawDebugData();
            world.ClearForces();
        };
        return Reality;
    })();
    objects.Reality = Reality;
})(objects || (objects = {}));
/// <reference path="../box2d.ts" />
/// <reference path="../config.ts" />
var objects;
(function (objects) {
    var Platform = (function () {
        function Platform(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.createFixtureDefinition();
            this.createBodyDefinition();
            this.createPlatform();
        }
        Platform.prototype.createFixtureDefinition = function () {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.5; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce

            // Define the shape, which will be a Polygon
            this.fixDefShape = new box2d.b2PolygonShape();
            this.fixDefShape.SetAsBox(this.width * 0.5, this.height * 0.5);
            this.fixDef.shape = this.fixDefShape;
        };

        Platform.prototype.createBodyDefinition = function () {
            this.bodyDef = new box2d.b2BodyDef();
            this.bodyDef.type = box2d.b2Body.b2_staticBody;
            this.bodyDef.position.x = this.x;
            this.bodyDef.position.y = this.y;
        };

        Platform.prototype.createPlatform = function () {
            var position;

            // Add platform to world
            this.body = world.CreateBody(this.bodyDef);
            this.body.CreateFixture(this.fixDef);

            position = this.body.GetPosition();

            // Creates a new Shape object
            this.view = new createjs.Shape();
            this.view.regX = this.width * 0.5 * config.SCALE;
            this.view.regY = this.height * 0.5 * config.SCALE;

            this.view.graphics.beginFill("#663300").drawRect(position.x * config.SCALE, position.y * config.SCALE, this.width * config.SCALE, this.height * config.SCALE);
        };
        return Platform;
    })();
    objects.Platform = Platform;
})(objects || (objects = {}));
/// <reference path="../box2d.ts" />
/// <reference path="../config.ts" />
/// <reference path="../keys.ts" />
/// <reference path="../controls.ts" />
/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    var Hero = (function () {
        function Hero() {
            this.MAX_SPEED = 30;
            this.JUMP_TIMEOUT = 1000;
            this.JUMP_HEIGHT = 110;
            // Set our Hero controls initially to false
            // Sets last jump time to zero, to allow
            // for jumping immediately
            this.lastJumpTime = 0;

            this.view = new createjs.Sprite(managers.Assets.heroAtlas, "heroIdle");

            //this.width = this.view.getBounds().width / config.SCALE;
            //this.height = this.view.getBounds().height / config.SCALE;
            //this.view.regX = this.width * 0.5 * config.SCALE;
            //this.view.regY = this.height * 0.5 * config.SCALE;
            this.createFixtureDefinition();
            this.createBodyDefinition();
            this.createHero();

            // Set up movement and controls
            this.assignControls();
        }
        Hero.prototype.createFixtureDefinition = function () {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.2; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce

            // Define the shape, which will be a Polygon
            // this.fixDefShape = new box2d.b2PolygonShape();
            //this.fixDefShape.SetAsBox(this.width * 0.5, this.height * 0.5);
            this.fixDef.shape = this.fixDefShape;
        };

        Hero.prototype.createBodyDefinition = function () {
            this.bodyDef = new box2d.b2BodyDef();

            //this.bodyDef.userData = this.view;
            this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(this.view.x / config.SCALE, this.view.y / config.SCALE);
            this.bodyDef.fixedRotation = true; // prevent player rotation
        };

        Hero.prototype.createHero = function () {
            // Add Hero to world
            this.body = world.CreateBody(this.bodyDef);
            this.body.CreateFixture(this.fixDef);

            // Disallows our Hero from being disabled
            // or uncontrollable when he is not moving
            this.body.SetSleepingAllowed(false);

            // A velocity of zero
            this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));

            // And no spin
            this.body.SetAngularVelocity(0);

            // position Hero
            this.body.SetPosition(new box2d.b2Vec2(65 / config.SCALE, -this.height / config.SCALE));
        };

        Hero.prototype.assignControls = function () {
            // Binds key actions
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        };

        Hero.prototype.onControlDown = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = true;
                    controls.lTally++;
                    controls.rTally = 0;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.SPACEBAR:
                case keys.W:
                case keys.UP:
                    controls.jumping = true;
                    break;
            }
        };

        Hero.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = false;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = false;
                    break;
                case keys.SPACEBAR:
                case keys.W:
                case keys.UP:
                    controls.jumping = false;
                    break;
            }
        };

        Hero.prototype.onGround = function () {
            // If our Hero body is making contact
            // with another body, let him jump
            var contacts;
            contacts = this.body.GetContactList();
            return contacts && contacts.contact.IsTouching();
        };

        Hero.prototype.jumpTimePassed = function () {
            // At least the this.JUMP_TIMEOUT value has
            // passed since the last jump to disable
            // repeatable jumping.
            return createjs.Ticker.getTime() - this.lastJumpTime > this.JUMP_TIMEOUT;
        };

        // Fires on each iteration of our Game Loop
        Hero.prototype.update = function () {
            // Return if game currently paused
            var finalVelocity, impulse, position, velocity;

            /*     if (e.paused) {
            return;
            } */
            // Get the current position of our Hero
            position = this.body.GetPosition();

            // Get how fast
            velocity = this.body.GetLinearVelocity();

            // Move our view (Our EaselJS Bitmap)
            // to the new coordinates to match the
            // Box2D Body's position of the hero
            this.view.x = position.x * config.SCALE;
            this.view.y = position.y * config.SCALE;

            // Gets the current spinning angle
            this.view.rotation = this.body.GetAngle() * (180 / Math.PI);

            // Set the final velocity to the current
            // velocity
            finalVelocity = velocity.x;

            // Jumping
            if (controls.jumping && this.onGround() && this.jumpTimePassed()) {
                // Assign the last jump time to the current
                // time of the running game
                this.lastJumpTime = createjs.Ticker.getTime();

                // Apply an impulse by defining a new vector
                // point with a negative Y value-- jump height
                impulse = new box2d.b2Vec2(0, -this.JUMP_HEIGHT);
                this.body.ApplyImpulse(impulse, position);
                this.view.gotoAndPlay("heroJump");
                createjs.Sound.play("jump");
                controls.lTally = 0;
                controls.rTally = 0;
            }

            if (controls.right && velocity.x < this.MAX_SPEED) {
                finalVelocity += (velocity.x > 0 ? 0.45 : 0.6);

                this.view.scaleX = 1;

                // Only Play walk Animation once
                if (controls.rTally == 1) {
                    this.view.gotoAndPlay("heroWalk");
                }
            } else if (controls.left && velocity.x > -this.MAX_SPEED) {
                // Same as above, just different direction
                finalVelocity -= (velocity.x < 0 ? 0.45 : 0.6);

                // Slowing down
                this.view.scaleX = -1;

                // Only Play walk Animation once
                if (controls.lTally == 1) {
                    this.view.gotoAndPlay("heroWalk");
                }
            } else if (Math.abs(velocity.x) > 0.015) {
                // The lower this is the faster our hero
                // will slow down
                finalVelocity *= 0.96;
                // Come to a stop
            } else {
                finalVelocity = 0;
                this.view.gotoAndPlay("heroIdle");
            }

            // Set a new vector point for the hero
            // and apply the new linear velocity(left
            // and right) to our Hero's Box2D Body.
            velocity = new box2d.b2Vec2(finalVelocity, velocity.y);
            this.body.SetLinearVelocity(velocity);
        };
        return Hero;
    })();
    objects.Hero = Hero;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Enemy = (function () {
        function Enemy() {
            this.view = new createjs.Sprite(managers.Assets.enemyAtlas, "enemyWalk");

            this.width = this.view.getBounds().width / config.SCALE;
            this.height = this.view.getBounds().height / config.SCALE;
            this.view.regX = this.width * 0.5 * config.SCALE;
            this.view.regY = this.height * 0.5 * config.SCALE;

            this.createFixtureDefinition();
            this.createBodyDefinition();
            this.createEnemy();
        }
        Enemy.prototype.createFixtureDefinition = function () {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.2; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce

            // Define the shape, which will be a Polygon
            this.fixDefShape = new box2d.b2PolygonShape();
            this.fixDefShape.SetAsBox(this.width * 0.5, this.height * 0.5);

            this.fixDef.shape = this.fixDefShape;
        };

        Enemy.prototype.createBodyDefinition = function () {
            this.bodyDef = new box2d.b2BodyDef();
            this.bodyDef.userData = this.view;
            this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(this.view.x / config.SCALE, this.view.y / config.SCALE);
            this.bodyDef.fixedRotation = true; // prevent player rotation
        };

        Enemy.prototype.createEnemy = function () {
            // Add Enemy to world
            this.body = world.CreateBody(this.bodyDef);
            this.body.CreateFixture(this.fixDef);

            // Disallows our Enemy from being disabled
            // or uncontrollable when he is not moving
            this.body.SetSleepingAllowed(false);

            // A velocity of zero
            this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));

            // And no spin
            this.body.SetAngularVelocity(0);

            // position Enemy
            var randomX = Math.floor(Math.random() * (stage.canvas.width - 30) + 30);
            this.body.SetPosition(new box2d.b2Vec2(randomX / config.SCALE, -this.height / config.SCALE));
        };

        // Fires on each iteration of our Game Loop
        Enemy.prototype.update = function () {
            var finalVelocity, impulse, position, velocity;

            // Get the current position of the Enemy
            position = this.body.GetPosition();

            velocity = 20;

            // Move our view (Our EaselJS Bitmap)
            // to the new coordinates to match the
            // Box2D Body's position of the hero
            this.view.x = position.x * config.SCALE;
            this.view.y = position.y * config.SCALE;

            // Gets the current spinning angle
            this.view.rotation = this.body.GetAngle() * (180 / Math.PI);

            // Set the final velocity to the current
            // velocity
            finalVelocity = velocity.x;

            // Set a new vector point for the hero
            // and apply the new linear velocity(left
            // and right) to our Hero's Box2D Body.
            velocity = new box2d.b2Vec2(finalVelocity, velocity.y);
            this.body.SetLinearVelocity(velocity);
        };
        return Enemy;
    })();
    objects.Enemy = Enemy;
})(objects || (objects = {}));
/// <reference path="../managers/asset.ts" />
/// <reference path="../box2d.ts" />
/// <reference path="../config.ts" />
var objects;
(function (objects) {
    var Coin = (function () {
        function Coin() {
            this.view = new createjs.Sprite(managers.Assets.coinAtlas, "coin");

            this.width = this.view.getBounds().width / config.SCALE;
            this.height = this.view.getBounds().height / config.SCALE;

            this.view.regX = this.view.getBounds().width * 0.5 * config.SCALE;
            this.view.regY = this.view.getBounds().height * 0.5 * config.SCALE;

            this.createFixtureDefinition();
            this.createBodyDefinition();
            this.createCoin();
        }
        Coin.prototype.createFixtureDefinition = function () {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.2; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce

            // Define the shape, which will be a Polygon
            this.fixDefShape = new box2d.b2PolygonShape();
            this.fixDefShape.SetAsBox(this.width * 0.5, this.height * 0.5);

            this.fixDef.shape = this.fixDefShape;
        };

        Coin.prototype.createBodyDefinition = function () {
            this.bodyDef = new box2d.b2BodyDef();
            this.bodyDef.userData = this.view;
            this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(this.view.x / config.SCALE, this.view.y / config.SCALE);
            this.bodyDef.fixedRotation = true; // prevent coin rotation
        };

        Coin.prototype.createCoin = function () {
            // Add Coin to world
            this.body = world.CreateBody(this.bodyDef);
            this.body.CreateFixture(this.fixDef);

            // Disallows our Hero from being disabled
            // or uncontrollable when he is not moving
            this.body.SetSleepingAllowed(false);

            // A velocity of zero
            this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));

            // And no spin
            this.body.SetAngularVelocity(0);

            // position Enemy
            var randomX = Math.floor(Math.random() * (stage.canvas.width - 30) + 30);
            this.body.SetPosition(new box2d.b2Vec2(randomX / config.SCALE, -this.height / config.SCALE));
        };

        Coin.prototype.update = function () {
            var finalVelocity, impulse, position, velocity;

            // Move our view (Our EaselJS Bitmap)
            // to the new coordinates to match the
            // Box2D Body's position of the hero
            position = this.body.GetPosition();
            console.log(position);

            this.view.x = position.x * config.SCALE;
            this.view.y = position.y * config.SCALE;

            // Gets the current spinning angle
            this.view.rotation = this.body.GetAngle() * (180 / Math.PI);
        };
        return Coin;
    })();
    objects.Coin = Coin;
})(objects || (objects = {}));
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
/// <reference path="objects/coin.ts" />
// Game Variables
var arcadeCanvas;
var debugCanvas;
var stats;
var stage;
var ground;

// Physics Variables
var world;
var reality;

// Game Objects
var hero;
var coin;
var scoreboard;

function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

function init() {
    // Setup box2d reality
    reality = new objects.Reality();
    stage = new createjs.Stage(arcadeCanvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    gameStart();
}

function gameLoop(event) {
    // Start counting for FPS stats
    if (config.SHOW_FPS) {
        this.stats.begin();
    }
    hero.update();

    //  scoreboard.update();
    stage.update();

    reality.update();

    // End counting for FPS stats
    if (config.SHOW_FPS) {
        return this.stats.end();
    }
}

function setupStats() {
    // Uses stats.js
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function gameStart() {
    ground = new objects.Platform(9, 20, 40, 1);
    stage.addChild(ground.view);

    var leftWall = new objects.Platform(0, 0, 1, 40);
    stage.addChild(leftWall.view);

    var rightWall = new objects.Platform(26.6, 0, 1, 40);
    stage.addChild(rightWall.view);

    var platform1 = new objects.Platform(8, 16, 5, 1);
    stage.addChild(platform1.view);

    var platform2 = new objects.Platform(11, 12, 5, 1);
    stage.addChild(platform2.view);

    var platform3 = new objects.Platform(14, 8, 5, 1);
    stage.addChild(platform3.view);

    var platform4 = new objects.Platform(22, 5, 9, 1);
    stage.addChild(platform4.view);

    hero = new objects.Hero();
    stage.addChild(hero.view);

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
//# sourceMappingURL=box2DPlatformer.js.map

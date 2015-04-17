/// <reference path="../keys.ts" />
var objects;
(function (objects) {
    // BUTTON CLASS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var Button = (function () {
        function Button() {
            this.play = false;
            this.view = new createjs.Bitmap("assets/images/offbtn.png");
            this.view.x = 300;
            this.view.y = 500;
            this.width = this.view.getBounds().width / config.SCALE;
            this.height = this.view.getBounds().height / config.SCALE;
            this.view.regX = this.width * 0.5 * config.SCALE;
            this.view.regY = this.height * 0.5 * config.SCALE;
            this.createFixtureDefinition();
            this.createBodyDefinition();
            this.createButton();
            this.assignControls();
        }
        Button.prototype.createFixtureDefinition = function () {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.2; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce
            // Define the shape, which will be a Polygon
            this.fixDefShape = new box2d.b2CircleShape();
            this.fixDefShape.SetRadius(this.width * 0.5);
            //this.fixDefShape.SetAsBox(this.width * 0.65, this.height * 0.5);
            this.fixDef.shape = this.fixDefShape;
        };
        Button.prototype.createBodyDefinition = function () {
            this.bodyDef = new box2d.b2BodyDef();
            this.bodyDef.userData = this.view;
            this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(this.view.x / config.SCALE, this.view.y / config.SCALE);
            this.bodyDef.fixedRotation = true; // prevent player rotation
        };
        Button.prototype.createButton = function () {
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
            this.body.SetPosition(new box2d.b2Vec2(300 / config.SCALE, -this.height / config.SCALE));
        };
        Button.prototype.assignControls = function () {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        };
        Button.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
            }
        };
        return Button;
    })();
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map
/// <reference path="../keys.ts" />

module objects {
    // BUTTON CLASS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    export class GameKeyListener {

        bodyDef: Box2D.Dynamics.b2BodyDef;
        fixDef: Box2D.Dynamics.b2FixtureDef;
        fixDefShape: Box2D.Collision.Shapes.b2CircleShape;
        body;
        view: createjs.Bitmap;
        width: number;
        height: number;
        play: boolean = false;

        constructor() {
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

            this.assignControls()

        }

        createFixtureDefinition() {
            this.fixDef = new box2d.b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.2; // Add some Resistance
            this.fixDef.restitution = 0.2; // Add a little bounce

            // Define the shape, which will be a Polygon
            this.fixDefShape = new box2d.b2CircleShape();
            this.fixDefShape.SetRadius(this.width * 0.5);
            //this.fixDefShape.SetAsBox(this.width * 0.65, this.height * 0.5);

            this.fixDef.shape = this.fixDefShape;
        }

        createBodyDefinition() {
            this.bodyDef = new box2d.b2BodyDef();
            this.bodyDef.userData = this.view;
            this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(this.view.x / config.SCALE, this.view.y / config.SCALE);
            this.bodyDef.fixedRotation = true; // prevent player rotation
        }

        createButton() {
            // Add Hero to world
            this.body = world.CreateBody(this.bodyDef)
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
        }

        assignControls() {
            // Binds key actions
            window.onkeyup = this.onControlUp;
        }


        onControlUp(e) {
            switch (e.which) {
                case keys.SPACEBAR:
                    controls.playGameLevel1 = true;
                    break;
            }
        }
    }
}  
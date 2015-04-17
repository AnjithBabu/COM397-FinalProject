module objects {
    // Fire CLASS
    export class Fire extends createjs.Bitmap {

        //bitmapImage: createjs.Bitmap;
        public _dy: number;
        public _dx: number;
        public reachedBounds: boolean = false;
        public width: number;
        public height: number;
        

        // CONSTRUCTOR
        constructor(x, y) {
            super("assets/images/heroFire.png");
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 50;
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y -= this._dy;
            this._checkBounds();
        }

        // Reset position of fire to the top
        public reset() {
            this._dy = Math.floor(Math.random() * 5) + 5;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if fire has left the bottom of the screen
            if (this.y <= (-50)) {
                this.reachedBounds = true;
            }
        }

    }

}  
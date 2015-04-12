module objects {
    // Fire CLASS
    export class EnemyFire extends createjs.Bitmap {

        public _dy: number;
        public _dx: number;
        public reachedBounds: boolean = false;
        public width: number;
        public height: number;
        

        // CONSTRUCTOR
        constructor(x, y) {
            super("assets/images/heroEnemy.png");
            this.x = x;
            this.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this._dy = Math.floor(Math.random() * 5) + 5;
            this._dx = Math.floor(Math.random() * 4) - 2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.y >= (600+this.getBounds().height)) {
                this.reachedBounds = true;
            }
        }

    }

}   
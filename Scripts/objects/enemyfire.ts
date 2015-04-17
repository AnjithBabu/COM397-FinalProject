module objects {
    // Enemy Fire CLASS
    export class EnemyFire extends createjs.Bitmap {

        public _dy: number;
        public _dx: number;
        public reachedBounds: boolean = false;
        public width: number;
        public height: number;
        public bitmapId: number;
        

        // CONSTRUCTOR
        constructor(x, y, path, Id) {
            super(path);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 70;
            this.reset();
            this.bitmapId = Id;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        }

        // Reset position of fireball to the top
        public reset() {
            this._dy = Math.floor(Math.random() * 5) + 5;
            this._dx = Math.floor(Math.random() * 4) - 2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if fireball has left the bottom of the screen
            if (this.y >= (600+70)) {
                this.reachedBounds = true;
            }
        }

    }

}   
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Fire CLASS
    var EnemyFire = (function (_super) {
        __extends(EnemyFire, _super);
        // CONSTRUCTOR
        function EnemyFire(x, y, path, Id) {
            _super.call(this, path);
            this.reachedBounds = false;
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 70;
            this.reset();
            this.bitmapId = Id;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        EnemyFire.prototype.update = function () {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        EnemyFire.prototype.reset = function () {
            this._dy = Math.floor(Math.random() * 5) + 5;
            this._dx = Math.floor(Math.random() * 4) - 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        EnemyFire.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.y >= (600 + 70)) {
                this.reachedBounds = true;
            }
        };
        return EnemyFire;
    })(createjs.Bitmap);
    objects.EnemyFire = EnemyFire;
})(objects || (objects = {}));
//# sourceMappingURL=enemyfire.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Fire CLASS
    var Fire = (function (_super) {
        __extends(Fire, _super);
        // CONSTRUCTOR
        function Fire(x, y) {
            _super.call(this, "assets/images/heroFire.png");
            this.reachedBounds = false;
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 50;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Fire.prototype.update = function () {
            this.y -= this._dy;
            this._checkBounds();
        };
        // Reset position of fire to the top
        Fire.prototype.reset = function () {
            this._dy = Math.floor(Math.random() * 5) + 5;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Fire.prototype._checkBounds = function () {
            // check if fire has left the bottom of the screen
            if (this.y <= (-50)) {
                this.reachedBounds = true;
            }
        };
        return Fire;
    })(createjs.Bitmap);
    objects.Fire = Fire;
})(objects || (objects = {}));
//# sourceMappingURL=fire.js.map
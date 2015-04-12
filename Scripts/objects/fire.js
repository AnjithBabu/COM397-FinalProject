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
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Fire.prototype.update = function () {
            this.y -= this._dy;
            //this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Fire.prototype.reset = function () {
            this._dy = Math.floor(Math.random() * 5) + 5;
            //this._dx = Math.floor(Math.random() * 4) - 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Fire.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.y <= (-this.getBounds().height)) {
                this.reachedBounds = true;
            }
        };
        return Fire;
    })(createjs.Bitmap);
    objects.Fire = Fire;
})(objects || (objects = {}));
//# sourceMappingURL=fire.js.map
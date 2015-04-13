var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Fire CLASS
    var Package = (function (_super) {
        __extends(Package, _super);
        // CONSTRUCTOR
        function Package(x, y, path, id) {
            _super.call(this, path);
            this.reachedBounds = false;
            this.x = x;
            this.y = y;
            this.bitmapId = id;
            this.width = 50;
            this.height = 50;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Package.prototype.update = function () {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Package.prototype.reset = function () {
            this._dy = Math.floor(Math.random() * 5) + 5;
            this._dx = Math.floor(Math.random() * 4) - 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Package.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.y >= (600 + this.getBounds().height)) {
                this.reachedBounds = true;
            }
        };
        return Package;
    })(createjs.Bitmap);
    objects.Package = Package;
})(objects || (objects = {}));
//# sourceMappingURL=package.js.map
/// <reference path="config.ts" />
/// <reference path="box2d.ts" />
var controls;
(function (controls) {
    controls.jumping = false;
    controls.left = false;
    controls.right = false;
    controls.rTally = 0;
    controls.lTally = 0;
    controls.firing = false;
    controls.playGameLevel1 = false;
    controls.playGameLevel2 = false;
    controls.playGameLevel3 = false;
    controls.instructions = false;
    controls.gameover = false;
})(controls || (controls = {}));
//# sourceMappingURL=controls.js.map
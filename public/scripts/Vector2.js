var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Vector2;
})();
module.exports = Vector2;

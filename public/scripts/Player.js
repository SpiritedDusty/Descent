var PlayerDirection = require('./PlayerDirection');
var Player = (function () {
    function Player(x, y, screenDimensions) {
        this.w = 50;
        this.h = 50;
        this.speed = 5;
        this.direction = PlayerDirection.NONE;
        this.x = x;
        this.y = y;
        this.screenDimensions = screenDimensions;
    }
    Player.prototype.getX = function () {
        return this.x;
    };
    Player.prototype.getY = function () {
        return this.y;
    };
    Player.prototype.setDirection = function (direction) {
        this.direction = direction;
    };
    Player.prototype.getDirection = function () {
        return this.direction;
    };
    Player.prototype.update = function () {
        if (this.direction === PlayerDirection.LEFT) {
            this.x = (this.x - this.speed >= 0) ? this.x - this.speed : 0;
        }
        else if (this.direction === PlayerDirection.RIGHT) {
            this.x = (this.x + this.w + this.speed <= this.screenDimensions.x) ? this.x + this.speed : this.screenDimensions.x - this.w;
        }
    };
    return Player;
})();
module.exports = Player;

/// <reference path="../typings/sweetalert.d.ts" />
var Vector2 = require('./Vector2');
var Player = require('./Player');
var PlayerDirection = require('./PlayerDirection');
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Game = (function () {
    function Game(canvas) {
        this.context = canvas.getContext('2d');
        this.screenDimensions = new Vector2(canvas.width, canvas.height);
        this.reset();
        var self = this;
        canvas.addEventListener('touchstart', function (event) {
            var x = event.touches[event.touches.length - 1].pageX;
            var y = event.touches[event.touches.length - 1].pageY;
            self.touch.set(x, y);
        });
        canvas.addEventListener('touchend', function (event) {
            if (event.touches.length > 0) {
                var x = event.touches[event.touches.length - 1].pageX;
                var y = event.touches[event.touches.length - 1].pageY;
                self.touch.set(x, y);
            }
            else {
                self.touch.set(NaN, NaN);
            }
        });
    }
    Game.prototype.update = function () {
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].y -= 2;
            if ((this.player.x < this.walls[i].hx || this.player.x + this.player.w > this.walls[i].hx + this.walls[i].hw) && ((this.player.y > this.walls[i].y && this.player.y < this.walls[i].y + this.walls[i].h) || (this.player.y + this.player.h > this.walls[i].y && this.player.y < this.walls[i].y + this.walls[i].h))) {
                var self = this;
                this.player.x = NaN;
                this.player.y = NaN;
                swal({
                    title: 'GAME OVER',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Retry',
                    closeOnConfirm: true
                }, function () {
                    self.reset();
                });
            }
        }
        if (!isNaN(this.touch.x) && !isNaN(this.touch.y)) {
            if (this.touch.x < this.screenDimensions.x / 2) {
                this.player.setDirection(PlayerDirection.LEFT);
            }
            else if (this.touch.y > this.screenDimensions.x / 2) {
                this.player.setDirection(PlayerDirection.RIGHT);
            }
        }
        else {
            this.player.setDirection(PlayerDirection.NONE);
        }
        this.player.update();
    };
    Game.prototype.draw = function () {
        this.context.clearRect(0, 0, this.screenDimensions.x, this.screenDimensions.y);
        this.context.fillStyle = '#2980b9';
        this.context.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
        this.context.fillStyle = '#ea6153';
        for (var i = 0; i < this.walls.length; i++) {
            this.context.fillRect(0, this.walls[i].y, this.walls[i].hx, this.walls[i].h);
            this.context.fillRect(this.walls[i].hx + this.walls[i].hw, this.walls[i].y, this.screenDimensions.x - (this.walls[i].hx + this.walls[i].hw), this.walls[i].h);
        }
    };
    Game.prototype.reset = function () {
        this.walls = [];
        this.touch = new Vector2(NaN, NaN);
        this.player = new Player((this.screenDimensions.x / 2) - (50 / 2), 100, this.screenDimensions);
        this.generateWalls();
    };
    Game.prototype.generateWalls = function () {
        for (var i = 0; i < 50; i++) {
            this.walls.push({
                hx: getRandomInt(75, this.screenDimensions.x - 75),
                hw: 75,
                y: ((this.walls.length > 0) ? this.walls[this.walls.length - 1].y + 175 : this.screenDimensions.y),
                h: 75
            });
        }
    };
    return Game;
})();
module.exports = Game;

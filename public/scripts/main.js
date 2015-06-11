/// <reference path="../typings/jquery.d.ts" />
var Game = require('./Game');
$(function () {
    $('#main').attr({
        width: $(document).width(),
        height: $(document).height()
    });
    var instance = new Game(document.getElementById('main'));
    function start() {
        instance.update();
        instance.draw();
        requestAnimationFrame(start);
    }
    requestAnimationFrame(start);
});

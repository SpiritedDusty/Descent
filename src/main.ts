/// <reference path="../typings/jquery.d.ts" />

import Vector2 = require('./Vector2');
import Game = require('./Game');

$(function() {
	$('#main').attr({
		width: $(document).width(),
		height: $(document).height()
	});

	var instance: Game = new Game(<HTMLCanvasElement> document.getElementById('main'));

	function start() {
		instance.update();
		instance.draw();
		requestAnimationFrame(start);
	}

	requestAnimationFrame(start);
});

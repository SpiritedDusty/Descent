import Vector2 = require('./Vector2');
import PlayerDirection = require('./PlayerDirection');

class Player {
	public x: number;
	public y: number;
	public w: number = 50;
	public h: number = 50;

	private screenDimensions: Vector2;
	private speed: number = 5;
	private direction: PlayerDirection = PlayerDirection.NONE;

	constructor(x: number, y: number, screenDimensions: Vector2) {
		this.x = x;
		this.y = y;
		this.screenDimensions = screenDimensions;
	}

	public getX(): number {
		return this.x;
	}

	public getY(): number {
		return this.y;
	}

	public setDirection(direction: PlayerDirection) {
		this.direction = direction;
	}

	public getDirection(): PlayerDirection {
		return this.direction;
	}

	public update() {
		if (this.direction === PlayerDirection.LEFT) {
			this.x = (this.x - this.speed >= 0) ? this.x - this.speed : 0;
		} else if (this.direction === PlayerDirection.RIGHT) {
			this.x = (this.x + this.w + this.speed <= this.screenDimensions.x) ? this.x + this.speed : this.screenDimensions.x - this.w;
		}
	}
}

export = Player;

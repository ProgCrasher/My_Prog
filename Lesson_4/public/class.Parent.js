module.exports = class LivingCreature {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.multiply = 0;
		this.index = index;
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		]
	}
	chooseCell(matrix,chooseCell, cd, cd2, cd3, cd4) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == chooseCell || matrix[y][x] == cd || matrix[y][x] == cd2 || matrix[y][x] == cd3 || matrix[y][x] == cd4) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}


};
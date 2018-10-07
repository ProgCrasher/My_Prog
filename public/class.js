class LivingCreature {
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
	chooseCell(chooseCell) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == chooseCell || matrix[y][x] == cd) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}

	move() {
		var newCel = this.chooseCell(0, 1);
		var card = random(newCel);
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 0) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 4) {
				matrix[y][x] = 0;
			}
			else if (matrix[y][x] == 6) {
				matrix[y][x] = 0;
			}
			matrix[y][x] = 2;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 3) {
			this.die();
		}
	}


	eat() {
		var foundCards = this.chooseCell(1);
		var card = random(foundCards);

		if (card) {

			var x = card[0];
			var y = card[1];

			matrix[y][x] = 2;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;
			this.energy += 3;

			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}

			if (this.multiply == 26) {
				this.mulik();
				this.multiply = 0;
			}


		}
		else {
			this.move();

		}
	}


	mul() {
		var foundCards = this.chooseCell(0, 1);
		var card = random(foundCards);

		if (card) {
			var x = card[0];
			var y = card[1];
			this.multiply += 6;
			var norXotaker = new GrassEater(x, y, this.index);
			grassEater.push(norXotaker);

			matrix[y][x] = 2;
			this.multiply = 0;
		}


	}

	die() {
		this.getNewCoordinates();
		matrix[this.y][this.x] = 0;

		for (var i in grassEater) {
			if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
				grassEater.splice(i, 1);
			}
		}
	}
}
//prosto xot
class grass extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.color = "green";
		this.multiply = 8;
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		if (this.multiply >= 3 && newCell) {
			var newGrass = new grass(newCell[0], newCell[1], this.index);
			grassArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = this.index;
			this.multiply = 0;
		}
	}

}

//xot utox
class GrassEater {
	constructor(x, y, index) {
		super(x,y,index);
		this.energy = 13;
	}
	getNewCoordinates() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}


	chooseCell(character, cd) {
		this.getNewCoordinates();
		return super.chooseCell(character);
	}

}

//prosto xot utoxin utox kam gishatich

class Predator {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.energy = 11;
		this.index = index;
		this.multiply = 0;

	}
	getNewCoor() {
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


	chooseCell(character1, character2) {
		this.getNewCoor();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
				if (matrix[y][x] == character1 || matrix[y][x] == character2) {
					found.push(this.directions[i])
				}
			}
		}
		return found;
	}


	die() {

		matrix[this.y][this.x] = 0;

		for (var i in predator) {
			if (this.x == predator[i].x && this.y == predator[i].y) {
				predator.splice(i, 1);
			}
		}
	}



	move() {
		var newCel = this.chooseCell(0, 1);
		var card = random(newCel);
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 0) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 1;
			}
			else if (matrix[y][x] == 4) {
				matrix[y][x] = 0;
			}
			else if (matrix[y][x] == 6) {
				matrix[y][x] = 0;
			}
			matrix[y][x] = 3;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 1) {
			this.die();
		}
	}


	mul() {

		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = this.index;
			var pred = new Predator(newX, newY, this.index);
			predator.push(pred);
			this.multiply = 0;
		}
	}




	eat() {
		var foundCards = this.chooseCell(2);
		var card = random(foundCards);
		if (card) {
			var x = card[0];
			var y = card[1];
			matrix[y][x] = 3;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.multiply++;
			this.energy += 5

			for (var i in grassEater) {
				if (x == grassEater[i].x && y == grassEater[i].y) {
					grassEater.splice(i, 1);
				}
			}

			if (this.multiply == 25) {
				this.mul();
				this.multiply = 0;
			}


		}

		else {

			this.move();

		}
	}
}

//darac gishatich
class VirusPred {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.energy = 11;
		this.index = index;
		this.multiply = 0;

	}
	getNewCoor() {
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


	chooseCell(character1, character2) {
		this.getNewCoor();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
				if (matrix[y][x] == character1 || matrix[y][x] == character2) {
					found.push(this.directions[i])
				}
			}
		}
		return found;
	}


	die() {

		matrix[this.y][this.x] = 0;

		for (var i in viruspred) {
			if (this.x == viruspred[i].x && this.y == viruspred[i].y) {
				viruspred.splice(i, 1);
			}
		}
	}



	move() {
		var newCel = this.chooseCell(0, 1);
		var card = random(newCel);
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 0) {
				matrix[this.y][this.x] = 0;
			}
			else if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 1;
			}

			matrix[y][x] = 6;


			this.x = x;
			this.y = y;
			this.energy--;

		}
		if (this.energy < 1) {
			this.die();
		}
	}


	mul() {

		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);
		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = this.index;
			var predik = new VirusPred(newX, newY, this.index);
			viruspred.push(predik);
			this.multiply = 0;
		}
	}




	eat() {
		var foundCards = this.chooseCell(3);
		var card = random(foundCards);
		if (card) {
			var x = card[0];
			var y = card[1];
			matrix[y][x] = 6;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.multiply++;
			if (predator.length < 50) {
				this.energy += 5
			}
			else {
				this.energy += 3;
			}

			for (var i in predator) {
				if (x == predator[i].x && y == predator[i].y) {
					predator.splice(i, 1);
				}
			}

			if (this.multiply == 25) {
				this.mul();
				this.multiply = 0;
			}


		}

		else {
			this.move();

		}
	}
}

//Mutant bolorin utox
class Mutant {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 0;
		this.energy = 17;
		this.directions = [];
	}
	largeCoo() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x - 2, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 2, this.y + 2]
		];
	}

	chooseCell(character1, character2, character3, character4, cik) {
		this.largeCoo();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
				if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4 || matrix[y][x] == cik) {
					found.push(this.directions[i])
				}
			}
		}
		return found;
	}

	move() {
		var foundCard = this.chooseCell(0, 1, 2, 3, 5);
		var card = random(foundCard);
		if (card) {
			var x = card[0];
			var y = card[1];


			matrix[y][x] = 4;

			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

		}

	}

	eat() {
		var foundCard = this.chooseCell(1, 2, 3, 5);
		var card = random(foundCard);
		if (card) {

			var x = card[0];
			var y = card[1];
			matrix[this.y][this.x] = 0;
			matrix[y][x] = 4;


			this.x = x;
			this.y = y;


			this.multiply++;
			this.energy += 5;
			var z = this.x;
			var b = this.y;

			for (var i in predator) {
				if (x == predator[i].x && y == predator[i].y) {
					predator.splice(i, 1);
					this.poison();

				}
			}
			for (var i in grassEater) {
				if (x == grassEater[i].x && y == grassEater[i].y) {
					grassEater.splice(i, 1);
				}
			}
			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}
			//random boolean
			var randomBool = Math.random() >= 0.5;
			//////////////////////////////////////
			if (randomBool) {
				for (var i in knight) {
					if (x == knight[i].x && y == knight[i].y) {
						knight.splice(i, 1);
					}
				}
			}


			if (this.multiply == 34) {
				this.mul();
				this.multiply = 0;
			}

		}

		else {
			this.move();
			this.energy--;
			if (this.energy < 3) {
				this.die();
			}
		}
	}

	poison() {
		for (var i = 0; i <= 50; i++) {


			var foundCard = this.chooseCell(3);
			var card = random(foundCard);

			if (card) {
				var x = card[0];
				var y = card[1];

				this.multiply++;

				var mutag = new VirusPred(x, y, this.index);
				viruspred.push(mutag);

				matrix[y][x] = 6;
				this.multiply = 3;
			}

		}
	}

	mul() {
		var foundCard = this.chooseCell(0);
		var card = random(foundCard);

		if (card) {
			var x = card[0];
			var y = card[1];


			this.multiply++;

			var mutagen = new Mutant(x, y, this.index);
			mutant.push(mutagen);

			matrix[y][x] = 4;
			this.multiply = 3;
		}


	}

	die() {
		this.largeCoo();
		matrix[this.y][this.x] = 0;

		for (var i in mutant) {
			if (this.x == mutant[i].x && this.y == mutant[i].y) {
				mutant.splice(i, 1);
			}
		}
	}

}



//aspet

class Knight {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 0;
		this.energy = 36;
		this.directions = [];
	}
	largeCoo() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x - 2, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 2, this.y + 2],
			[this.x - 3, this.y - 3],
			[this.x, this.y - 3],
			[this.x + 3, this.y - 3],
			[this.x - 3, this.y],
			[this.x + 3, this.y],
			[this.x - 3, this.y + 3],
			[this.x, this.y + 3],
			[this.x + 3, this.y + 3],
		];
	}

	chooseCell(character1, character2, character3, character4, tik) {
		this.largeCoo();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length) {
				if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4 || matrix[y][x] == tik) {
					found.push(this.directions[i])
				}
			}
		}
		return found;
	}

	move() {
		var foundCard = this.chooseCell(0, 1, 4, 6);
		var card = random(foundCard);
		if (card) {
			var x = card[0];
			var y = card[1];
			if (matrix[y][x] == 1) {
				matrix[this.y][this.x] = 1;
			}
			else if (matrix[y][x] == 3) {
				matrix[this.y][this.x] = 3;
			}
			else {
				matrix[this.y][this.x] = 0;
			}

			matrix[y][x] = 5;
			this.x = x;
			this.y = y;

		}

	}

	eat() {
		var foundCard = this.chooseCell(4, 6);
		var card = random(foundCard);
		if (card) {

			var x = card[0];
			var y = card[1];

			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;


			this.multiply++;
			this.energy += 7;

			for (var i in mutant) {
				if (x == mutant[i].x && y == mutant[i].y) {
					mutant.splice(i, 1);
				}
			}
			for (var i in viruspred) {
				if (x == viruspred[i].x && y == viruspred[i].y) {

					viruspred.splice(i, 1);
					this.health();
				}
			}

			if (this.multiply == 25) {
				this.mul();
				this.multiply = 0;
			}

		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 3) {
				this.die();
			}
		}
	}

	mul() {
		var foundCard = this.chooseCell(0);
		var card = random(foundCard);

		if (card) {
			var x = card[0];
			var y = card[1];


			this.multiply++;

			var tufto = new Knight(x, y, this.index);
			knight.push(tufto);

			matrix[y][x] = 5;
			this.multiply = 3;
		}


	}

	health() {
		var foundCard = this.chooseCell(6);
		var card = random(foundCard);

		if (card) {
			var x = card[0];
			var y = card[1];


			var frick = new Predator(x, y, this.index);
			predator.push(frick);

			matrix[y][x] = 3;
		}

	}

	die() {
		this.largeCoo();
		matrix[this.y][this.x] = 0;

		for (var i in knight) {
			if (this.x == knight[i].x && this.y == knight[i].y) {
				knight.splice(i, 1);
			}
		}
	}

}


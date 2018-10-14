var LivingCreature = require("./class.Parent");

////////////////////////////////////
//Grass
////////////////////////////////////
module.exports = class grass extends LivingCreature {
	constructor(x, y, index) {
		super(x, y, index);
		this.color = "green";
		this.multiply = 8;
	}
	mul(matrix,grassArr,grassEater,predator,mutant,knight,viruspred) {
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        this.multiply++;
		var newCell = random(0,this.chooseCell(matrix,0));
		if (this.multiply >= 3 && newCell) {
			var newGrass = new grass(newCell[0], newCell[1], this.index);
			grassArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = this.index;
			this.multiply = 0;
		}
	}

}
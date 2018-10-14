var n =80;
var m =80;
var x = 5;

var grass = require("./class.Grass");
var GrassEater = require("./class.Grass_Eater");
var Predator = require("./class.Predator");
var Mutant = require("./class.Mutant");
var Knight = require("./class.Knight");
var VirusPred = require("./class.illPred");



/////////////////////////////////////////
var matrix1 = randomMatrix(n/4, m,0,2);
var matrix2 = randomMatrix(n/2, m,0,3);
var matrix3 = randomMatrix(n/4, m,0,2);
matrix = matrix1.concat(matrix2).concat(matrix3);
for (var i = 50; i < n; i++) {
	for (var z = 0; z <= m-50; z++) {
		matrix[i][z]=4;
	}
}
for (var i = 0; i < n/2; i++) {
	for (var z = m-30; z <= m; z++) {
		matrix[i][z]=5;
	}
}
/////////////////////////////////////////

var grassArr = [];
var grassEater = [];
var predator = [];
var mutant = [];
var knight = [];
var viruspred=[];

////////////////////////////////////////

	var k = 0;     //0
	var m = -1;     //3
	var e = -1;       //2
	
	for (var y = 0; y < matrix.length; y++) {  //2
		for (var x = 0; x < matrix[y].length; x++) { //3

			if(k){
				mutant.push(new Mutant(x, y, 4));
				
				k -= 1;
				continue;
			}
			if(m == x + 1 && e == y - 1){
				mutant.push(new Mutant(x, y, 4));
				m += 1;
				continue;
			}
			
			//xot
			if (matrix[y][x] == 1) {
				grassArr.push(new grass(x, y, 1));
			}

			//xotaker
			else if (matrix[y][x] == 2) {
				grassEater.push(new GrassEater(x, y, 2));
			}
			//xotakerin utox
			else if (matrix[y][x] == 3) {
				predator.push(new Predator(x, y, 3));
			}
			//mutant
			else if (matrix[y][x] == 4) {
				mutant.push(new Mutant(x, y, 4));
				k = 2;
				m = x;
				e = y; 
			}
			//aspet
			else if (matrix[y][x] == 5) {
				knight.push(new Knight(x, y, 5));
			}
			//darac gishatich
			else if (matrix[y][x] == 6) {
				viruspred.push(new VirusPred(x, y, 6));
			}
		}
	}






function draw() {
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				console.log(1);

			}
			else if (matrix[y][x] == 0) {
				console.log(0);
			}
			else if (matrix[y][x] == 2) {
				console.log(2);				
			}
			else if (matrix[y][x] == 3) {
				console.log(3);				
			}
			else if (matrix[y][x] == 4) {
				console.log(4);				
			}
			else if (matrix[y][x] == 5) {
				console.log(5);				
			}
			else if (matrix[y][x] == 6) {
				console.log(6);								
			}
		}
	}
	//xoti metodneri kanch
	for (var i in grassArr) {
		grassArr[i].mul(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
    

	}
	//xotakeri metodneri kanch
	for (var i in grassEater) {
		grassEater[i].eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
		
	}
	//gishatchi metodneri kanch
	for (var i in predator) {
		predator[i].eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
		
	}
	//mutanti metodi kanch
	for (var i in mutant) {
		mutant[i].eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
		
	}
	//aspeti metodi kanch
	for (var i in knight) {
		knight[i].eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
		
	}
	
	for (var i in viruspred) {
		viruspred[i].eat(matrix,grassArr,grassEater,predator,mutant,knight,viruspred);
		
	}
////////////////////////////////////////
}

var _time = 1000/x;
var dr = setInterval(draw, _time);

//random matrix function
function randomMatrix(m, n,z,k) {
	var matrix = [];
	for (var y = 0; y < m; y++) {
		matrix[y] = []
		for (var x = 0; x < n; x++) {

			matrix[y][x] = randomik(z, k);

		}
	}
	return matrix;
}

//random integer function
function randomik(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
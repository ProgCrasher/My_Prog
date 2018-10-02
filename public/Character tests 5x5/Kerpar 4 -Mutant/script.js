var n =5;
var m =5;
var side = 80;



/////////////////////////////////////////
matrix = randomMatrix(n, m,0,4);
/////////////////////////////////////////

var grassArr = [];
var grassEater = [];
var predator = [];
var mutant = [];
var knight = [];
var viruspred=[];

////////////////////////////////////////
function setup() {
	createCanvas(matrix[0].length * side, matrix.length * side);
	background('#acacac');
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

}


function draw() {
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				fill('green');
				rect(x * side, y * side, side, side);

			}
			else if (matrix[y][x] == 0) {
				fill('#acacac');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 2) {
				fill('red');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 3) {
				fill('#00cccc');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 4) {
				fill('#4C00FF');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 5) {
				fill('white');
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 6) {
				fill('black');
				rect(x * side, y * side, side, side);
			}
		}
	}
	//xoti metodneri kanch
	for (var i in grassArr) {
		grassArr[i].mul();
    

	}
	//xotakeri metodneri kanch
	for (var i in grassEater) {
		grassEater[i].eat();
		
	}
	//gishatchi metodneri kanch
	for (var i in predator) {
		predator[i].eat();
		
	}
	//mutanti metodi kanch
	for (var i in mutant) {
		mutant[i].eat();
		
	}
	//aspeti metodi kanch
	for (var i in knight) {
		knight[i].eat();
		
	}
	
	for (var i in viruspred) {
		viruspred[i].eat();
		
	}
////////////////////////////////////////

	frameRate(1);
}


//random matrix function
function randomMatrix(m, n,z,k) {
	var matrix = [];
	for (var y = 0; y < m; y++) {
		matrix[y] = []
		for (var x = 0; x < n; x++) {

			matrix[y][x] = getRandomBetween(z, k);

		}
	}
	return matrix;
}

//random integer function
function getRandomBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
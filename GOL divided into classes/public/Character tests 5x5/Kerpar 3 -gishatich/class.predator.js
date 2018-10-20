//prosto xot
class grass {
	constructor(x, y, index) {
		this.color = "green";
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 8;
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x, this.y + 1]
		]
	}
	chooseCell(character) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}
			}
		}

		return found;
	}

	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));

		
		if (this.multiply >= 3 && newCell) {
						var newGrass = new grass(newCell[0], newCell[1], this.index);
						grassArr.push(newGrass);
						matrix[newCell[1]][newCell[0]] = 1;
						this.multiply = 0;
					}
	}

}
//xot utox
class GrassEater {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.energy = 13;
		this.index = index;
		this.multiply = 0;
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


	chooseCell(character,cd) {
		this.getNewCoordinates();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character || matrix[y][x] == cd) {
					found.push(this.directions[i]);
				}
			}
		}

		return found;
	}

			 move(){
		        var newCel = this.chooseCell(0,1);
		        var card = random(newCel);
		        if(card){
		            var x = card[0];
		            var y = card[1];
		            if(matrix[y][x] == 0)
		            {
		                matrix[this.y][this.x] = 0;
		            }
		            else if(matrix[y][x] == 1)
		            {
		                matrix[this.y][this.x] = 0;
		            }
		           else if(matrix[y][x]==4){
		           		matrix[y][x]=0;
		           }
		           else if(matrix[y][x]==6){
		           		matrix[y][x]=0;
		           }
		            matrix[y][x] = 2;
		            

		            this.x = x;
		            this.y=y;
		            this.energy--;

		        }
		        if(this.energy<3){
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
			this.energy+=3;
			
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


	mulik() {
		var foundCards = this.chooseCell(0,1);
		var card = random(foundCards);

		if (card) {
			var x = card[0];
			var y = card[1];
			this.multiply+=6;
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

//prosto xot utoxin utox kam gishatich

class Predator {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 11;
        this.index = index;
        this.multiply = 0;
        
    }
    getNewCoor(){
     this.directions=[
            [this.x-1,this.y-1],
            [this.x,this.y-1],
            [this.x+1,this.y-1],
            [this.x-1,this.y],
            [this.x+1,this.y],
            [this.x-1,this.y+1],
            [this.x,this.y+1],
            [this.x+1,this.y+1]
        ]
    }
  

   chooseCell(character1,character2){
     this.getNewCoor();
     var found = [];
     for(var i in this.directions){
         var x =this.directions[i][0];
         var y = this.directions[i][1];
         if(y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length  ){
         if(matrix[y][x]==character1 || matrix[y][x]== character2){
             found.push(this.directions[i])
         }
     }
     }
     return found;
 }
  

   die(){
       
       matrix[this.y][this.x] = 0;
       
       for(var i in predator){
                if( this.x == predator[i].x && this.y == predator[i].y)
                {
                    predator.splice(i,1);   
                }
            }
   }

   

    move(){
        var newCel = this.chooseCell(0,1);
        var card = random(newCel);
        if(card){
            var x = card[0];
            var y = card[1];
            if(matrix[y][x] == 0)
            {
                matrix[this.y][this.x] = 0;
            }
            else if(matrix[y][x] == 1)
            {
                matrix[this.y][this.x] = 1;
            }
           else if(matrix[y][x]==4){
           		matrix[y][x]=0;
           }
           else if(matrix[y][x]==6){
           		matrix[y][x]=0;
           }
            matrix[y][x] = 3;
            

            this.x = x;
            this.y=y;
            this.energy--;

        }
        if(this.energy<1){
            this.die();
        }
    }
   

    mul(){
  
       var emptyCells = this.chooseCell(0);
       var newCell = random(emptyCells);
       if(newCell){
           var newX = newCell[0];
           var newY = newCell[1];
          
           matrix[newY][newX] = this.index;
           var pred = new Predator(newX, newY, this.index);
           predator.push(pred);
           this.multiply =0;
           }  
}
     
    
  
    
    eat(){
        var foundCards = this.chooseCell(2);
        var card = random(foundCards);
        if(card){
            var x = card[0];
            var y = card[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x =x;
            this.y =y;

            this.multiply++;
            this.multiply++;
			this.energy+=5

            for(var i in grassEater){
                if( x == grassEater[i].x && y == grassEater[i].y)
                {
                    grassEater.splice(i,1);   
                }
            }
            
           if(this.multiply == 25){
                this.mul();
				this.multiply = 0;
             }
              
            
            }
        
        else {
             
             this.move();

            }
    } 
}
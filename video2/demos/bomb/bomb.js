/*
 * atomic_bomb.js
 * p5.js app blah blah
 * (You shold use this file header to describe what's going on.)
 * 
 * Author: Dana Avesar <avesd617@newschool.edu>
 */
var bombSketch = function(sketch){

	sketch.piecesArray = [];


	/**
	 * p5 event to preload data
	 */
	sketch.preload = function() {
		sketch.bombPos1 = sketch.loadJSON("demos/bomb/bomb_data.json"); // Asynchronous XHR

	}

	/**
	 * p5 event once things are preloaded()
	 */
	sketch.setup = function() { 
		sketch.data1 = sketch.organizeData(sketch.bombPos1); 

		/* Prepare grounds for drawing stuff */
		
		sketch.createCanvas(1280,720);
		for( i = 0 ; i < 50 ; i++ ) {
				//console.log(data1[i]);
			sketch.piecesArray[i] = new sketch.Rect( sketch.data1[i]);
		}

		
		
	}

	sketch.organizeData = function(drawscript){
		var data = [];
			i = 0
		for( shape in drawscript ) {
			// extract lines only from this drawscript[shape]
			line = []
			for( key in drawscript[shape] )
				if( drawscript[shape][key]["line"] )
					line.push( drawscript[shape][key]["line"] )
					
			// reformat lines
			data[i] = []
			data[i][0] = line[0][0]
			data[i][1] = line[0][1]
			data[i][2] = line[1][0]
			data[i][3] = line[1][1]
			data[i][4] = line[2][0]
			data[i][5] = line[2][1]
			data[i][6] = line[3][0]
			data[i][7] = line[3][1]
			// any extra lines will be ignored
			
			i++ // increment i

			//return data[i];
		}
		return data;
		
	}


	sketch.draw = function(){
		
		sketch.background(255);


		
		for(var i=0; i < 50; i++){


				sketch.piecesArray[i].display();



			
		}

		//console.log(sketch.millis());
	}


	/**
	* Rect object
	* Uses p5.js
	*/
	sketch.Rect = function() {
	   this.shape = [
	             70+sketch.random(30,100), sketch.height-90+sketch.random(30,100)
	           , 70+sketch.random(30,100), sketch.height-90+sketch.random(30,100)
	           , 70+sketch.random(30,100), sketch.height-90+sketch.random(30,100)
	           , 70+sketch.random(30,100), sketch.height-90+sketch.random(30,100)
	   ];
	       
	    this.direction = new p5.Vector(sketch.random(-2,15), sketch.random(-50,-61));
	    this.gravity = 0;
	
		this.display = function(){
			sketch.fill(0);

				this.gravity += 3;

				this.shape[0] += this.direction.x ;
				this.shape[1] += this.direction.y + this.gravity;
				this.shape[2] += this.direction.x ;
				this.shape[3] += this.direction.y + this.gravity ;
				this.shape[4] += this.direction.x ;
				this.shape[5] += this.direction.y + this.gravity;
				this.shape[6] += this.direction.x ;
				this.shape[7] += this.direction.y + this.gravity;

				// this.shape[i+1] += this.direction.y;
			

			sketch.quad(this.shape[0],this.shape[1],this.shape[2],this.shape[3],this.shape[4],this.shape[5],this.shape[6],this.shape[7]);
			
		}

	   }
}

	

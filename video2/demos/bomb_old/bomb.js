/*
 * atomic_bomb.js
 * p5.js app blah blah
 * 
 * Author: Dana Avesar <avesd617@newschool.edu>
 */

var bombSketch = function(sketch){

	sketch.piecesArray = [];


	/**
	 * p5 event to preload data
	 */
	sketch.preload = function () {
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

				sketch.piecesArray[i].move();
				sketch.piecesArray[i].display();

		}

		
	}


	/**
	 * Class Rect (via function)
	 * bleh bleeh
	 */
	 
	sketch.Rect = function(firstPos) {
		this.atomicBomb1 = firstPos;
		this.points = [];

		this.display = function() {
			sketch.fill(0);
				
			sketch.quad(this.points[0],this.points[1],this.points[2],this.points[3],this.points[4],this.points[5],this.points[6],this.points[7]);

		}
		
		/**
		 * move() method
		 * Explode if you move your mouse a little.
		 * Reform if you move your mouse even more
		 */

	    this.move = function() {
	   		//sketch.randomSeed(2);
	    	//sketch.translate(sketch.random(20),0);
	  
	    	for(var i=0; i<8; i++){
	   
	    		// this.points[i] = this.atomicBomb1[i];
	    		if(sketch.millis() > 1000 && sketch.millis()<1100){
	    			if(i%2 == 0){ //x points
	    				sketch.points[i] = sketch.map(sketch.millis(), 1000, 1100, sketch.random(100,105), sketch.atomicBomb1[i]);
	    			}
	    			if(i%2 !== 0){
	    				sketch.points[i] = sketch.map(sketch.millis(), 1000, 1100, sketch.random(sketch.height-10, sketch.height), sketch.atomicBomb1[i]);
	    			}

	    			
	    		
	    		}

	    		// if(millis() > 1100){
	    		// 	translate(millis(),0)
	    		// }
	    
	    		//console.log(mouseX,0,600,atomicBomb1[i],atomicBomb2[i]);
	    		
	    		
	    		//points[i] = map(mouseX, 600,800,atomicBomb2[i], atomicBomb3[i]);
	    		//raondomSeed(5);

	    		//atomicBomb1[i] += random(-mouseX/100,mouseX/100);
	    		//atomicBomb1[i] -= random(-mouseX/100, mouseX/100);
	    	}
	    }
		
	}
}
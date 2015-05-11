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
		sketch.bombPos1 = sketch.loadJSON("demos/bomb_old/bomb_data.json"); // Asynchronous XHR
		sketch.pos2 = sketch.loadJSON("demos/bomb_old/isis.json");
		sketch.pos3 = sketch.loadJSON("demos/bomb_old/isis2.json");

	}

	/**
	 * p5 event once things are preloaded()
	 */
	sketch.setup = function() { 
		sketch.data1 = sketch.organizeData(sketch.bombPos1); 
		sketch.data2 = sketch.organizeData(sketch.pos2);
		sketch.data3 = sketch.organizeData(sketch.pos3);
		/* Prepare grounds for drawing stuff */
		
		sketch.createCanvas(1280,720);
		for( i = 0 ; i < 50 ; i++ ) {
				//console.log(data1[i]);
			sketch.piecesArray[i] = new sketch.Rect( sketch.data1[i], sketch.data2[i], sketch.data3[i]);
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

		console.log(sketch.millis());
		
		for(var i=0; i < 50; i++){

				sketch.piecesArray[i].move();
				sketch.piecesArray[i].display();

		}

		
	}


	/**
	 * Class Rect (via function)
	 * bleh bleeh
	 */
	 
	sketch.Rect = function(firstPos, secondPos, thirdPos) {
		this.atomicBomb1 = firstPos;
		this.atomicBomb2 = firstPos;

		this.isis = secondPos;
		this.isis2 = thirdPos;

		for(var i =0; i<8; i+=2){
			this.atomicBomb2[i] = this.atomicBomb1[i] + 700;

		}
		for(var i=1; i<8; i+=2){
			this.atomicBomb2[i] = this.atomicBomb1[i];
		}
		this.points = [];
		this.direction = new p5.Vector(sketch.random(-2,15), sketch.random(-10,-21));
    	this.gravity = 0;
    	this.val = 1;
    	this.valx = -1;
    	this.firstExplosionTime = 600;
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
	   		sketch.randomSeed(0);
	    	//sketch.translate(sketch.random(20),0);
	  	
	    	for(var i=0; i<8; i++){
	   		
	    	//fire at this time
	    	if(sketch.millis() > this.firstExplosionTime && sketch.millis()<700){
    			if(i%2 == 0){ //x points
    				this.points[i] = sketch.map(sketch.millis(), this.firstExplosionTime, 700, sketch.random(100,105), this.atomicBomb1[i]);
    			}
    			if(i%2 !== 0){
    				this.points[i] = sketch.map(sketch.millis(), this.firstExplosionTime, 700, sketch.random(sketch.height-10, sketch.height), this.atomicBomb1[i]);
    			}	
	    		
	    	}
	    	//keep moving
	    	if(sketch.millis() > this.firstExplosionTime+100){
    			if(i%2 == 0){ //x points
    				if(this.points[i] <0){
    					this.valx = 1;
    				}
    				if(this.points[i] > sketch.width){
    					this.valx = -1;
    				}
    				this.points[i] += this.valx*this.direction.x;
    			}

    			if(i%2 !== 0){
    				if(this.points[i] <0){
    					this.val = -1;
    				}
    				if (this.points[i] > sketch.height){
    					this.val = 1;
    				}
    				this.points[i] += this.val*this.direction.y;
    			}	
    		
    		}

    		//fire at this time
    		if(sketch.millis() > 1700 && sketch.millis()< 1800){
    			if(i%2 == 0){ //x points
    				this.points[i] = sketch.map(sketch.millis(), 1700, 1800, sketch.random(800,805), this.atomicBomb2[i]);
    			}
    			if(i%2 !== 0){
    				this.points[i] = sketch.map(sketch.millis(), 1700, 1800, sketch.random(sketch.height-10, sketch.height), this.atomicBomb2[i]);
    			}	
    		}
    		 //this.isis2Time = 2900;

    		if(sketch.millis() > 2300 && sketch.millis()<2700){
    			this.points[i] = sketch.map(sketch.millis(),2300, 2400, this.points[i], this.isis[i]);
    		}

    		if(sketch.millis() > 2700 && sketch.millis() < 3400){
    			this.points[i] = sketch.map(sketch.millis(),2700,2900, this.points[i], this.isis2[i]);
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
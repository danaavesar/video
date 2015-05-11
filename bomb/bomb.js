/*
 * atomic_bomb.js
 * p5.js app blah blah
 * (You shold use this file header to describe what's going on.)
 * 
 * Author: Dana Avesar <avesd617@newschool.edu>
 */


var piecesArray = [];


/**
 * p5 event to preload data
 */
function preload() {
	bombPos1 = loadJSON("bomb_data.json"); // Asynchronous XHR
    pos2 = loadJSON("isis.json");
    sunni_1 = loadJSON("sunni_1.json");
    sunni_2 = loadJSON("sunni_2.json");

}

/**
 * p5 event once things are preloaded()
 */
function setup() { 
	data1 = organizeData(bombPos1); 
    data2 = organizeData(pos2);
    data3 = organizeData(sunni_1);
    data4 = organizeData(sunni_2);

	/* Prepare grounds for drawing stuff */
	
	createCanvas(1280,720);
	for( i = 0 ; i < 50 ; i++ ) {
			//console.log(data1[i]);
		piecesArray[i] = new Rect( data1[i], data2[i], sunni_1, sunni_2);
	}
	
}

function organizeData(drawscript){
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


function draw(){
	
	background(255);


	
	for(var i=0; i < 50; i++){

			piecesArray[i].move();
			piecesArray[i].display();

		
	}

	//console.log(millis());
}


/**
 * Class Rect (via function)
 * bleh bleeh
 */
 
function Rect(firstPos, secondPos, sunni_1, sunni_2) {
	var atomicBomb1 = firstPos;
    var isis = secondPos;
	var points=[];
	this.direction = new p5.Vector(random(0,15), random(-10,-21));
    this.gravity = 0;
    var val = 1;
    var valx = -1;
    // this.val = 0;
	this.display = function() {
		fill(0);
			
		quad(points[0],points[1],points[2],points[3],points[4],points[5],points[6],points[7]);
	}
	
    this.move = function() {
   		randomSeed(0);
    	//translate(random(20),0);
    	
	//console.log(atomicBomb1);
    	for(var i=0; i<8; i++){

    	   
    		//fire at this time
    		if(millis() > 1000 && millis()<1100){
    			if(i%2 == 0){ //x points
    				points[i] = map(millis(), 1000, 1100, random(100,105), atomicBomb1[i]);
    			}
    			if(i%2 !== 0){
    				points[i] = map(millis(), 1000, 1100, random(height-10, height), atomicBomb1[i]);
    			}	
    		
    		}
            //keep moving
    		if(millis() > 1800 && millis()< 3000){
    			if(i%2 == 0 ){ //x points
                    if (points[i] < 0) {
                        valx = 1;

                    }
                     if (points[i] > width) {
                        valx = -1;

                    }
    				points[i] += valx*this.direction.x ;
    			}       

            
    			if(i%2 !== 0){

                    // if (points[i] > height) {
                    //     this.val == 1;


                    // }
                    if (points[i] < 0) {
                        val = -1;

                    }
                     if (points[i] > height) {
                        val = 1;

                    }
                    
                    //val = -1;
                    points[i] += val*this.direction.y ;
    			}	
                
    		
    		}
            //second fire
    		if(millis() > 1700 && millis()< 1800){
    				if(i%2 == 0){ //x points
    				points[i] = map(millis(), 1700, 1800, random(800,805), atomicBomb1[i]);
    			}
    			if(i%2 !== 0){
    				points[i] = map(millis(), 1700, 1800, random(height-10, height), atomicBomb1[i]);
    			}	
    		}
            //isis
            if(millis() > 3000){
                
               points[i] = map(millis(),3000, 4000, points[i], isis[i]);
                // points[i] = isis[i];
            }
           // randomSeed(5);
/*
    		if(i%2 == 0){
                if(points[i] > width){
                    points[i] -= this.direction.x *random(width);
                }
                if(points[i] < 0){
                    points[i] += this.direction.x *random(width);
                }
    		}

    
            if(i%2 !==0){
                //if(points[i] > height){
                 //   points[i] -= this.direction.y *random(720);
                //}
                if(points[i] < 0){ //x points
                    points[i] -= this.direction.y *random(720);
                    
                }
                if(points[i] > height){ //x points
                    points[i] += this.direction.y *random(720);
                    
                }
            }
    		*/

    		
    		

    		//atomicBomb1[i] -= random(-mouseX/100, mouseX/100);
    	}
    }
}
	

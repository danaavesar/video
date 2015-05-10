
var heartSketch = function(sketch){
  sketch.hL = 0;
  sketch.hR = 0;
  sketch.hM = 0;
  sketch.incr = 0;
  sketch.drawCycle = 0;
  sketch.img;
  sketch.TIMES = 1;

  sketch.preload = function(){
    //sketch.mySound = sketch.loadSound("the_la_la_la_remix.mp3");
    sketch.img = sketch.loadImage("demos/heart_recursion/images/heart_top.png");
  } 

  sketch.setup = function() { 
    sketch.mainCanvas = sketch.createCanvas(1280,720); 
    sketch.smooth(); 
   // sketch.mySound.play();
  }

  sketch.heartbeat = function() {
    console.log("The beating of my dying heart <3 <3 <3");
  }

  sketch.draw = function() 
  { 
    sketch.drawCycle++;
   
    if(sketch.drawCycle%sketch.TIMES == 0) {
      sketch.heartbeat();
      //hL = cos(drawCycle*2)*.05 + .05;
      sketch.hL = sketch.sin(2*sketch.drawCycle)*.05 + 0.05 +sketch.pow(sketch.sin(2*sketch.drawCycle),2)*0.05 + .05;
      sketch.hR = sketch.sin(2*sketch.drawCycle)*-.02 + -0.02 +sketch.pow(sketch.sin(2*sketch.drawCycle),2)* -0.02 -.02;
      sketch.hM = sketch.sin(2*sketch.drawCycle)*.02 + 0.02 +sketch.pow(sketch.sin(2*sketch.drawCycle),2)* 0.02 +.02;
      //hR = sin(drawCycle*2)*-.02 + -.02;
      //hM = sin(drawCycle*2)*.02 + .02;
      //incr = sin(drawCycle*2)*5 + 5;
    }
    
    //console.log(sketch.hL);

    //Set background color
    sketch.background(255);    
    sketch.strokeWeight(14); 
    //imageMode(CENTER);
    sketch.translate(sketch.windowWidth/2-100, 80);
    sketch.image(sketch.img,-5,-50, 210 + sketch.incr,140 +sketch.incr);
    sketch.randomSeed(2);

   
    // noStroke();
    // fill(0,255,0); // spectrum is green
    /*
   for (var i = 0; i< spectrum.length; i++){
      y = map(i, 3, 4, 0, width);
      soundValues.heightT[i] = -height + map(spectrum[i], 0, 255, height, 0);
     // rect(y, height, width/spectrum.length, h) ;
      //return h;
    }*/

    // var spectrum = fft.analyze(); 
    // var beat1 = -height + map(spectrum[3], 0, 255, height, 0);
    // var beat2 = -height + map(spectrum[4], 0, 255, height, 0);

    // console.log("Beat3:" + beat1);
    // console.log("Beat4:" + beat2);


    //left branch
    sketch.push();
    sketch.rotate(1); 
    sketch.branch(0,12,sketch.hL,-.5,.4,-.4,20);
    sketch.pop();
    sketch.randomSeed(6);
    
    //right branch
    sketch.push();
    sketch.translate(180,0);
    sketch.rotate(-.9);
    sketch.branch(0,12,sketch.hR,-.3,.4,.1,12);
    sketch.pop();
      
    //middle branch
   sketch.push();
   sketch.randomSeed(2);
   //strokeWeight(14);
   sketch.translate(150,0);
   sketch.rotate(.8);
    sketch.branch(0,12,sketch.hM,-.4,.2,-.2,13);
    //-rotate goes to the right
   sketch.pop();
  /*
    //filler branch right
   push();
   strokeWeight(5);
   translate(180,0);
   branch(0,15,h,-.4,.4,-.4,25);
   pop();

   //filler branch left
   push();
   randomSeed(2);
   strokeWeight(2);
   rotate(.2);
   translate(70,-20);
   branch(0,13,h,-.2,.4,-.4,70);
   pop();
   */
    
  } 

  sketch.branch = function(depth,depth2,h,r1,r2,r3,ht){ 

    if (depth < depth2) {
      sketch.line(0 ,0 ,0,sketch.windowHeight/ht);  
        sketch.translate(0,sketch.windowHeight/ht);
        sketch.rotate(sketch.random(r1 + h,r2));  
        //rotate(h); 
       // translate(y,0);
        if (sketch.random(1.0) < 0.4){ // branching   
          sketch.rotate(r3);
          sketch.scale(0.7);
          sketch.push(); 
          sketch.branch( depth + 1,depth2,h, r1, r2, r3, ht); 
          sketch.pop();     
          sketch.rotate(.4);
          sketch.push(); 
          sketch.branch(depth + 1,depth2,h, r1, r2, r3, ht);    
          sketch.pop();         
        } 
        else { // continue   
          sketch.branch(depth,depth2,h, r1, r2, r3, ht);
        }  
    }
  } 
}







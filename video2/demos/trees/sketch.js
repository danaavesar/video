/* tree branch */
// tree variables
var treeSketch = function( sketch ) {
  sketch.mousex;
  sketch.mousey;
  sketch.preload = function(){
    //sketch.mySound = sketch.loadSound("the_la_la_la_remix.mp3");
  } 

  sketch.setup = function() { 
    sketch.mainCanvas = sketch.createCanvas(1280,720); 
    sketch.smooth(); 
  }

  sketch.draw = function(){
   //tree branch
   //console.log("tree");
    sketch.background(255);
    sketch.strokeWeight(10);
    sketch.translate(sketch.width/2,sketch.height-20);
    sketch.mousex = sketch.map(sketch.mouseX,0,sketch.mainCanvas.width,-.2,.2);
    sketch.mousey = sketch.map(sketch.mouseY, 0, sketch.mainCanvas.height, -.1, .1);
    //left big
    sketch.push();
    sketch.randomSeed(1); 
    sketch.translate(-200, 200);
    sketch.scale(2.3);
    sketch.treeBranch(0, sketch.mousex -.02, sketch.mousey); 
    sketch.pop();
    //right medium
    // sketch.push();
    // sketch.randomSeed(7); 
    // sketch.translate(300, 30);
    // sketch.scale(2);
    // sketch.treeBranch(0, sketch.mousex, sketch.mousey); 
    // sketch.pop();
    //right big
    sketch.push();
    sketch.randomSeed(4); 
    sketch.translate(350, 600);
    sketch.scale(2.5);
    sketch.strokeWeight(12);
    sketch.treeBranch(0, sketch.mousex, sketch.mousey); 
    sketch.pop();
    //right small
    sketch.push();
    sketch.randomSeed(2);
    sketch.translate(200,-160);
    sketch.scale(.5);
    sketch.treeBranch(0, sketch.mousex +.05, sketch.mousey);
    sketch.pop();
    //left small 
    sketch.push();
    sketch.randomSeed(3);
    sketch.translate(-200,-260);
    sketch.scale(.8);
    sketch.treeBranch(0, -sketch.mousex, sketch.mousey);
    sketch.pop(); 
    // sketch.strokeWeight(10);
    // sketch.translate(sketch.width/2,sketch.height-20);
    // sketch.mousex = sketch.map(sketch.mouseX,0,sketch.width,-.1,.1);
    // sketch.mousey = sketch.map(sketch.mouseY, 0, sketch.height, -.1, .1);
    // //right branch
    // sketch.randomSeed(10); 
    // sketch.treeBranch(0, sketch.mousex, sketch.mousey); 
    // //left branch
    // sketch.randomSeed(5);
    // sketch.scale(2);
    // sketch.translate(-300, 0);
    // sketch.treeBranch(0, sketch.mousex, sketch.mousey);


  }
    
  sketch.treeBranch = function(depth, mousex, mousey){ 
    
    if (depth < 11) { 
      sketch.line(0,0,0,-sketch.height/8); 
        sketch.translate(0,-sketch.height/8); 
        sketch.rotate(mousex);  
       
        if (sketch.random(1) < .6){ // branching   
          sketch.rotate(0.3);
          sketch.scale(0.7);
          sketch.push(); 
          sketch.treeBranch(depth + 1,mousex,mousey); 
          sketch.pop();     
          sketch.rotate(-0.6);
          sketch.push(); 
          sketch.treeBranch(depth + 1,mousex,mousey);    
          sketch.pop();         
        } 
        else { // continue   
          sketch.treeBranch(depth,mousex,mousey);
        } 
       
    }
  } 
}







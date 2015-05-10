  //var pop;
var script2 = {
  popcorn: null,
  clicked: false,
  ready: false,
  timesClicked: 0,
  video1: "assets/cut1_beginning_3.webm",
  video1_2: "assets/cut1_beginning_3.mp4",

  init: function() {

    var pop;
  
    pop = Popcorn.smart("#videoClip2", [script2.video1,script2.video1_2]);
    var rdy = pop.readyState();
    pop.autoplay(false);
        var loaded = function(){
      var buff = pop.buffered();
      if ( buff.length > 0 && buff.end(0) > ( pop.duration() / 4 ) ) {
        script2.ready = true;
        console.log("LOADED");
      } else{
        console.log("still loading...");
        setTimeout(loaded, 10);
      }
    }
    loaded();

    pop.on( "canplayall", function(e) {
      main.prepareVideo2();
    });  

    pop.on( "play", function(e) {
        $("#pauseButton").addClass("fa-pause");
        $("#pauseButton").removeClass("fa-play"); 
    });

    pop.on( "pause", function(e) {
        $("#pauseButton").removeClass("fa-pause");
        $("#pauseButton").addClass("fa-play"); 
    });   

    pop.on("timeupdate", function(e) {
      var position = pop.currentTime() / pop.duration();
      var width = position * $("#main").width();
      $("#progress").css('width', width);
    });

    //   pop.code({
    //   start: 1 ,
    //   onStart: function( options ) {

    //     var position = main.getRelativePosition({left:-177.5, top:463} );
    //     main.sketch = new p5(treeSketch, "sketchCanvas");
        
    //   }
    // });

    script2.popcorn = pop;

  }


}

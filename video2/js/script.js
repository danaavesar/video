  //var pop;
var script = {
  popcorn: null,
  clicked: false,
  ready: false,
  timesClicked: 0,
  // video1: "assets/MVI_9980.webm",
  // video1_2: "assets/MVI_9980.mp4",
  video1: "assets/cut2_noaudio.webm",
  video1_2: "assets/cut2_noaudio.mp4",
  heart_image: "heart_top.png",
  song: null,
  init: function() {
   
    var pop2;
    var pop;
    pop = Popcorn.smart("#videoClip", [script.video1,script.video1_2]);
        pop.preload("auto");
        pop.preload("auto");

    pop2 = Popcorn.smart("#song", ["assets/the_la_la_la_remix.mp3"]);

    var loaded = function(){
      var buff = pop.buffered();
      if ( buff.length > 0 && buff.end(0) > ( pop.duration() / 4 ) ) {
        script.ready = true;
        console.log("LOADED");
      } else{
        console.log("still loading...");
        setTimeout(loaded, 10);
      }
    }

    loaded();
    pop.autoplay(false);

    pop.on( "canplayall", function(e) {
      main.prepareVideo();
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

    pop2.code({
    start: .2 ,

    onStart: function( options ) {

      //var position = main.getRelativePosition({left:-177.5, top:463} );
      main.sketch = new p5(heartSketch, "sketchCanvas");
      
    }
    });

    pop2.code({
      start:3.2,
      onStart: function(options){
        main.sketch.remove();
      }
    })

    pop2.code({
      start: 3.2,
      onStart: function(options){
        pop.play();
        $("#videoCanvas").show();
        main.videoStart = true;
        main.sketch = new p5(bombSketch, "sketchCanvas");
      }
    })



    // pop2.code({
    //   start:1,
    //   onStart: function(options){
    //     main.sketch = new p5(heart)
    //   }
    // });

    script.popcorn = pop;
    script.song = pop2;

  }


}

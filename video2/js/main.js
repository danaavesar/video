var main = {
  sketch: null,
  scaleFactor: 1.0,
  debug: false, 
  clicked: false,
  timesClicked: 0,
  videoStart: false,
  //video1: "assets/MVI_9980.webm",
  //video1_2: "assets/MVI_9980.mp4",
  // Initalize Demo

  init: function() {

    main.resize();

    // Popcorn Setup

    script.init();  
    script2.init();
    // Events
 
    
  
    if (main.debug) {
      $(document).click( function(e) {
        console.log( script.popcorn.currentTime());
        var clickX = e.pageX - ($(window).width()/2)
          clickY = $(window).height() - e.pageY;
        console.log( "{left:" + clickX + ", top:" + clickY + "}");
      });
    }

    $(window).resize( function() {
      main.resize();
    });

    // Keyboad events

    if (main.debug) { 
      $('body').keypress(function(e){
        
        var keypress = String.fromCharCode(e.which);

        // Pause

        // if(keypress == "p"){
        //   if (script.popcorn.paused())
        //     // script.popcorn.play();
        //   else
        //     script.popcorn.pause();
        // }

        if(keypress == "."){
          if (!script.popcorn.paused()) script.popcorn.pause();
          script.popcorn.currentTime( script.popcorn.currentTime() + (1.0/30.0));
          console.log( script.popcorn.currentTime());
        }   

        if(keypress == ","){
          if (!script.popcorn.paused()) script.popcorn.pause();
          script.popcorn.currentTime( script.popcorn.currentTime() - (1.0/30.0));
          console.log( script.popcorn.currentTime());
        }          

      });   
    } 


    // Buttons

    $("#pause").click( function () {
      if (script.popcorn.paused()) {
        console.log("Play");
        // script.popcorn.play();
        script2.popcorn.play();
        script.song.play();  
      } else {             
        script.popcorn.pause();
        script2.popcorn.pause();
        script.song.pause();
      }
    });

    $("#begin").click( function() {
      main.playVideo();
    });
    $("#begin").button('loading');

    // Pause on click

    $("a")
        .attr('target', "_blank")
        .click(function () {
            script.popcorn.pause();
            script2.popcorn.pause();
            script.song.pause();
        });

    //change videos on click

    if(main.videoStart){
       // $("#videoCanvas").show();

      $("#main").click(function(){
     
          $("#videoCanvas2").toggle();
          //$("#sketchCanvas").toggle();
          //$("#sketchCanvas2").toggle();
          $("#videoCanvas").toggle();
        
        console.log("click");
      });
    } 

    // Show welcome

    $("#welcome").fadeIn();

  },

  prepareVideo: function() {
      // Setup Seriously

      var seriously,
      chroma, target;

      seriously = new Seriously();

      target = seriously.target('#videoCanvas');
      chroma = seriously.effect('chroma');

      if (Modernizr.video.webm && Modernizr.video.h264) {
        //console.log("Chrome");
        chroma.weight = 1;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = 0;
        chroma.screen = [0,1,0,1];
      } else if (!Modernizr.video.webm && Modernizr.video.h264) {
        //console.log("Safari");
        chroma.weight = 1.05;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = .3;        
        chroma.screen = [.14,.95,0,1];
      } else if (Modernizr.video.webm && !Modernizr.video.h264) {
        //console.log("Firefox");
        chroma.weight = .92;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = .3;        
        chroma.screen = [.140,.74,.45,1];
      }
      

      chroma.source = "#"+script.popcorn.media.id;
      target.source = chroma;
      seriously.go();

      // Set button state

      $("#begin").button('reset');
  },



  prepareVideo2: function() {
      // Setup Seriously

      var seriously,
      chroma, target;

      seriously = new Seriously();

      target = seriously.target('#videoCanvas2');
      chroma = seriously.effect('chroma');

      if (Modernizr.video.webm && Modernizr.video.h264) {
        //console.log("Chrome");
        chroma.weight = 1;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = 0;
        chroma.screen = [0,1,0,1];
      } else if (!Modernizr.video.webm && Modernizr.video.h264) {
        //console.log("Safari");
        chroma.weight = 1.05;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = .3;        
        chroma.screen = [.14,.95,0,1];
      } else if (Modernizr.video.webm && !Modernizr.video.h264) {
        //console.log("Firefox");
        chroma.weight = .92;
        chroma.balance = 1;
        chroma.clipWhite = 1;
        chroma.clipBlack = .3;        
        chroma.screen = [.140,.74,.45,1];
      }
      

      chroma.source = "#"+script2.popcorn.media.id;
      target.source = chroma;
      seriously.go();

      // Set button state

      $("#begin").button('reset');
  },

  playVideo: function() {

    //console.log("Starting video.");
    //console.log("Length " + script.popcorn.duration() + ".");

    $("#welcome").fadeOut();
    // $("#videoCanvas2").fadeToggle(); 
    $("#p5").fadeIn(); 
    $("#pause").fadeIn();
    console.log(script.ready);
    var time = main.getStartTime();
    if(script.ready && script2.ready){
      // script.popcorn.play(time);
      script.song.play(time);  
      script2.popcorn.play(time);  
    }

  },

  getStartTime: function () {

    var hash = top.location.hash.replace('#', ''), time = 0;
    if (hash.length > 0) {
      time = parseFloat(hash);
      console.log("Playing from " + time + ".");
    }

    return time;

  },

  getRelativePosition: function(position) {

      videoBaseX = $("#main").width()/2;
      videoBaseY = $("#main").height();

      position.left = videoBaseX + position.left;
      position.top = videoBaseY - position.top;
  
      return position;

  },

  resize: function() {
      var transform = "none";
      var ratio = 1.0;

      if (window.innerWidth < 1280 || window.innerHeight < 800) {
        ratio = window.innerWidth / 1280;
        if (ratio * 800 > window.innerHeight) {
          ratio = window.innerHeight / 800;
        }
        transform = 'scale('+ratio+')';
      } 

      main.scaleFactor = ratio;
      if (main.sketch) main.sketch.scaleFactor = main.scaleFactor;
      $('#main').css('transform', transform);
  }

}
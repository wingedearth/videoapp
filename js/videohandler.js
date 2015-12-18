//default video settings
var $vid, vid, $playbtn, $seekslider, seekslider, time, $player;
var $currentTimeText, $durationTimeText, $mutebtn;
var $volumeslider, $fullscreenbtn, fullscreenbtn;

$(document).ready(function() {
  window.onload = initializePlayer;
});


  function initializePlayer() {

    // jQuery element variables
    $player = $('#player');
    $vid = $('#myVideo');
    $playbtn = $('#playpausebtn');
    $seekslider = $('#seekslider');
    $currentTimeText = $('#currentTimeText');
    $durationTimeText = $('#durationTimeText');
    $mutebtn = $('#mutebtn');
    $volumeslider = $('#volumeslider');
    $fullscreenbtn = $('#fullscreenbtn');

    // DOM element variables
    vid = $vid[0];
    seekslider = $seekslider[0];
    volumeslider = $volumeslider[0];
    fullscreenbtn = document.getElementById('fullscreenbtn');

    // initialize video state
    vid.loop = true;
    vid.muted = false;
    vid.autoplay = true;
    vid.controls = false;

    // add event listeners
    $playbtn.on('click', playPause);
    $mutebtn.on('click', toggleMute);
    $seekslider.on("change", vidSeek);
    $vid.on("timeupdate", seektimeupdate);
    var durationT = fixTime(vid.duration);
    $durationTimeText.html(durationT);
    $volumeslider.on('change', setVolume);
    // $fullscreenbtn.on('click', toggleFullScreen(vid));
    fullscreenbtn.onclick = function() {
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
      } else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      }
    };
  } // function initializePlayer()

  function setVolume() {
    vid.volume = volumeslider.value / 100;
  }

  function toggleMute() {
    console.log('toggled!');
    if (vid.muted) {
      vid.muted = false;
      $mutebtn.html("mute")
    } else {
      vid.muted = true;
      $mutebtn.html("unmute")
    }
  }

  function seektimeupdate() {
    var newTime = vid.currentTime * (100 / vid.duration);
    seekslider.value = newTime;
    var currentT = fixTime(vid.currentTime);
    var durationT = fixTime(vid.duration);
    $currentTimeText.html(currentT);
    $durationTimeText.html(durationT);
  }

  function playPause() {
    if (vid.paused) {
      vid.play();
      $playbtn.html("pause");
    } else {
      vid.pause();
      $playbtn.html("play");
    }
  }

  function vidSeek() {
    var seekto;
    seekto = (vid.duration) * (seekslider.value / 100);
    console.log("$vid.duration: ", vid.duration);
    console.log("seekto: ", seekto);
    document.getElementById('myVideo').currentTime = seekto;
    // $vid.currentTime = seekto;
  }

  function fixTime(time) {
    var minutes = Math.floor(time/60);
    var seconds = Math.floor(time-(minutes/60));
    if (minutes < 10) { minutes = "0" + minutes.toString(); }
    else { minutes = minutes.toString(); }
    if (seconds < 10) { seconds = "0" + seconds.toString(); }
    else { seconds = seconds.toString(); }
    var fixedTime = minutes + ":" + seconds;
    return fixedTime;
  }



//http://www.shutterstock.com/video/clip-909058-stock-footage-loopable-background-flying-golden-particles-in-light-beams.html?src=:sf_category_text/JBtuRxM8SDCfuoi-RFcIRQ:2:69/3p

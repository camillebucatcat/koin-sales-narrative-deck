$(document).ready(function () {
  AOS.init();

  var videos = $('video');
  var videosLoaded = 0;

  function checkVideosLoaded() {
    videosLoaded++;
    if(videosLoaded === videos.length) {
      $('.preloader').addClass('hide');

      setTimeout(()=>{
        $('.logo').addClass('visible');
        $('#nav').addClass('visible');
      }, 200);
    }
  }

  videos.each(function(){
    var video = this;
    video.onloadeddata = checkVideosLoaded;
  });

  $('.nav-item').click(function () {
    var id = $(this).attr('id');
    var currentSection = $('#section'+id);
    var currentVideo =  videojs('#video'+id);

    $('section').addClass('hide').removeClass('show').not(currentSection);
    currentSection.addClass('show').removeClass('hide');
    $('section.hide video').each(function(){
      this.pause();
      this.currentTime = 0;
    });
    currentVideo.play();
  });
});



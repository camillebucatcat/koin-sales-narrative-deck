$(document).ready(function () {
  AOS.init();

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



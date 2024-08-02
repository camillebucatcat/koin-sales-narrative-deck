$(document).ready(function () {
  AOS.init();

  $('.nav-item').click(function () {
    var id = $(this).attr('id');
    var currentSection = $('#section'+id);
    var video =  videojs('#video'+id);

    $('section').addClass('hide').removeClass('show').not(currentSection);
    currentSection.addClass('show').removeClass('hide');
    video.play();
  });
});



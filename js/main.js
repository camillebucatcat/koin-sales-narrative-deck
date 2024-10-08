$(document).ready(function () {
    AOS.init();

    var videos = $('video');
    var videosLoaded = 0;
    let lastClickedButton = null;
    let videoPlaybackState = {}; // 1 for played, 0 for not played

    // function checkVideosLoaded() {
    //     videosLoaded++;
    //     if (videosLoaded === videos.length) {
    //         $('.preloader').addClass('hide');

    //         setTimeout(() => {
    //             $('.logo').addClass('visible');
    //             $('#nav').addClass('visible');
    //         }, 200);
    //     }
    // }

    videos.each(function () {
        var video = this;
        // video.onloadeddata = checkVideosLoaded;
    });

    $('.nav-item').click(function () {
        var id = $(this).attr('id');
        var currentSection = $('#section' + id);
        var currentVideo = videojs('#video' + id);

        $('section').addClass('hide').removeClass('show').not(currentSection);
        currentSection.addClass('show').removeClass('hide');

        // Pause and reset all other videos
        $('section.hide video').each(function () {
            if (!this.ended) {
                this.pause();
                this.currentTime = 0;
            }
        });

        if (videoPlaybackState[id] !== 1) {
            currentVideo.one('ended', function () {
                videoPlaybackState[id] = 0; 
                
                // Reset buttons and video state
                $('.nav-item').each(function () {
                    const $nav = $(this);
                    $nav.removeClass('hidden returning');
                    $nav.css('transform', '');
                    $nav.removeClass('moved');
                });
                $('#logo').removeClass('moved');
            });

            currentVideo.play();
            videoPlaybackState[id] = 1;
        } else {
            // If the video is already playing do not reset it
            if (currentVideo.paused()) {
                currentVideo.currentTime(0);
                currentVideo.play();
            }
        }

        lastClickedButton = $(this);
    });
});

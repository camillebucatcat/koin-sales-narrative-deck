$(document).ready(function () {
  AOS.init();

  // const myFullPageWithFadeIn = fullPageWithFadeIn({
  //   sectionSelector: '.section',
  //   scrollDuration: 1000,
  //   easingFunction: 'easeInOutCubic',
  //   // fadeInDuration: 500 // Adjust fade-in duration as needed
  // });

  // myFullPageWithFadeIn.init();

//   const myFullPageWithOverscrollStop = fullPageWithOverscrollStop({
//     sectionSelector: '.section',
//     scrollDuration: 1000,
//     easingFunction: 'easeInOutCubic'
//   });

//   myFullPageWithOverscrollStop.init();
// });


const sections = {
  logo: $('.logo'),
  level: {
    button: $('#show-video-1'),
    section: $('#level'),
    video: videojs('#my-video-1') 
  },
  cashless: {
    button: $('#show-video-2'),
    section: $('#cashless'),
    video: videojs('#my-video-2') 
  },
  koinintro: {
    button: $('#show-video-3'),
    section: $('#koinintro'),
    video: videojs('#my-video-3') 
  },
  gamechanger: {
    button: $('#show-video-4'),
    section: $('#gamechanger'),
    video: videojs('#my-video-4') 
  }
};

let currentVisibleSection = null;

const handleClick = (currentSection) => {
  if (currentVisibleSection && currentVisibleSection !== currentSection) {
    currentVisibleSection.section.removeClass('visible').addClass('hidden');
    setTimeout(() => {
      currentVisibleSection.section.hide();
    }, 300);
    if (currentVisibleSection.video) {
      currentVisibleSection.video.pause();
    }
  }

  if (!currentSection.section.hasClass('visible')) {
    sections.logo.removeClass('visible').addClass('hidden');
    setTimeout(() => {
      sections.logo.hide();
      currentSection.section.show();
      setTimeout(() => {
        currentSection.section.removeClass('hidden').addClass('visible');
      }, 10);
    }, 300);
    if (currentSection.video) {
      currentSection.video.play(); 
    }
    currentVisibleSection = currentSection;
  } else {
    if (currentSection.video) {
      currentSection.video.play();
    }
  }
};

sections.level.button.on('click', function (event) {
  event.preventDefault();
  handleClick(sections.level);
});

sections.cashless.button.on('click', function (event) {
  event.preventDefault();
  handleClick(sections.cashless);
});

sections.koinintro.button.on('click', function (event) {
  event.preventDefault();
  handleClick(sections.koinintro);
});

sections.gamechanger.button.on('click', function (event) {
  event.preventDefault();
  handleClick(sections.gamechanger);
});
});
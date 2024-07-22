$(document).ready(function () {
  AOS.init();

  // const myFullPageWithFadeIn = fullPageWithFadeIn({
  //   sectionSelector: '.section',
  //   scrollDuration: 1000,
  //   easingFunction: 'easeInOutCubic',
  //   // fadeInDuration: 500 // Adjust fade-in duration as needed
  // });

  // myFullPageWithFadeIn.init();

  const myFullPageWithOverscrollStop = fullPageWithOverscrollStop({
    sectionSelector: '.section',
    scrollDuration: 1000,
    easingFunction: 'easeInOutCubic'
  });

  myFullPageWithOverscrollStop.init();
});
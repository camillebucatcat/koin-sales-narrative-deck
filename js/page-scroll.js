
function fullPageWithOverscrollStop(options) {
  const defaultOptions = {
    sectionSelector: '.section',
    scrollDuration: 1000,
    easingFunction: 'easeInOutCubic'
  };

  const settings = Object.assign({}, defaultOptions, options);

  const sections = document.querySelectorAll(settings.sectionSelector);
  let currentSectionIndex = 0;
  let isAnimating = false;

  function scrollToSection(index) {
    if (isAnimating || index === currentSectionIndex) return;

    const windowHeight = window.innerHeight;
    const targetPosition = index * windowHeight;

    isAnimating = true;
    const startTime = performance.now();
    const startScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    function scrollStep(timestamp) {
      const progress = (timestamp - startTime) / settings.scrollDuration;
      const easeProgress = easeInOutCubic(progress);
      const scrollPosition = startScrollPosition + (targetPosition - startScrollPosition) * easeProgress;

      window.scrollTo(0, scrollPosition);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        isAnimating = false;
        currentSectionIndex = index;
      }
    }

    requestAnimationFrame(scrollStep);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function handleMouseWheel(event) {
    const delta = Math.sign(event.deltaY);

    if (delta > 0) {
      // Scroll down
      if (currentSectionIndex < sections.length - 1) {
        const nextSectionOffset = sections[currentSectionIndex + 1].offsetTop;
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (currentScrollPosition + windowHeight >= nextSectionOffset) {
          scrollToSection(currentSectionIndex + 1);
        }
      }
    } else if (delta < 0) {
      // Scroll up
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }

  function handleArrowKeys(event) {
    if (event.key === 'ArrowDown') {
      // Scroll down
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      // Scroll up
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }

  function handleResize() {
    scrollToSection(currentSectionIndex);
  }

  function addEventListeners() {
    window.addEventListener('wheel', handleMouseWheel);
    window.addEventListener('keydown', handleArrowKeys);
    window.addEventListener('resize', handleResize);
  }

  function init() {
    addEventListeners();
  }

  return {
    init
  };
}

// function fullPageWithFadeIn(options) {
//   const defaultOptions = {
//     sectionSelector: '.section',
//     scrollDuration: 1000,
//     easingFunction: 'easeInOutCubic',
//     fadeInDuration: 500 // Duration for fade-in effect in milliseconds
//   };

//   const settings = Object.assign({}, defaultOptions, options);

//   const sections = document.querySelectorAll(settings.sectionSelector);
//   let currentSectionIndex = 0;
//   let isAnimating = false;

//   function scrollToSection(index) {
//     if (isAnimating || index === currentSectionIndex) return;

//     const windowHeight = window.innerHeight;
//     const targetPosition = index * windowHeight;

//     isAnimating = true;
//     const startTime = performance.now();
//     const startScrollPosition = window.pageXOffset || document.documentElement.scrollTop;

//     function scrollStep(timestamp) {
//       const progress = (timestamp - startTime) / settings.scrollDuration;
//       const easeProgress = easeInOutCubic(progress);
//       const scrollPosition = startScrollPosition + (targetPosition - startScrollPosition) * easeProgress;

//       window.scrollTo(0, scrollPosition);

//       // Fade in the target section
//       if (progress >= 0.5) {
//         const fadeInProgress = (progress - 0.5) / 0.5;
//         sections[index].style.opacity = fadeInProgress;
//       }

//       if (progress < 1) {
//         requestAnimationFrame(scrollStep);
//       } else {
//         // Ensure opacity is fully faded in when animation completes
//         sections[index].style.opacity = 1;
//         isAnimating = false;
//         currentSectionIndex = index;
//       }
//     }

//     requestAnimationFrame(scrollStep);
//   }

//   function easeInOutCubic(t) {
//     return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
//   }

//   function handleMouseWheel(event) {
//     const delta = Math.sign(event.deltaY);

//     if (delta > 0) {
//       // Scroll down
//       if (currentSectionIndex < sections.length - 1) {
//         scrollToSection(currentSectionIndex + 1);
//       }
//     } else if (delta < 0) {
//       // Scroll up
//       if (currentSectionIndex > 0) {
//         scrollToSection(currentSectionIndex - 1);
//       }
//     }
//   }

//   function handleArrowKeys(event) {
//     if (event.key === 'ArrowDown') {
//       // Scroll down
//       if (currentSectionIndex < sections.length - 1) {
//         scrollToSection(currentSectionIndex + 1);
//       }
//     } else if (event.key === 'ArrowUp') {
//       // Scroll up
//       if (currentSectionIndex > 0) {
//         scrollToSection(currentSectionIndex - 1);
//       }
//     }
//   }

//   function handleResize() {
//     // Recalculate section positions on resize
//     sections.forEach((section, index) => {
//       section.style.opacity = index === currentSectionIndex ? 1 : 0; // Reset opacity
//     });

//     scrollToSection(currentSectionIndex);
//   }

//   function addEventListeners() {
//     window.addEventListener('wheel', handleMouseWheel);
//     window.addEventListener('keydown', handleArrowKeys);
//     window.addEventListener('resize', handleResize);
//   }

//   function init() {
//     // Initialize opacity for sections
//     sections.forEach((section, index) => {
//       section.style.opacity = index === currentSectionIndex ? 1 : 0;
//     });

//     addEventListeners();
//   }

//   return {
//     init
//   };
// }
$(document).ready(function() {
  const $navItems = $('.nav-item');
  const $logo = $('#logo');
  let lastClickedItem = null;

  function resetButtons() {
      $navItems.each(function() {
          const $nav = $(this);
          $nav.removeClass('hidden returning');
          $nav.css('transform', '');
          $nav.removeClass('moved');
      });
      $logo.removeClass('moved');
      $logo.css('transform', '');
  }

  function animateButton($item) {
      const $firstItem = $('.nav-item').first();
      const firstItemRect = $firstItem[0].getBoundingClientRect();
      const itemRect = $item[0].getBoundingClientRect();
      const translateX = firstItemRect.left - itemRect.left;
      const translateY = firstItemRect.top - itemRect.top;

      if ($item.is($logo)) {
          // Logo button click
          $logo.addClass('moved');
          $logo.css('transform', 'rotate(360deg)');
          resetButtons(); // Reset all other buttons
          lastClickedItem = $logo;
      } else {
          // Other buttons click
          if (lastClickedItem && lastClickedItem[0] === $item[0]) {
              resetButtons();
              lastClickedItem = null;
          } else {
              resetButtons();
              $navItems.each(function() {
                  const $nav = $(this);
                  if ($nav[0] !== $item[0]) {
                      $nav.addClass('hidden');
                  } else {
                      $nav.addClass('moved');
                      $nav.css('transform', `translate(${translateX}px, ${translateY}px) rotate(360deg)`);
                  }
              });
              lastClickedItem = $item;
          }
      }
  }

  $navItems.on('click', function() {
      animateButton($(this));
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const firstItem = navItems[0];
    const firstItemRect = firstItem.getBoundingClientRect();
    let lastClickedItem = null;
  
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (lastClickedItem === item) {
          // Clicking the same item again
          navItems.forEach(nav => {
            nav.classList.remove('hidden');
            nav.style.transform = '';
            nav.classList.remove('moved');
          });
          lastClickedItem = null;
        } else {
          const itemRect = item.getBoundingClientRect();
          const translateX = firstItemRect.left - itemRect.left;
          const translateY = firstItemRect.top - itemRect.top;
  
          navItems.forEach(nav => {
            if (nav !== item) {
              nav.classList.add('hidden');
            } else {
              nav.classList.add('moved');
              nav.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
          });
          lastClickedItem = item;
        }
      });
    });
  });
  
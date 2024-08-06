$(document).ready(function() {
    const $navItems = $('.nav-item');
    
    let lastClickedItem = null;

    $navItems.each(function() {
        const $item = $(this);
        
        $item.on('click', function() {
            const $firstItem = $('.nav-item').first();
            
            const firstItemRect = $firstItem[0].getBoundingClientRect();

            if (lastClickedItem && lastClickedItem[0] === this) {
                $navItems.each(function() {
                    const $nav = $(this);
                    $nav.removeClass('hidden');
                    $nav.css('transform', '');
                    $nav.removeClass('moved');
                });
                lastClickedItem = null;
            } else {
                const itemRect = this.getBoundingClientRect();
                
                const translateX = firstItemRect.left - itemRect.left;
                const translateY = firstItemRect.top - itemRect.top;

                $navItems.each(function() {
                    const $nav = $(this);
                    if ($nav[0] !== $item[0]) {
                        $nav.addClass('hidden');
                    } else {
                        $nav.addClass('moved');
                        $nav.css('transform', `translate(${translateX}px, ${translateY}px)`);
                    }
                });
                lastClickedItem = $item;
            }
        });
    });
});

$(document).ready(function() {
    const $navItems = $('.nav-item');
    let lastClickedItem = null;

    const handleClick = ($item) => {
        if (lastClickedItem && lastClickedItem !== $item[0]) {
            $(lastClickedItem).removeClass('visible').addClass('hidden');
        }

        $item.removeClass('hidden').addClass('visible');

        lastClickedItem = $item[0];
    };
    $navItems.on('click', function() {
        const $item = $(this);
        handleClick($item);
    });
    $navItems.removeClass('hidden').addClass('visible');
});

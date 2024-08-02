$(document).ready(function() {
    const $navItems = $('.nav-item');

    const handleClick = ($item) => {
        $item.removeClass('hidden').addClass('visible');
    };

    $navItems.on('click', function() {
        const $item = $(this);
        handleClick($item);
    });

    $navItems.removeClass('hidden').addClass('visible');
});

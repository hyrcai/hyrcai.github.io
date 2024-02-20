// hide loader on load
$(window).on('load', function () {
    $('body > *:not([data-include="loader"])').css('opacity', '1');
    // setTimeout(function () {
        $('#loader').addClass('hidden');
        $('#loader').css('visibility', 'hidden');
        $('html').css('overflow-y', 'auto');
    // }, 3000);
});

// load top and bottom nav
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = '/include/' + $(this).data('include') + '.html'
        $(this).load(file)
    })
})

//disable right click
// document.addEventListener('contextmenu', event => event.preventDefault());
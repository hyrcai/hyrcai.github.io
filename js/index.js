// load top and bottom nav
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = '/include/' + $(this).data('include') + '.html'
        $(this).load(file);
    })
})

// hide loader on load
$(window).on('load', function () {
    // setTimeout(function () {
        $('body>:not([data-include="loader"])').css('opacity', '1');
        $('#loader').addClass('hidden');
        setTimeout(function () {
            $('#loader').css('display', 'none');
        }, 750);
        $('html').css('overflow-y', 'auto');
    // }, 3000);

});

//disable right click
// document.addEventListener('contextmenu', event => event.preventDefault());
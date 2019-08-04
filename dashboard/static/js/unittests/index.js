$(document).ready(function ($) {
    $('#test-send-keys').on('keyup', function (e) {
        $(this).removeClass();
        $(this).addClass($(this).val())
    });
    $('#test-send-keys-textarea').on('keyup', function (e) {
        $(this).removeClass();
        $(this).addClass($(this).val())
    });
    $('#test-submit').on('submit', function (e) {
        e.preventDefault();
        $(this).addClass('submitted');
    });
    $('#test-click').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('clicked');
    });
    $('#test-hover').hover(function () {
        $(this).addClass('hovered');
        console.log('hovered');
    });
    $('#test-wait').on('click', function (e) {
        e.preventDefault();
        window.setTimeout(function () {
            $('body').append('<div id="test-wait-get">Test Wait Get</div>');
        }, 1000);
    });
});
$(document).ready(function ($) {
    $('#iframe-test-send-keys').on('keyup', function (e) {
        $(this).removeClass();
        $(this).addClass($(this).val())
    });
    $('#iframe-test-submit').on('submit', function (e) {
        e.preventDefault();
        $(this).addClass('iframe-submitted');
    });
    $('#iframe-test-click').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('iframe-clicked');
    });
    $('#iframe-test-hover').hover(function () {
        $(this).addClass('iframe-hovered');
    });
    $('#iframe-test-wait').on('click', function (e) {
        e.preventDefault();
        window.setTimeout(function () {
            $('body').append('<div id="iframe-test-wait-get">Test Wait Get</div>');
        }, 3000);
    });
});
$(document).ready(function ($) {
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
    });
    $('#test-wait').on('click', function (e) {
        e.preventDefault();
        window.setTimeout(function () {
            $('body').append('<button id="test-wait-click">Test Wait Click</button>');
            $('body').append('<div id="test-wait-get">Test Wait Get</div>');
        }, 3000);
    });
});
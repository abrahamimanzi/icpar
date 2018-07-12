/*! This plugin extend the menu button of Foundation */
(function ($) {
    $(function () {

        $('.menu-button').click(function (e) {
            e.preventDefault();
            $('.top-bar').toggleClass('expanded');
        });
    });
}(jQuery));
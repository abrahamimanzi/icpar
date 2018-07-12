/*! This plugin extend the close button of Foundation f-dropdown */
(function ($) {
    $(function () {

        $('.f-dropdown-close').click(function (e) {
            e.preventDefault();
            var dropdown = $(this).parents('.f-dropdown').attr('id');
            var $control = $('[data-dropdown="' + dropdown + '"]');
            $control.click();
        });
    });
}(jQuery));
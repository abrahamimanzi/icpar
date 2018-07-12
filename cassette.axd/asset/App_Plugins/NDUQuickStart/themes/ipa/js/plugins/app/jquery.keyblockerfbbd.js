(function ($) {

    $.keyBlocker = function (element, options) {

        var defaults = {
            allowNumeric: false,
            allowPhoneNumber : false
        };

        var plugin = this;

        plugin.settings = {
            allowNumeric: false,
            allowPhoneNumber: false,
            allowLimit: false,
            Limit : 0
        }

        var $element = $(element),
             element = element

        var constants = {
            EMPTY_VALUE: '',
            DOT_VALUE: '.',
            DATA_LIMIT_ATTR: 'data-limit'
        };

        // INITIALIZE
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            var checkLimit = function (elem) {

                var isLimit = false;

                return isLimit;

                var limit = $(elem).attr(constants.DATA_LIMIT_ATTR);
                limit = parseInt(limit);

                if (limit == null || limit == '' || isNaN(limit)) return isLimit;

                if ($(elem).val().length >= limit) {
                    isLimit = true;
                }

                return isLimit;
            };

            $(element).each(function (index, element) {

                var elem = $(element);

                if (elem.prop("readonly") && $.inArray(elem[0].type, ['text', 'password', 'textarea']) === -1) {
                    return;
                }

                $(elem).attr('autocomplete', 'off');

                if (options.allowNumeric) {

                    $(elem).bind('keydown', function (e) {

                        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || // Allow: backspace, delete, tab, escape, enter and .
                            
                        (e.keyCode == 65 && e.ctrlKey === true) || // Allow: Ctrl+A
                        (e.keyCode == 86 && e.ctrlKey === true) || // Allow: Ctrl+V
                        (e.keyCode == 67 && e.ctrlKey === true) || // Allow: Ctrl+C
                        (e.keyCode == 88 && e.ctrlKey === true) || // Allow: Ctrl+X
                        (e.keyCode >= 35 && e.keyCode <= 39) || // Allow: home, end, left, right
                        (e.keyCode >= 67 && e.keyCode <= 39)) { 
                            //Let it happen, don't do anything
                            return;
                        }

                        //Block if non number
                        if (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) || checkLimit(elem)) {

                            //Check if allowed limit
                            e.preventDefault();

                        }

                    });

                }

                if (options.allowPhoneNumber) {

                    $(elem).bind('keydown', function (e) {

                        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 91, 93, 32, 43, 45]) !== -1 || // Allow: backspace, delete, tab, escape, enter and .
                        (e.keyCode == 65 && e.ctrlKey === true) || // Allow: Ctrl+A
                        (e.keyCode == 86 && e.ctrlKey === true) || // Allow: Ctrl+V
                        (e.keyCode == 67 && e.ctrlKey === true) || // Allow: Ctrl+C
                        (e.keyCode == 88 && e.ctrlKey === true) || // Allow: Ctrl+X
                        (e.keyCode >= 35 && e.keyCode <= 39) || // Allow: home, end, left, right
                        (e.keyCode >= 67 && e.keyCode <= 39)) {
                            return;
                        }

                        if (checkLimit(elem)) { e.preventDefault(); }

                        if ($.inArray(e.keyCode, [219, 221, 109, 107]) !== -1) { // [ ] space + -
                            return;
                        }

                        if (e.shiftKey && $.inArray(e.keyCode, [61, 187]) !== -1) { // shift + +
                            return;
                        }

                        if (!e.shiftKey && $.inArray(e.keyCode, [173, 189]) !== -1) {
                            return;
                        }

                        // block if non number
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }

                    });

                }

                if (options.allowLimit) {
                    
                    $(elem).bind('keydown', function (e) {
                        
                        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || // Allow: backspace, delete, tab, escape, enter and .

                       (e.keyCode == 65 && e.ctrlKey === true) || // Allow: Ctrl+A
                       (e.keyCode == 86 && e.ctrlKey === true) || // Allow: Ctrl+V
                       (e.keyCode == 67 && e.ctrlKey === true) || // Allow: Ctrl+C
                       (e.keyCode == 88 && e.ctrlKey === true) || // Allow: Ctrl+X
                       (e.keyCode >= 35 && e.keyCode <= 39) || // Allow: home, end, left, right
                       (e.keyCode >= 67 && e.keyCode <= 39)) {
                            // let it happen, don't do anything
                            return;
                       }

                       if (checkLimit(elem)) { e.preventDefault(); }

                    });

                }

                //handle copy paste
                //$(elem).bind('input propertychange', function () {
                $(elem).bind('paste', function (e) {

                    var self = this;

                    var setTime = setTimeout(function () {

                        var value = $(self).val();

                        var isLimit = checkLimit(elem);

                        if (isLimit) {
                            var limit = $(self).attr(constants.DATA_LIMIT_ATTR);
                            limit = parseInt(limit);

                            if (isNaN(limit)) return;
                            value = value.substring(0, limit);
                            $(self).val(value);
                        }

                        if (options.allowNumeric) {
                            var re = new RegExp("^[0-9]+$");

                            if (re.exec(value) == null) {
                                $(self).val('');
                            }
                        }

                        if (options.allowPhoneNumber) {
                            var re = new RegExp('^[0-9\\[\\]\\+\\- ]+$');
                            if (re.exec(value) == null) {
                                $(self).val('');
                            }
                        }

                    }, 1);
                    
                });

            })

        }

        plugin.init();
    }

    $.fn.keyBlocker = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('keyBlocker')) {
                var plugin = new $.keyBlocker(this, options);
                $(this).data('keyBlocker', plugin);
            }
        });
    }

})(jQuery);

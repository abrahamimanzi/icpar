var IPA = (function (IPA, $) {

    IPA.loader = function() {

        return {
        
            init: function () {

                $("body").globalLoader({
                    autoHide: false,
                    opacity: 0.3,
                    text: 'Please wait...'
                });

                if (typeof String.prototype.trim !== 'function') {
                    String.prototype.trim = function () {
                        return this.replace(/^\s+|\s+$/g, '');
                    }
                }

            },

            show: function () {
                $("body").data("globalLoader")
                         .show();
            },

            hide: function () {
                $("body").data("globalLoader")
                         .hide();
            }

        }

    }

    var rechaptchaSettings = {
        element: '',
        publicKey: '',
        privateKey: '',
        theme: 'white',
        tabindex: 1,
        callback: null
    }

    IPA.rechaptcha = function () {

        return {

            check: function () {

                if (typeof (Recaptcha) !== 'object') return true;

                var challenge = Recaptcha.get_challenge();
                var answer = Recaptcha.get_response();

                var param = new Object();
                param.challengetKey = challenge;
                param.input = answer;

                return $.getJSON("/Umbraco/NDUQuickStart/MemberApi/ValidateRecapcha", param)

            },

            create: function () {

                var setup = rechaptchaSettings;

                Recaptcha.create(setup.publicKey, setup.element, {
                    tabindex: setup.tabindex,
                    theme: setup.theme,
                    callback: setup.callback
                });

                return this;

            },

            destroy : function() {
                Recaptcha.destroy();
                return this;
            },

            focus: function () {
                Recaptcha.reload();
                return this;
            },

            init: function (settings) {
                rechaptchaSettings = settings;
                return this;
            }

        }

    }

    IPA.validator = function () {

        return {

            isValidEmail : function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(value);
            }

            , isNumeric : function (value) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            , isValidDate: function (dateValue) {

                var isValid = false;

                var timestamp = Date.parse(dateValue);
                if (isNaN(timestamp) == false) {
                    var d = new Date(timestamp);
                    isValid = true;
                }

                return isValid;
            }

        }

    }

    return IPA;

}(window.IPA || {}, jQuery));

$(document).ready(function () {

    IPA.loader().init();

    $('.numeric').keyBlocker({ allowNumeric: true });
    $('.phone').keyBlocker({ allowPhoneNumber: true });
    //$('[data-limit]').keyBlocker({ allowLimit: true });

    if (typeof (IPA.contactDetails) === 'function') {
        IPA.contactDetails().init();
    }

    if (typeof (IPA.renewalPaymentSummary) === 'function') {
        IPA.renewalPaymentSummary().init();
    }

    if (typeof (IPA.renewalPayment) === 'function') {
        IPA.renewalPayment().init();
    }

    if (typeof (IPA.onlinePaymentSummary) === 'function') {
        IPA.onlinePaymentSummary().init();
    }

    if (typeof (IPA.onlinePayment) === 'function') {
        IPA.onlinePayment().init();
    }

    if (typeof (IPA.login) === 'function') {
        IPA.login().init();
    }

    if (typeof (IPA.membershipForm) === 'function') {
        IPA.membershipForm().init();
    }

    if (typeof (IPA.sPersDetailForm) === 'function') {
        IPA.sPersDetailForm().init();
    }

    if (typeof (IPA.contactValidation) === 'function') {
        IPA.contactValidation().init();
    }

    if (typeof (IPA.saveNonMemberForm) === 'function') {
        IPA.saveNonMemberForm().init();
    }

    if (typeof (IPA.personalDetail) === 'function') {
        IPA.personalDetail().init();
    }

    if (typeof (IPA.tertiaryDetail) === 'function') {
        IPA.tertiaryDetail().init();
    }

    if (typeof (IPA.eventSearch) === 'function') {
        IPA.eventSearch().init();
    }

    if (typeof (IPA.eventReg) === 'function') {
        IPA.eventReg().init();
    }

    if (typeof (IPA.eventDetails) === 'function') {
        IPA.eventDetails().init();
    }

    if (typeof (IPA.addnonmemberForm) === 'function') {
        IPA.addnonmemberForm().init();
    }

    if (typeof (IPA.addressvalidator) === 'function') {
        IPA.addressvalidator().init();
    }

});
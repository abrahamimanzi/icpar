var IPA = (function (IPA, $) {

    IPA.membershipForm = function () {

        return {

            init: function () {

                $('#btnSave').click(function () {

                    var form = $('#frmMemberApplicationForm');
                    var messageElem = $('#invalidCaptchaMesage');

                    var setErrorFocus = function (el) {
                        $(el).addClass('input-validation-error');
                    }

                    var clearAndFocus = function (el, noError) {

                        $(el).removeAttr('tabindex');
                        if (!noError) {
                            $(el).attr('tabindex', -1);
                            $(el).focus();
                        }

                    }

                    $('.validation-summary-errors ul li').hide();
                    $('.input-validation-error').removeClass('input-validation-error');

                    var isContactInfoValidInputs = function () {

                        var noError = true;
                        
                        if ($('#ddlTitle').val() == '') {
                            $('#invalidTitle').show();
                            setErrorFocus($('#ddlTitle'));
                            noError = false;
                        }

                        if ($('#ddlGender').val() == '') {
                            $('#invalidGender').show();
                            setErrorFocus($('#ddlGender'));
                            noError = false;
                        }

                        if ($('#txtFirstName').val() == '') {
                            $('#invalidFirstName').show();
                            setErrorFocus($('#txtFirstName'));
                            noError = false;
                        }

                        //if ($('#txtLastName').val() == '') {
                        //    $('#invalidLastName').show();
                        //    setErrorFocus($('#txtLastName'));
                        //    noError = false;
                        //}

                        var bdateVal = $('#txtDateBirth').val();
                        var isBdateIsOptional = $('#hdnBirthdateIsOptional').length > 0 && $('#hdnBirthdateIsOptional').val() == 'true';
                        if (!isBdateIsOptional && bdateVal == '') {
                            $('#invalidBirthDate').show();
                            setErrorFocus($('#txtDateBirth'));
                            noError = false;
                        }

                        var dateTypeVar = $('#txtDateBirth').datepicker('getDate');
                        if (bdateVal != '' && !IPA.validator().isValidDate(dateTypeVar)) {
                            $('#invalidBirthDateFormat').show();
                            setErrorFocus($('#txtDateBirth'));
                            noError = false;
                        }


                        var datebirth = new Date();
                        var datebirth = dateTypeVar;
                        var dateless16 = new Date();
                        //var dateless70 = new Date();
                        var datenow = new Date();

                        dateless16.setYear(datenow.getYear() - 16);
                        //dateless70.setYear(datenow.getYear() - 70);

                        if (!(datebirth < dateless16)) {
                            $('#invalidBirthDateAge').show();
                            setErrorFocus($('#txtDateBirth'));
                            noError = false;
                        }

                        clearAndFocus('#customErrorContactInfo', noError);

                        return noError;

                    }

                    var isPhonesValidInputs = function () {

                        var noError = true;

                        if ($('#txtMobile').val() == '' && $('#txtWorkPhone').val() == '' && $('#txtHomePhone').val() == '') {
                            $('#invalidPhone').show();
                            setErrorFocus($('#txtMobile'));
                            noError = false;
                        }

                        var re = new RegExp('^[0-9\\[\\]\\+\\- ]+$');
                        var value = $('#txtMobile').val();
                        if (value != '' && re.exec(value) == null) {
                            $('#invalidMobileFormat').show();
                            setErrorFocus($('#txtMobile'));
                            noError = false;
                        }

                        value = $('#txtWorkPhone').val();
                        if (value != '' && re.exec(value) == null) {
                            $('#invalidWorkFormat').show();
                            setErrorFocus($('#txtWorkPhone'));
                            noError = false;
                        }
                        
                        value = $('#txtHomePhone').val();
                        if (value != '' && re.exec(value) == null) {
                            $('#invalidHomeFormat').show();
                            setErrorFocus($('#txtHomePhone'));
                            noError = false;
                        }

                        if ($('#txtEmail').val() == '') {
                            $('#invalidEmail').show();
                            setErrorFocus($('#txtEmail'));
                            noError = false;
                        }

                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if ($('#txtEmail').val() != ''&& !re.test($('#txtEmail').val())) {
                            setErrorFocus($('#txtEmail'));
                            $('#invalidEmailFormat').show();
                            noError = false;
                        }

                        clearAndFocus('#customErrorPhones', noError);

                        return noError;

                    }

                    var isvalidPrefereMmailing = function () {
                        var noError = true;

                        if (!IPA.contactDetails().hasSelectedPreferredAddress()) {
                            $('#invalidPreferredAddress').show();
                            noError = false;
                        }

                        clearAndFocus('#customErrorAddress', noError);
                        return noError;
                    };

                    var isFormValid = function  () {
                        var isvalid = $(form).valid();
                        if (!isvalid) {
                            clearAndFocus('#mainValSummary', isvalid);
                        }
                        return isvalid;
                    }

                    if (isFormValid() & isPhonesValidInputs() & isvalidPrefereMmailing() & isContactInfoValidInputs()) {

                        var dateTypeVar = $('#txtDateBirth').datepicker('getDate');
                        $('#hdnDateBirth1').val($.datepicker.formatDate('mm/dd/yy', dateTypeVar));

                        IPA.loader().show();

                        var recapObj = IPA.rechaptcha();
                        messageElem.hide();

                        recapObj.check()
                                .done(function (status) {

                                    $('#IsValidCaptcha').val(status);

                                    if (status) {

                                        form.submit();

                                    } else {

                                        recapObj.destroy()
                                                .create();
                                        messageElem.show();


                                        clearAndFocus('#customErrorPhones', status);
                                        $('#customErrorPhones').removeAttr('tabindex');

                                        $('#invalidCaptchaMesage').show();
                                        IPA.loader().hide();

                                    }
                                });

                    }

                    $('#customErrorContactInfo').removeAttr('tabindex').blur();
                    $('#customErrorPhones').removeAttr('tabindex').blur();
                    $('#customErrorAddress').removeAttr('tabindex').blur();
                    $('#mainValSummary').removeAttr('tabindex').blur();

                });

                function checkKeyPressed(e) {
                    if (e.keyCode == "13") {
                        e.preventDefault();
                        $('#btnSave').focus().click();
                    }
                }

                $('.focus1 :input').focus();

                if (!window.addEventListener) {
                    window.attachEvent("onkeydown", checkKeyPressed);
                }
                else {
                    window.addEventListener("keydown", checkKeyPressed, false);
                }
                
            }

        }
    }

    return IPA;

}(window.IPA || {}, jQuery))
(function ($) {
    $.validator.unobtrusive.adapters.addBool("inprequired", "required");
}(jQuery));

$.validator.unobtrusive.adapters.add("inprequired", function (options) {
    if (options.element.tagName.toUpperCase() == "INPUT") {
        options.rules["required"] = true;
        if (options.message) {
            options.messages["required"] = options.message;
        }
    }
});


var IPA = (function (IPA, $) {

    IPA.sPersDetailForm = function () {

        return {

            init: function () {

                $('#btnNext').click(function () {

                    var form = $('#frmPersonalDetailsForm');
                    var messageElem = $('#invalidCaptchaMesage');

                    var setErrorFocus = function (el) {
                        $(el).addClass('input-validation-error');
                    }


                    var isFormValid = function () {
                        var isvalid = $(form).valid();

                        return isvalid;
                    }

                    if (isFormValid()) {

                        var isnoerror = true;

                        var bdateVal = $('#txtDateBirth1').val();
                        //var isBdateIsOptional = $('#hdnBirthdateIsOptional').length > 0 && $('#hdnBirthdateIsOptional').val() == 'true';
                        if (bdateVal == '') {
                            $('#invalidBirthDate').show();
                            setErrorFocus($('#txtDateBirth1'));
                            isnoerror = false;
                        } else {
                            $('#invalidBirthDate').hide();
                        }

                        var dateTypeVar = $('#txtDateBirth1').datepicker('getDate');
                        if (bdateVal != '' && !IPA.validator().isValidDate(dateTypeVar)) {
                            $('#invalidBirthDateFormat').show();
                            setErrorFocus($('#txtDateBirth1'));
                            isnoerror = false;
                        } else {
                            $('#invalidBirthDateFormat').hide();
                        }

                        var dateTypeVar = $('#txtDateBirth1').datepicker('getDate');
                        $('#txtDateBirth').val($.datepicker.formatDate('mm/dd/yy', dateTypeVar))

                        var datebirth = new Date();
                        var datebirth = dateTypeVar;
                        var dateless16 = new Date();
                        //var dateless70 = new Date();
                        var datenow = new Date();

                        dateless16.setYear(datenow.getYear() - 16);
                        //dateless70.setYear(datenow.getYear() - 70);

                        if (!(datebirth < dateless16)) {
                            $('#invalidBirthDateAge').show();
                            setErrorFocus($('#txtDateBirth1'));
                            isnoerror = false;

                            //IPA.loader().hide();
                        } else {
                            $('#invalidBirthDateAge').hide();
                        }

                        if ($('#ddlTitle').val() == '') {
                            $('#invalidTitle').show();
                            setErrorFocus($('#ddlTitle'));
                            isnoerror = false;
                            //IPA.loader().hide();
                        } else {
                            $('#invalidTitle').hide();
                        }

                        if ($('#txtFirstName').val() == '') {
                            $('#invalidFirstName').show();
                            setErrorFocus($('#txtFirstName'));
                            isnoerror = false;
                        } else {
                            $('#invalidFirstName').hide();
                        }

                        if ($('#ddlGender').val() == '') {
                            $('#invalidGender').show();
                            setErrorFocus($('#ddlGender'));
                            isnoerror = false;
                        } else {
                            $('#invalidGender').hide();
                        }



                    
                        if (isnoerror != true)
                        {
                            IPA.loader().hide();
                        }
                       else
                        {
                            //IPA.loader().show();

                            var recapObj = IPA.rechaptcha();

                            messageElem.hide();

                            recapObj.check()
                                    .done(function (status) {
                                        $('#PersonalDetailsData_IsValidCaptcha').val(status);

                                        if (status) {
                                            IPA.loader().show();
                                            form.submit();

                                        } else {

                                            recapObj.destroy()
                                                    .create();
                                            messageElem.show();

                                            $('#mainValSummary').find('li')
                                                                .remove();

                                            IPA.loader().hide();

                                        }
                                    });
                          }
                    }

                });

                $('.focus :input').focus();

                function checkKeyPressed(e) {
                    if (e.keyCode == "13") {
                        e.preventDefault();
                        $('#btnNext').focus().click();
                    }
                }

                $('#btnNext').click(function () {

                    var fromDate = $('#txtDateBirth1').datepicker('getDate');
                    $('#txtDateBirth').val($.datepicker.formatDate('mm/dd/yy', fromDate));

                });

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
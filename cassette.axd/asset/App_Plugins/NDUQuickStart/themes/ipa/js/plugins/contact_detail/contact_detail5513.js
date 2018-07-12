/// <reference path="../../../../shared/js/foundation/foundation.orbit.js" />
/// <reference path="../../../../shared/js/foundation/foundation.clearing.js" />
/// <reference path="../q/q.min.js" />
var AUSTRALIA_COUTRY_ID = 14;

var IPA = (function (IPA, $) {

    IPA.contactDetails = function () {

        return {

            init: function () {
                
                var autocheckPerCountry = function (addressType) {

                    var countryValue = $('.country-address-' + addressType).val();

                    if (countryValue == AUSTRALIA_COUTRY_ID) {

                        $('select.state-address-' + addressType).removeClass("disabled");
                        $('select.state-address-' + addressType).prop("disabled", false);
                        $('.state-address-' + addressType).removeClass("disabled");

                    } else {

                        $('select.state-address-' + addressType).addClass("disabled");
                        $('select.state-address-' + addressType).prop("disabled", true);
                        $('.state-address-' + addressType).addClass("disabled");
                        $('.state-address-' + addressType).removeClass("input-validation-error");
                        
                    }

                }

                var autoHightlightStateBasedOnCountry = function () {

                    autocheckPerCountry(1);
                    autocheckPerCountry(2);
                    autocheckPerCountry(3);
                }

                var attachEventByAddressType = function (addressTypeId) {

                    $(".country-address-" + addressTypeId).change(function () {

                        IPA.loader().show();

                        IPA.contactDetails()
                           .loadData(this.value, '.state-address-' + addressTypeId);

                        autocheckPerCountry(addressTypeId);

                        if (this.value == AUSTRALIA_COUTRY_ID) {
                            $('.address3-' + addressTypeId).hide();
                            $(".state-address-state-container-" + addressTypeId).hide();
                            $('.input-address3-' + addressTypeId).val(null);
                            $('.state-dropdown-container-' + addressTypeId).removeClass('large-5')
                                                                           .addClass("large-9");
                        }

                        if (this.value != AUSTRALIA_COUTRY_ID && this.value != '0') {
                            $('.address3-' + addressTypeId).show();
                            $(".state-address-state-container-" + addressTypeId).show();
                            $('.state-dropdown-container-' + addressTypeId).removeClass('large-9')
                                                                           .addClass("large-5");
                        }

                    });

                    $(".state-address-" + addressTypeId).change(function () {

                        if ($(this).find("option[value!='']").length > 0 && this.value != '0') {
                            $(".state-address-state-" + addressTypeId).val('');
                        }

                    });
                    
                }

                attachEventByAddressType(1);
                attachEventByAddressType(2);
                attachEventByAddressType(3);

                var refreshFoundationElement = function () {
                    $(document).foundation('forms');
                }

                $('input[type="radio"].preferred-yes-address-1').change(function () {
                    $('input[type="radio"].preferred-no-address-2').prop("checked", true)
                                                                   .change();
                    $('input[type="radio"].preferred-no-address-3').prop("checked", true)
                                                                   .change();
                    refreshFoundationElement();
                })

                $('input[type="radio"].preferred-yes-address-2').change(function () {

                    $('input[type="radio"].preferred-no-address-1').prop("checked", true)
                                                                   .change();
                    $('input[type="radio"].preferred-no-address-3').prop("checked", true)
                                                                   .change();
                    refreshFoundationElement();
                })

                $('input[type="radio"].preferred-yes-address-3').change(function () {
                    $('input[type="radio"].preferred-no-address-1').prop("checked", true)
                                                                   .change();
                    $('input[type="radio"].preferred-no-address-2').prop("checked", true)
                                                                   .change();
                    refreshFoundationElement();
                })

                $('#frmContactDetails').submit(function () {
                    $('#divMessage').hide();
                    if ($(this).valid()) {
                        IPA.loader().show();
                    }
                });

                autoHightlightStateBasedOnCountry();

                //set focus on first active tab upon page load, restricted to this form only
                $('#frmContactDetails .focus :input').focus();

                function checkKeyPressed(e) {
                    if (e.keyCode == "13") {
                        e.preventDefault();
                        $('#btnSaveContactDetail1').click();
                    }
                }

                $("#frmContactDetails #chkIsReadAndAccepted span").attr('tabindex', 92);

                if (!window.addEventListener) {
                    window.attachEvent("onkeydown", checkKeyPressed);
                }
                else {
                    window.addEventListener("keydown", checkKeyPressed, false);
                }

            },

            getCountryStates: function(countryId) {
            
                var param = new Object();
                param.contryId = countryId;

                return $.getJSON("/Umbraco/NDUQuickStart/MemberApi/GetCountryStates", param)
                    
            },

            hasSelectedPreferredAddress : function() {
                return $('.preferred-yes-address-1').is(':checked') || $('.preferred-yes-address-2').is(':checked') || $('.preferred-yes-address-3').is(':checked');
            },

            loadData: function (countryId, elemClass) {
                
                var targetStateEl = $('select' + elemClass);
                var foundationEl = $('div' + elemClass);

                if (countryId == '0' || countryId == null) {
                    $(targetStateEl)
                               .find("option[value!='']")
                               .remove()
                               .end();

                    Foundation.libs.forms.refresh_custom_select($(targetStateEl), false);

                    IPA.loader().hide();
                    return;
                }

                IPA.loader().show();

                IPA.contactDetails()
                    .getCountryStates(countryId)
                    .done(function (data) {

                        var countryStates = JSON.parse(data);
                        var options = $(targetStateEl).find("option");

                        if (countryStates.length > 1) {

                            $(targetStateEl)
                                .find("option")
                                .remove()
                                .end();

                            var htmlOptions = '';
                            $.each(countryStates, function (key, value) {
                                htmlOptions += "<option value=" + value.StateCode + ">" + value.Description + "</option>";
                            });

                            $(targetStateEl).html(htmlOptions);

                        } else {

                            $(targetStateEl)
                               .find("option[value!='']")
                               .remove()
                               .end();

                        }

                        IPA.loader().hide();

                    })
                    .fail(function () {
                        console.log('error retrieving country states');
                    });

            }

        }

    }

    return IPA;

}(window.IPA || {}, jQuery));


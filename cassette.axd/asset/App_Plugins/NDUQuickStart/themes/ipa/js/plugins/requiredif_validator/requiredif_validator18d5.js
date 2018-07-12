$.validator.addMethod("requiredifvalidator", function (input, elem, params) {
    
    var grpAttrName = params.groupname;

    var checkIfGroupMemberHasValue = function (groupAttrName, groupName) {
        var groupElements = $("[" + grpAttrName + "=" + grp + "]");
        var oneHasValue = false;

        $.each(groupElements, function (index, item) {

            if (!$(item).is(':disabled'))
            {
                if (item.type == 'checkbox' || item.type == 'radio') {

                    if ($(item).is(':checked')) {
                        oneHasValue = true;
                        return;
                    }

                } else if (item.type == 'text') {

                    if ($(item).val().trim() != '') {
                        oneHasValue = true;
                        return;
                    }

                } else if (item.type == 'select-one') {

                    if ($(item).val() != '' && $(item).val() != 0) {
                        oneHasValue = true;
                        return;
                    }

                }
            }

        });

        return oneHasValue;
    }

    var paramName = params.dependentproperty;
    var defaultValue = params.defaultvalue;

    if (grpAttrName == null) return true;

    var grp = $(elem).attr(grpAttrName);

    if (!checkIfGroupMemberHasValue(grpAttrName, grp)) {
        return true;
    }

    var dependentDelement = $("[" + grpAttrName + "=" + grp + "][" + "id *=" + paramName + "]");

    if (elem.type == "select-one") {

        var firstValidation = (input.toLowerCase() != '0' && input.toLowerCase() != '');

        if (dependentDelement.length == 0) return firstValidation;

        if (dependentDelement[0].type == "select-one") {

            var selectedID = parseInt($(dependentDelement).val());

            if (selectedID == 14 && defaultValue != 0) {

                if (elem.type == "select-one") {
                    return firstValidation;
                } else if (elem.type == "text" && $(elem).is(":visible")) {
                    return input.toLowerCase() != '';
                }

            } else if (selectedID != 0 && defaultValue == 0) {
                if (elem.type == "text" && $(elem).is(":visible")) {
                    return input.toLowerCase() != '';
                }
            }

        }

    } else if (elem.type == "text") {

        var firstValidation = input.toLowerCase() != '';

        if (dependentDelement.length == 0) return firstValidation;

        if (dependentDelement[0].type == "select-one") {
            var selectedID = parseInt($(dependentDelement).val());
            if (selectedID == 14 && defaultValue != 0) {
                if (elem.type == "select-one") {
                    return (input.toLowerCase() != 0 && input.toLowerCase() != '');
                } else if (elem.type == "text" && $(elem).is(":visible")) {
                    return firstValidation;
                }
            } else if (selectedID != 0 && defaultValue == 0) {
                if (elem.type == "text" && $(elem).is(":visible")) {
                    return firstValidation;
                }
            }
        }


    }

    return true;
});

$.validator.unobtrusive.adapters.add("requiredifvalidator", ["dependentproperty", "defaultvalue", "groupname"], function (options) {
        options.rules["requiredifvalidator"] = options.params;
        options.messages["requiredifvalidator"] = options.message;
    }
);
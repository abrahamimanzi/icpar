/* File Created: January 16, 2012 */

// Value is the element to be validated, params is the array of name/value pairs of the parameters extracted from the HTML, element is the HTML element that the validator is attached to
$.validator.addMethod("statevalidator", function (value, element1, params)
{
    var id = $(element1).attr('data-state-id');

    //no selected but has selection
    if (value == '' && $(element1).find("option[value!='']").length > 0)
    {
        return false;
    }

    if (value == '' && $(element1).find("option[value!='']").length == 0 && $('.state-address-state-' + id).val() == "")
    {
        return false;
    }

    return true;
});

$.validator.unobtrusive.adapters.add("statevalidator", ["otherpropertyname"], function (options) {
    options.rules["statevalidator"] = "#" + options.params.otherpropertyname;
    //options.rules["statevalidator"] = "#" + options.params.countrypropertyname;
    options.messages["statevalidator"] = options.message;
});
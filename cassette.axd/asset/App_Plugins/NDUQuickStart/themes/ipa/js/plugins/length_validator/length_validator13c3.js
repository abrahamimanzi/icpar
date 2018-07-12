$.validator.addMethod("lengthvalidator", function (input, elem, params) {
    return (input.length <= parseInt(params));
});

$.validator.unobtrusive.adapters.add("lengthvalidator", ["maxlength"], function (options) {
    options.rules["lengthvalidator"] = options.params.maxlength;
    options.messages["lengthvalidator"] = options.message;
});
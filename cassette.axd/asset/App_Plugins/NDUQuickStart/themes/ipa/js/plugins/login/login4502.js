var IPA = (function (IPA, $) {

    IPA.login = function () {

        return {

            init: function () {

                $('#frmLogin').submit(function () {

                    if ($('#txtLoginUserName').val().length > 0 &&
                        $('#txtLoginPassword').val().length > 0)
                    {
                        IPA.loader().show();
                        //return true;
                    }
                    else {

                        $('#login_serverError').show();
                        $('#login_serverError span').text("Please enter email address or IPA Member/User ID and Password");

                        return false;

                    }

                   
                })

                $('#btnLogin').click(function () {
                    $('#login_serverError').hide();
                });

               

            }
        }
    }

    return IPA;

}(window.IPA || {}, jQuery));
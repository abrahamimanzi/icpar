$(document).ready(function () {
    $('#btnSubmit').click(function () {
        IPA.loader().show();
        //$('#results').html("");

        frmFindAnAccountant.submit();
    });

    $('#frmFindAnAccountant .focus :input').focus();

    function checkKeyPressed(e) {
        if (e.keyCode == "13") {
            e.preventDefault();
            $('#btnSubmit').click();
        }
    }

    if (!window.addEventListener) {
        window.attachEvent("onkeydown", checkKeyPressed);
    }
    else {
        window.addEventListener("keydown", checkKeyPressed, false);
    }
    var mapOptions = { metadata_options: { type: 'html5' }, default_point: { lat: defaultLat, lng: defaultLng } }
    if (noMapMarkers) {
        mapOptions.default_zoom_level = 14
    }
    if ($('#ResultsCount').val() == "0")
        $('#map').height(0);
    else
	{
		var mapWidth = $(".flex-video").width();
		var mapHeight = mapWidth / 1.36;
		$('#map').height(mapHeight);
		//alert(mapHeight);
		//alert(mapWidth);
        //$('#map').height(395); //445);
	}
    $('#map').jMapping(mapOptions);

    function goToByScrollIfVisible(idToScroll, idVisible) {
        //alert($(idVisible).is(':visible'));
        if ($(idVisible).is(':visible')) {
            $('html,body').animate({
                scrollTop: $(idToScroll).offset().top
            },
                'slow');
        }
    }

    goToByScrollIfVisible("#h1", "#smallJS");
});

var IPA = (function (IPA, $) {

    IPA.findAnAccountant = function () {

        return {
            init: function () {

            }
        }
    }

    return IPA;

}(window.IPA || {}, jQuery));

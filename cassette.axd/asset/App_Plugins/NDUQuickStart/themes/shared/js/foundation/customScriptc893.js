//Toggle event filter panel when the screen is small
function hideShowToggle() {
    $('.toggle-head').click(function () {
        var link = $(this);
        $('.toggle-section').slideToggle('fast', function () {
            if ($(this).is(':visible')) {
                link.text('Hide Filter');
                link.removeClass('active');
            } else {
                link.text('Show Filter');
                link.addClass('active');
            }
        });
    });
}
$(document).ready(function () {
    hideShowToggle();
});
// show filter panel when the screen is medium to large and the panel is hidden
$(window).resize(function () {
    var width = $(window).width();
    if (width > 640) {
        if ($('.toggle-section').is(':visible') == false) {
            $('.toggle-head').trigger('click'); 
        }
    }
    if (width < 640) {
        if ($('.toggle-section').is(':visible') == true) {
            //    $('.toggle-head').trigger('click');
            $('.toggle-section').css('display', 'none');
        }
    }

});
//$(document).foundation();
// event registration. close panel

$(function () {
    $(".closePanel").click(function () {
        $(this).parents(".repeatPanel").remove();
    });
    $(".addAttendee").click(function () {
        $(this).parent(".columns").find(".addPanel").css('display', 'block');
    });
    $(".closePanel").click(function () {
        $(this).parents(".addPanel").css('display', 'none');
    });
});

// add tooltip if the text is ellipse
$(document).on('mouseenter', '.ellipsis', function () {
    var $t = $(this);
    var title = $t.attr('title');
    if (!title) {
        if (this.offsetWidth < this.scrollWidth) $t.attr('title', $t.text())
    } else {
        if (this.offsetWidth >= this.scrollWidth && title == $t.text()) $t.removeAttr('title')
    }
});

$(window).scroll(function() {
        //User is scrolling
       var s = $(window).scrollTop();
       
       if (s>270) {
       		$("#sidebar").css({"position":"fixed","top":"0px","width":"20%"});
       }
       else {
       		$("#sidebar").css({"position":"relative","top":"0px","width":"25%"}); 
       }
    });
 

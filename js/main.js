//var addr="http://172.24.75.19:8080";
var addr="http://123.150.131.187:8088/web";

var PAGENUM=14;

;(function () {
    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint( function( direction ) {

            if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function(){

                    $('body .animate-box.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn animated-fast');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated-fast');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated-fast');
                            } else {
                                el.addClass('fadeInUp animated-fast');
                            }

                            el.removeClass('item-animate');
                        },  k * 200, 'easeInOutExpo' );
                    });

                }, 100);

            }

        } , { offset: '80%' } );
    };




    $(function(){
        contentWayPoint();
    });


}());


$("body").on("click",".header-right",function(){
    window.location.href="user.html";
});

$(".tab").on('click', function () {
    $(".tab-active").removeClass("tab-active");
    $(this).addClass("tab-active");
    var id = $(this).attr("id");
    $(".show").removeClass("show");
    $("." + id + "-content").addClass("show");
});

function logout() {
    $.cookie('token', '');
    window.location.href = "login.html";
}





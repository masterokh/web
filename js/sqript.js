function initializeKnob(value, className) {
    var dial = $("." + className);
    var animationTriggered = false;

    $(document).on("scroll", function() {
        var topOfDial = dial.offset().top;
        var bottomOfDial = topOfDial + dial.outerHeight();
        var bottomOfScreen = $(window).scrollTop() + $(window).height();

        if (bottomOfScreen > topOfDial && $(window).scrollTop() < bottomOfDial && !animationTriggered) {
            dial.knob({
                'draw' : function () {
                    $(this.i).val(this.cv + '%')
                }
            });

            $({animatedVal: 0}).animate({animatedVal: value}, {
                duration: 2000,
                easing: "swing",
                step: function() {
                    dial.val(Math.ceil(this.animatedVal)).trigger("change");
                }
            });

            animationTriggered = true;
        }
    });
}

/*document.querySelector('.nav_hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
});*/

$(document).ready(function() {
    $('.nav_hamburger').click(function() {
        $('nav').toggleClass('show_menu');
    });
});

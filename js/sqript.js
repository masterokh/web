function initializeKnob(value, className) {
    var dial = $("." + className);
    var animationTriggered = false;

    $(document).on("scroll", function () {
        var topOfDial = dial.offset().top;
        var bottomOfDial = topOfDial + dial.outerHeight();
        var bottomOfScreen = $(window).scrollTop() + $(window).height();

        if (bottomOfScreen > topOfDial && $(window).scrollTop() < bottomOfDial && !animationTriggered) {
            dial.knob({
                'draw': function () {
                    $(this.i).val(this.cv + '%')
                }
            });

            $({ animatedVal: 0 }).animate({ animatedVal: value }, {
                duration: 2000,
                easing: "swing",
                step: function () {
                    dial.val(Math.ceil(this.animatedVal)).trigger("change");
                }
            });

            animationTriggered = true;
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.nav_hamburger');
    const menu = document.querySelector('.menu');
    const closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// datepicker
// ------------------------------------------------------------

function Transition(obj, y, scaleY) {
    this.obj = obj;
    this.y = y;
    this.scaleY = scaleY;

    this.tween = TweenMax.fromTo(this.obj, 1, {
        autoAlpha: 0,
        y: this.y,
        scaleY: this.scaleY,
        display: "none"
    }, {
        ease: Power3.easeInOut,
        autoAlpha: 1,
        y: 0,
        scaleY: 1,
        display: "block",
    }).pause();
};

function dpBottomSheet() {
    var btn = $(".js-dp-bs-btn");
    var overlay = $(".js-dp-bs");
    var close = $(".js-dp-bs-close, .js-dp-bs .tk-overlay__bg, .js-dp-toggle");
    var bottomSheet = new Transition(".tk-datepicker-bs", 300, 1);
    var darkener = new Transition(".js-dp-bs .tk-overlay__bg", 0, 1);

    btn.click(() => {
        if (vw <= 640) {
            overlay.show();
            bottomSheet.tween.duration(0.35).play();
            darkener.tween.duration(0.6).play();
        };
    });

    close.click(() => {
        bottomSheet.tween.duration(0.35).play().reverse();
        darkener.tween.duration(0.6).play().reverse();
        setTimeout(() => {
            overlay.hide();
        }, 610);
    });

    $(".js-dp-toggle").click(function () {
        $(".js-dp-toggle").removeClass("is-active");
        $(this).addClass("is-active");
    });
};
if ($(".js-dp-bs-btn")[0]) {
    dpBottomSheet();
};

function dpDesktop() {
    var active = false;
    var dp;

    function fadeIn(obj) {
        TweenLite.fromTo(obj, 0.3, {
            opacity: 0,
            scaleY: 0.9,
            display: "none",
        }, {
            ease: Power3.easeInOut,
            opacity: 1,
            scaleY: 1,
            display: "block",
        });
    };

    function fadeOut(obj) {
        TweenLite.to(obj, 0.3, {
            ease: Power3.easeInOut,
            opacity: 0,
            display: "none",
        });
    };

    $(".js-dp-btn").click(function () {
        dp = $(".tk-datepicker-lg", this);
        if (vw > 640) {
            if (!active) {
                fadeIn(dp);
                active = true;
            } else {
                fadeOut(dp);
                active = false;
            }
        };
    });

    // click elsewhere to close datepicker
    $(document).click(function (e) {
        if (!$(e.target).closest(".js-dp-btn").length) {
            if (active) {
                fadeOut(".tk-datepicker-lg");
                active = false;
            };
        }
    });

};
if ($(".js-dp-btn")[0] && vw > 640) {
    dpDesktop();
};
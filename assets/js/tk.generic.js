// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var vw = Number;
var vh = Number;
var mobile = Boolean;
var scrolled = false;



// update screen height
// ------------------------------------------------------------	
function updateWindowSize() {
    vw = $(window).innerWidth();
    vh = $(window).innerHeight();

    // set breakpoints
    if (vw > 912) {
        mobile = false;
    } else {
        mobile = true;
    };
};
updateWindowSize();

// update when resizing
$(window).resize(function () {
    updateWindowSize();
});



// basic toggle class
// ------------------------------------------------------------
$(".js-toggle").click(function () {
    $(this).toggleClass("is-active");
});



// functionality that"s on linked on scroll
// ------------------------------------------------------------
$(window).scroll(() => {
    scrolled = true;
    if (scrolled) {
        //requestAnimationFrame(scrolling);
    };
});

function scrolling() {
    var pos = $(window).scrollTop();
    // fade arrow scroll down button
    scrolled = false;
};



// sticky bar
// ------------------------------------------------------------
function stickyBar() {
    var controller = new ScrollMagic.Controller();
    var id = document.getElementById("js-sticky-trig");
    if (id) {
        $(".js-sticky-bar").addClass("is-active");
        var scrll = new ScrollMagic.Scene({
                triggerElement: "#js-sticky-trig",
                duration: 999999,
            })
            .triggerHook(0.905)
            .offset(0)
            .on("start", function () {
                $(".js-sticky-bar").toggleClass("is-active");
            })
            //.addIndicators()
            .addTo(controller);
    };
};
stickyBar();




// order for someone else
// ------------------------------------------------------------
function otherUser() {
    var time = 250;
    var className = ".js-other-switch";
    var obj = $(className);

    if (obj[0]) {
        obj.click(function () {
            if ($(className + " input").is(':checked')) {
                $(".js-other-form").slideDown(time);
                $(".js-other-label").addClass("is-active");
                $(".js-other-margin").show();
            } else {
                $(".js-other-form").slideUp(200);
                $(".js-other-label").removeClass("is-active");
                $(".js-other-margin").hide(time);
            };
        });
    };
};
otherUser();




// choice selector
// ------------------------------------------------------------
if ($(".js-cs-item")[0]) {
    $(".js-cs-item").each(function (i) {
        $(this).attr("id", "js-cs-item-" + i);
    });
};

function choiceSelector() {
    var time = 250;
    var obj = ".js-cs-item";
    var toggleClass = "is-selected";
    var initID = "#js-cs-item-0"; // set default on current card
    var content = ".tk-choice-selector__content";

    if ($(obj)[0]) {
        $(content).slideUp(time);
        $(initID + " " + content).slideDown(0);
        $(initID).addClass(toggleClass);

        $(obj).click(function () {
            if (!$(this).hasClass(toggleClass)) {
                $(obj).removeClass(toggleClass);
                $(this).addClass(toggleClass);
                $(content).slideUp(time);
                $(content, this).slideDown(time);
            };
        });
    };
};
choiceSelector();




// preloader
// ------------------------------------------------------------	
function loader() {
    // init loader view
    TweenMax.to(".js-loader", 0.1, {
        opacity: 1
    });

    // load website
    window.addEventListener("load", function () {
        TweenLite.to(".js-loader", 0.3, {
            delay: 0.7,
            ease: Power3.easeInOut,
            autoAlpha: 0,
            display: "none",
            onComplete: function () {
                TweenLite.set(".js-loaded", {
                    display: "block",
                });
                TweenLite.from(".js-sticky-bar", 0.5, {
                    delay: 0.25,
                    ease: Power3.easeInOut,
                    autoAlpha: 0,
                    y: "100%"
                });
            }
        });
    });
};
loader();
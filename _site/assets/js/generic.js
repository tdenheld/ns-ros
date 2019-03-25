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



// basic functions
// ------------------------------------------------------------
function toggle() {
    var obj = $(".js-toggle");
    if (obj[0]) {
        obj.click(function () {
            $(this).toggleClass("is-active");
        });
    };
};
function radio() {
    var obj = $(".js-radio");
    if (obj[0]) {
        obj.click(function () {
            obj.removeClass("is-active");
            $(this).toggleClass("is-active");
        });
    };
};
function clearSession() {
    var obj = $(".js-clear-session");
    if (obj[0]) {
        obj.click(function () {
            sessionStorage.clear();
        });
    };
};
$(function () {
    toggle();
    radio();
    clearSession();
});




// sticky receipt
// ------------------------------------------------------------
var receipt = {
    className: $(".js-receipt"),
    top: 106,
    offset: function () {
        return this.className.offset().top - this.top
    },
    add: function () {
        this.className.addClass("is-active");
    },
    remove: function () {
        this.className.removeClass("is-active");
    }
};
if (receipt.className[0]) {
    var receiptOffset = receipt.offset();
};



// functionality that's on linked on scroll
// ------------------------------------------------------------
$(window).scroll(() => {
    scrolled = true;
    if (scrolled) {
        requestAnimationFrame(scrolling);
    };
});

function scrolling() {
    var pos = $(window).scrollTop();
    if (receipt.className[0]) {
        if (pos > receiptOffset) {
            receipt.add();
        } else {
            receipt.remove();
        };
    };
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





// add-ons
// ------------------------------------------------------------
function addOns() {
    var btn = $(".js-add-on-btn");
    var priceLabel = $(".js-rcpt-price");
    var banner = $(".js-add-on-banner");
    var order = $(".js-add-on-order");
    var kd = $(".js-add-on-kd");
    var trash = $(".js-add-on-trash");
    var data = "rcpt-price";
    var dvdPrice = $(".js-rcpt-price:first").text();

    if (sessionStorage.getItem(data) !== null) {
        priceLabel.text(sessionStorage.getItem(data));
    };

    if (sessionStorage.getItem(data) == "€ 29,84") {
        kd.show();
    } else {
        kd.hide();
    };

    btn.click(() => {
        banner.hide();
        order.show();
        sessionStorage.setItem(data, "€ 29,84");
        priceLabel.text(sessionStorage.getItem(data));
        kd.show();
    });

    trash.click(() => {
        banner.show();
        order.hide();
        sessionStorage.setItem(data, dvdPrice);
        priceLabel.text(sessionStorage.getItem(data));
        kd.hide();
    });
};
addOns();




// pasfoto
// ------------------------------------------------------------
if ($(".js-photo")[0]) {
    $(".js-photo").click(function () {
        $(this).toggleClass("is-filled");
        $(".js-photo-empty, .js-photo-filled").toggleClass("is-hidden");
        $(this).removeClass("is-error");
        $(".js-photo-error-label").hide();
    });
};



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
    var initID = "#js-cs-item-1"; // set default on current card
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
    if ($(".js-loader")[0]) {
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
};
loader();
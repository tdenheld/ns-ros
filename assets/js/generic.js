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



// scroll to
// ------------------------------------------------------------
$("a[href^='#'].js-scroll-to").click(function () {
    var obj = {
        element: $($.attr(this, "href")),
        offst: $(".header").height() + 28,
    };
    TweenMax.to(window, .8, {
        ease: Power3.easeInOut,
        scrollTo: {
            y: obj.element,
            offsetY: obj.offst,
            autoKill: false,
        }
    });
    return false;
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
    const btn = $(".js-add-on-btn");
    const priceLabel = $(".js-rcpt-price");
    const banner = $(".js-add-on-banner");
    const order = $(".js-add-on-order");
    const kd = $(".js-add-on-kd");
    const trash = $(".js-add-on-trash");
    const data = "rcpt-price";
    const dvdPrice = $(".js-rcpt-price:first").text();

    if (sessionStorage.getItem(data) !== null) {
        priceLabel.text(sessionStorage.getItem(data));
    };

    if (sessionStorage.getItem(data) == "€ 77,50") {
        kd.show();
    } else {
        kd.hide();
    };

    btn.click(() => {
        banner.hide();
        order.show();
        sessionStorage.setItem(data, "€ 77,50");
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
    const time = 250;
    const obj = ".js-cs-item";
    const toggleClass = "is-selected";
    const initID = "#js-cs-item-1"; // set default on current card
    const content = ".selector__content";

    function updatePrice() {
        const obj = ".js-update-price";
        $(obj).each(function (i) {
            var tween = TweenMax.to(this, 0.25, {
                ease: Power3.easeIn,
                delay: 0.6 + (i * 0.125),
                opacity: 0.1,
                scale: 1.5,
                onComplete: function () {
                    tween.reverse();
                }
            });
        });
    };

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
                updatePrice();
            }

            if ($('#js-cs-item-0').hasClass(toggleClass)) {
                $('.js-cs-ovchip').slideDown(200);
                $('.js-cs-ovchip-line').css({
                    'border-bottom': '1px solid #e6e6e8',
                    'height': '2px',
                });
            } else {
                $('.js-cs-ovchip').slideUp(200);
                $('.js-cs-ovchip-line').css({
                    'border-bottom': '2px solid #003082'
                });
            }
        });
    };
};
choiceSelector();




// full screen payment order check loader
// ------------------------------------------------------------
function payment() {
    const btn = $(".js-bank");
    const loader = ".js-bank-loader";
    const loaderTxt = $(".js-loader-txt");
    const bg = $(".js-header, .js-content, .js-footer");

    function tween(x, t, b) {
        TweenLite.to(x, t, {
            ease: Power3.easeInOut,
            opacity: 1,
            filter: "blur(" + b + ")",
            display: "block"
        });
    };

    btn.click(function () {
        let bank = $(".js-bank-set", this).text();
        tween(loader, 0.8, 0);
        tween(bg, 0.8, "10px");
        setTimeout(() => {
            loaderTxt.text("Verbinding maken met " + bank);
        }, 2250);
        setTimeout(() => {
            window.location = "/bestellen/bedankt";
        }, 4500);        
    });
};
payment();



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
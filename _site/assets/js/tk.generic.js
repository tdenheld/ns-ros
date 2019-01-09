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






// form
// ------------------------------------------------------------
// ------------------------------------------------------------
function form() {
    var submit = true;
    var linkLocationDefault = $(".js-submit-link").attr("href");
    var linkLocation = linkLocationDefault;

    // error constructor
    function DisplayError(input, error) {
        this.input = input;
        this.error = error;
        this.tween = function (toAlpha, toDisplay) {
            TweenLite.to(this.error, .3, {
                ease: Power3.easeInOut,
                autoAlpha: toAlpha,
                display: toDisplay,
            });
        };
        this.show = function () {
            this.input.addClass("is-error");
            this.tween(1, "block");
        };
        this.hide = function () {
            this.input.removeClass("is-error");
            this.tween(0, "none");
        };
    };

    function formField(i) {
        var id = "#js-ff-default-" + i;
        var input = $(id + " .tk-ff__input");
        var tick = $(id + " .tk-ff__icon--approved");
        var error = $(id + " .tk-ff__error");
        var errorMessage = new DisplayError(input, error);

        function checkValue() {
            if (input.val() != "") {
                tick.addClass("is-active");
            } else {
                tick.removeClass("is-active");
            };
        };

        input.keyup(function () {
            errorMessage.hide();
            tick.removeClass("is-active");
        });

        input.focusout(function () {
            checkValue();
            if ($(this).prop("required")) {
                if (input.val() == "") {
                    errorMessage.show();
                    submit = false;
                } else {
                    submit = true;
                };
            };
        });

        checkValue();
        submitButton(input, error);
    };

    if ($(".js-ff-default")[0]) {
        submit = false;
        $(".js-ff-default").each(function (i) {
            $(this).attr("id", "js-ff-default-" + i);
            formField(i);
        });
    };

    function checkDate() {
        var input = $(".js-ff-date .tk-ff__input");
        var error = $(".js-ff-date .tk-ff__error");
        var tick = $(".js-ff-date .tk-ff__icon--approved");
        var errorMessage = new DisplayError(input, error);

        function checkValue() {
            if (input.val().length == 10) {
                submit = true;
                tick.addClass("is-active");
            } else {
                tick.removeClass("is-active");
                submit = false;
            };
        };

        if (input[0]) {
            submit = false;
            checkValue();

            // only numbers are valid input
            input.keydown(function (e) {
                if (!((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || (e.which === 8) || (e.which === 9))) {
                    return false;
                };
            });

            input.keyup(function () {
                errorMessage.hide();
                checkValue();

                // add hyphen when digits are typed
                var n = input.val();
                if (input.val().length == 2) {
                    input.val(n + "-");
                };
                if (input.val().length == 5) {
                    input.val(n + "-");
                };
            });

            input.focusout(function () {
                if (input.val().length == 10) {
                    submit = true;
                } else {
                    errorMessage.show();
                    submit = false;
                };
            });
        };

        submitButton(input, error);
    };
    checkDate();

    function checkEmail() {
        var typingTimer;
        var serverCallSym;
        var isValidEmail;
        var emailField = document.getElementById("email");
        var obj = ".js-ff-email";
        var input = $(obj + " .tk-ff__input");
        var loading = $(obj + " .tk-ff__icon--loading");
        var tick = $(obj + " .tk-ff__icon--approved");
        var known = $(obj + " .tk-ff__icon--known");
        var knownMessage = $(obj + " .tk-ff__message");
        var error = $(obj + " .tk-ff__error");
        var buttonText = $(".js-submit-button").text();
        var errorMessage = new DisplayError(input, error);

        // user is finished typing
        function doneTyping() {
            if (isValidEmail) {
                loading.addClass("is-active");
                serverCallSym = setTimeout(() => {
                    submit = true;
                    if (input.val().indexOf("@ns.nl") != -1) {
                        loading.removeClass("is-active");
                        known.addClass("is-active");
                        knownMessage.addClass("is-active");
                        $(".js-submit-button").text("Inloggen");
                        linkLocation = "/bestellen/ov-chipkaart-user";
                    } else {
                        loading.removeClass("is-active");
                        tick.addClass("is-active");
                    };
                }, 300);
            } else {
                loading.removeClass("is-active");
                tick.removeClass("is-active");
                known.removeClass("is-active");
            };
        };

        if (emailField) {
            submit = false;
            isValidEmail = email.checkValidity();

            // on keyup, start the countdown
            input.keyup(function () {
                errorMessage.hide();
                clearTimeout(typingTimer);
                clearTimeout(serverCallSym);
                typingTimer = setTimeout(doneTyping, 750);
                loading.removeClass("is-active");
                tick.removeClass("is-active");
                known.removeClass("is-active");
                knownMessage.removeClass("is-active");
                isValidEmail = email.checkValidity();
                $(".js-submit-button").text(buttonText);
                linkLocation = linkLocationDefault;
            });

            // on keydown, clear the countdown 
            input.keydown(function () {
                submit = false;
                clearTimeout(typingTimer);
            });

            input.focusout(function () {
                if (isValidEmail) {
                    submit = true;
                    sessionStorage.setItem("email", $("#email").val());
                } else {
                    errorMessage.show();
                };
            });

            doneTyping();
            submitButton(input, error);
        };
    };
    checkEmail();

    function checkPostal() {
        var input = $(".js-ff-postal .tk-ff__input");
        var tick = $(".js-ff-postal .tk-ff__icon--approved");
        var error = $(".js-ff-postal .tk-ff__error");
        var address = $(".tk-ff__address");
        var errorMessage = new DisplayError(input, error);

        // check value
        function checkValue() {
            if (input.val().length == 6) {
                tick.addClass("is-active");
                submit = true;
                TweenLite.to(address, .2, {
                    ease: Power3.easeInOut,
                    autoAlpha: 1,
                    scaleY: 1,
                    display: "grid",
                });
            } else {
                tick.removeClass("is-active");
                submit = false;
                TweenLite.to(address, .2, {
                    ease: Power3.easeInOut,
                    autoAlpha: 0,
                    scaleY: 0.7,
                    display: "none",
                });
            };
        };

        if (input[0]) {
            submit = false;
            checkValue();

            // prevent spacebar input
            input.keypress(function (e) {
                if (e.which === 32) {
                    return false;
                };
            });

            // show or hide address on completed postal code
            input.keyup(function () {
                errorMessage.hide();
                checkValue();
            });

            // show error on focusout if input is correct
            input.focusout(function () {
                if (input.val().length != 6) {
                    errorMessage.show();
                };
            });
        };

        submitButton(input, error);
    };
    checkPostal();

    function addAddressNumber() {
        var input = $("#huisnummer");
        var houseAddition = $("#toevoeging");

        function addNumber() {
            $(".tk-ff__address-number").text(" " + input.val() + houseAddition.val());
        };

        if (input.val() != "" || houseAddition.val() != "") {
            addNumber();
        };

        input.keyup(function () {
            addNumber();
        });

        houseAddition.keyup(function () {
            addNumber();
        });
    };
    addAddressNumber();

    function customAddress() {
        $(".tk-ff__address-icon").click(() => {
            TweenLite.to(".tk-ff__address", 0, {
                ease: Power3.easeInOut,
                autoAlpha: 0,
                display: "none",
            });
            TweenLite.to(".js-address-additional", 0.3, {
                ease: Power3.easeInOut,
                autoAlpha: 1,
                display: "block",
            });
        });
    };
    customAddress();

    // handle some form data
    function setFormData() {
        sessionStorage.setItem("firstName", $("#voornaam").val());
        sessionStorage.setItem("tussenvoegsel", $("#tussenvoegsel").val());
        sessionStorage.setItem("lastName", $("#achternaam").val());
    };

    function getFormData() {
        $(".js-set-email").text(sessionStorage.getItem("email"));
        $(".js-set-firstName").text(sessionStorage.getItem("firstName"));
        $(".js-set-tussenvoegsel").text(sessionStorage.getItem("tussenvoegsel"));
        $(".js-set-lastName").text(sessionStorage.getItem("lastName"));
    };
    getFormData();

    function submitButton(i, e) {
        var errorMessage = new DisplayError(i, e);
        $(".js-submit-link").click(function (event) {
            event.preventDefault();
            if (submit) {
                window.location = linkLocation;
            } else if (i.prop("required")) {
                errorMessage.show();
            };
            setFormData();
        });
    };

    // give checkboxes id's
    if ($(".tk-ff__checkbox")[0]) {
        $(".tk-ff__checkbox").each(function (i) {
            var obj = "checkbox" + i;
            $(".checkbox__input", this).attr("id", obj).attr("name", obj);
            $(".checkbox__label", this).attr("id", obj).attr("for", obj);
        });
    };
};
$(function () {
    form();
});





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
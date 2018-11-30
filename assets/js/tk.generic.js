// generic javascript
// ------------------------------------------------------------
$(document).ready(function () {

    // global vars
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    var window_width = Number;
    var window_height = Number;
    var mobile = Boolean;
    var scrolled = false;

    // animations
    var default_ease = Power3.easeInOut;



    // update screen height
    // ------------------------------------------------------------	
    function updateWindowSize() {
        window_width = $(window).innerWidth();
        window_height = $(window).innerHeight();

        // set breakpoints
        if (window_width > 912) {
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
    var submit = true;
    var linkLocationDefault = $(".js-submit-link").attr("href");
    var linkLocation = linkLocationDefault;

    function showError(i, e) {
        i.addClass("is-error");
        TweenLite.to(e, .3, {
            ease: default_ease,
            autoAlpha: 1,
            display: "block",
        });
    };

    function hideError(i, e) {
        i.removeClass("is-error");
        TweenLite.to(e, .3, {
            ease: default_ease,
            autoAlpha: 0,
            display: "none",
        });
    };

    function formField(i) {
        var id = "#js-ff-default-" + i;
        var input = $(id + " .tk-ff__input");
        var tick = $(id + " .tk-ff__icon--approved");
        var error = $(id + " .tk-ff__error");

        function checkValue() {
            if (input.val() != "") {
                tick.addClass("is-active");
            } else {
                tick.removeClass("is-active");
            };
        };

        input.keyup(function () {
            hideError(input, error);
            tick.removeClass("is-active");
        });

        input.focusout(function () {
            checkValue();
            if ($(this).prop("required")) {
                if (input.val() == "") {
                    showError(input, error);
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

            input.keyup(function () {
                hideError(input, error);
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
                    showError(input, error);
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

        var input = $(".js-ff-email .tk-ff__input");
        var loading = $(".js-ff-email .tk-ff__icon--loading");
        var tick = $(".js-ff-email .tk-ff__icon--approved");
        var known = $(".js-ff-email .tk-ff__icon--known");
        var knownMessage = $(".js-ff-email .tk-ff__message");
        var error = $(".js-ff-email .tk-ff__error");
        var buttonText = $(".js-submit-button").text();

        if (emailField) {
            submit = false;
            isValidEmail = email.checkValidity();

            // on keyup, start the countdown
            input.keyup(function () {
                hideError(input, error);
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
                clearTimeout(typingTimer);
            });

            input.focusout(function () {
                if (isValidEmail) {
                    submit = true;
                } else {
                    showError(input, error);
                    submit = false;
                };
            });

            if (isValidEmail) {
                submit = true;
            };

            // user is finished typing
            function doneTyping() {
                if (isValidEmail) {
                    loading.addClass("is-active");
                    serverCallSym = setTimeout(() => {
                        if (input.val() != "tjeerd@ns.nl") {
                            loading.removeClass("is-active");
                            tick.addClass("is-active");
                        } else {
                            loading.removeClass("is-active");
                            known.addClass("is-active");
                            knownMessage.addClass("is-active");
                            $(".js-submit-button").text("Inloggen");
                            linkLocation = "https://login.ns.nl";
                        };
                    }, 300);
                } else {
                    loading.removeClass("is-active");
                    tick.removeClass("is-active");
                    known.removeClass("is-active");
                };
            };

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

        // check value
        function checkValue() {
            if (input.val().length == 6) {
                tick.addClass("is-active");
                submit = true;
                TweenLite.to(address, .2, {
                    ease: default_ease,
                    autoAlpha: 1,
                    scaleY: 1,
                    display: "grid",
                });
            } else {
                tick.removeClass("is-active");
                submit = false;
                TweenLite.to(address, .2, {
                    ease: default_ease,
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
                if (e.which === 32)
                    return false;
            });

            // show or hide address on completed postal code
            input.keyup(function () {
                hideError(input, error);
                checkValue();
            });

            // show error on focusout if input is correct
            input.focusout(function () {
                if (input.val().length == 6) {

                } else {
                    showError(input, error);
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
                ease: default_ease,
                autoAlpha: 0,
                display: "none",
            });
            TweenLite.to(".js-address-additional", 0.3, {
                ease: default_ease,
                autoAlpha: 1,
                display: "block",
            });
        });
    };
    customAddress();

    function submitButton(i, e) {
        $(".js-submit-link").click(function (event) {
            event.preventDefault();
            if (submit) {
                window.location = linkLocation;
            } else if (i.prop("required")) {
                showError(i, e);
            };
        });
    };







    // datepicker
    // ------------------------------------------------------------
    $(".js-datepicker-bs, .js-datepicker-scr").click(() => {
        $(".darkener").addClass("overlay__close");
    });

    $(".js-datepicker-bs").click(() => {
        $("body").removeClass().addClass("tk-datepicker-bs");
        TweenLite.fromTo(".overlay__scrollContainer", 0.3, {
            autoAlpha: 0,
            y: 300
        },{
            ease: default_ease,
            autoAlpha: 1,
            y: 0
        });
    });

    $(".tk-datepicker__day--enabled").click(function() {
        $(this).toggleClass("is-active");
    });
    









    // include html
    // ------------------------------------------------------------
    function includeHtml() {
        var z, i, elmnt, file, xhttp;
        /*loop through a collection of all HTML elements:*/
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("include");
            if (file) {
                /*make an HTTP request using the attribute value as the file name:*/
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        /*remove the attribute, and call this function once more:*/
                        elmnt.removeAttribute("include");
                        includeHtml();
                    };
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                /*exit the function:*/
                return;
            };
        };
    };
    includeHtml();

});
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
    var isValidEmail;

    // give every form field an ID and trigger functions
    $(".tk-form-field").each(function (i) {
        $(this).attr("id", "tk-ff-" + i);
        forms(i);
    });

    function forms(i) {
        var id = "#tk-ff-" + i;
        var input = $(id + " .tk-input");
        var label = $(id + " .tk-label");
        var tick = $(id + " .tk-val-standard");
        var error = $(id + " .tk-form-field__error");
        var emailField = document.getElementById("email");


        function showError() {
            input.addClass("is-error");
            TweenLite.to(error, .3, {
                ease: default_ease,
                autoAlpha: 1,
                display: "block",
            });
        };

        function hideError() {
            input.removeClass("is-error");
            TweenLite.to(error, .3, {
                ease: default_ease,
                autoAlpha: 0,
                display: "none",
            });
        };

        // styling when field is filled
        input.keyup(function () {
            hideError();
            if (emailField) {
                isValidEmail = email.checkValidity();
            }
            if (input.val() != "") {
                tick.addClass("is-active");
            } else {
                tick.removeClass("is-active");
            };
        });

        $(".js-submit-link").click(function (e) {
            e.preventDefault();
            var linkLocation = this.href;

            if (emailField) {
                if (isValidEmail) {
                    window.location = linkLocation;
                } else {
                    showError();
                };
            } else {
                if (input.val() != "") {
                    window.location = linkLocation;
                } else {
                    showError();
                };
            };
        });
    };

    // when user is done typing trigger loader / validate
    function doneTyping() {
        // setup before functions
        var typingTimer;
        var doneTypingInterval = 500;
        var serverCallSym;
        var serverCallInterval = 300;
        var input = $(".tk-input--email");

        // on keyup, start the countdown
        input.on('keyup', function () {
            clearTimeout(typingTimer);
            clearTimeout(serverCallSym);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $(".js-email-loader, .tk-form-field__val--approved").removeClass("is-active");
        });

        // on keydown, clear the countdown 
        input.on('keydown', function () {
            clearTimeout(typingTimer);
        });

        // user is "finished typing," do something
        function doneTyping() {
            if (isValidEmail) {
                $(".js-email-loader").addClass("is-active");
                serverCallSym = setTimeout(serverCallFinished, serverCallInterval);
            } else {
                $(".js-email-loader, .tk-form-field__val--approved").removeClass("is-active");
            };
        };

        function serverCallFinished() {
            $(".js-email-loader").removeClass("is-active");
            $(".tk-form-field__val--approved").addClass("is-active");
        };
    };
    doneTyping();







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
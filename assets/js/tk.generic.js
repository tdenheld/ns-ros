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
    var emailField = document.getElementById("email");
    var submit = false;

    // constructors
    // -------------
    function checkValue(i, t) {
        if (i.val() != "") {
            t.addClass("is-active");
        } else {
            t.removeClass("is-active");
        };
    };

    function checkEmail() {
        if (emailField) {
            isValidEmail = email.checkValidity();
        };
    };
    checkEmail();

    function checkDate() {
        var date = $(".tk-ff--date .tk-ff__input");
        var tickDate = $(".tk-ff--date .tk-ff__icon--approved");

        if (date[0]) {
            if (date.val().length == 10) {
                tickDate.addClass("is-active");
            } else {
                tickDate.removeClass("is-active");
            };
        };
    };
    checkDate();

    // errors
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

    function checkError(i, e) {
        // reset submit button
        submit = false;

        if (emailField) {
            if (isValidEmail) {
                submit = true;
            } else {
                showError(i, e);                
            };
        } else {
            if (i.val() != "") {
                submit = true;
            } else {
                showError(i, e);
            };
        };
    };

    // generic formfield contrusctor
    function formField(i) {
        var id = "#tk-ff-" + i;
        var input = $(id + " .tk-ff__input");
        var tick = $(id + " .tk-val-standard");
        var error = $(id + " .tk-ff__error");

        checkValue(input, tick);

        input.keyup(function () {
            hideError(input, error);
            checkEmail();
            checkDate();
            if (input.val() == "") {
                tick.removeClass("is-active");
            };
        });

        input.focusout(function () {
            checkValue(input, tick);
            if ($(this).prop("required")) {
                checkError(input, error);
            };
        });

        $(".js-submit-link").click(function (e) {
            e.preventDefault();
            linkLocation = this.href;
            checkError(input, error);
            if (submit) {
                window.location = linkLocation;
            };
        });
    };

    // give every form field an ID and init generic formfield methods
    $(".tk-ff").each(function (i) {
        $(this).attr("id", "tk-ff-" + i);
        formField(i);
    });


    // when user is done typing trigger loader / validate
    function doneTyping() {
        // setup before functions
        var typingTimer;
        var doneTypingInterval = 500;
        var serverCallSym;
        var serverCallInterval = 300;
        var input = $(".tk-ff--email .tk-ff__input");
        var loading = $(".tk-ff--email .tk-ff__icon--loading");
        var approved = $(".tk-ff--email .tk-ff__icon--approved");

        // on keyup, start the countdown
        input.on('keyup', function () {
            clearTimeout(typingTimer);
            clearTimeout(serverCallSym);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            loading.removeClass("is-active");
            approved.removeClass("is-active");
        });

        // on keydown, clear the countdown 
        input.on('keydown', function () {
            clearTimeout(typingTimer);
        });

        // user is "finished typing," do something
        function doneTyping() {
            if (isValidEmail) {
                loading.addClass("is-active");
                serverCallSym = setTimeout(serverCallFinished, serverCallInterval);
            } else {
                loading.removeClass("is-active");
                approved.removeClass("is-active");
            };
        };
        doneTyping();

        function serverCallFinished() {
            loading.removeClass("is-active");
            approved.addClass("is-active");
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
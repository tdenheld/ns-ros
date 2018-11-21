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

    // when something is typed in the form
    $(".js-input").keyup(function () {
        var el = $(this);
        if (el.val() != '') {
            el.addClass("is-filled");
        } else {
            el.removeClass("is-filled");
        };
    });

    function doneTyping() {
        // setup before functions
        var typingTimer;
        var doneTypingInterval = 1500;
        var input = $(".js-input-email");

        // on keyup, start the countdown
        input.on('keyup', function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $(".js-input-email").removeClass("is-loading");
        });

        // on keydown, clear the countdown 
        input.on('keydown', function () {
            clearTimeout(typingTimer);
        });

        // user is "finished typing," do something
        function doneTyping() {
            if ($(".js-input-email").val() != '') {
                $(".js-input-email").addClass("is-loading");
            } else {
                $(".js-input-email").removeClass("is-loading");
            };
        };
    };
    doneTyping();

    // button validation
    $(".js-submit-link").click(function (e) {
        // stop href from loading normal at a click
        e.preventDefault();
        // load link into var
        var linkLocation = this.href;
        // check if input is not empty
        if ($(".js-input").val() != '') {
            window.location = linkLocation;
        } else {
            $(".js-input").addClass("is-denied");
        };
    });

    // when focus state is triggered
    $(".js-input").focusin(function () {
        $(".js-label").addClass("is-focused");
    });
    $(".js-input").focusout(function () {
        $(".js-label").removeClass("is-focused");
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
// form
// ------------------------------------------------------------
// ------------------------------------------------------------

function form() {
    var submit = true;
    var linkLocationDefault = $(".js-submit-link").attr("href");
    var linkLocation = linkLocationDefault;
    var addressIsCustom;

    // error constructor
    function DisplayError(input, error) {
        this.input = input;
        this.error = error;
        this.show = function () {
            this.input.addClass("is-error");
            this.error.slideDown(200);
        };
        this.hide = function () {
            this.input.removeClass("is-error");
            this.error.slideUp(200);
        };
    };




    // default form field
    // --------------------------------------------------------------------------
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

        input.keyup(() => {
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






    // date of birth field
    // --------------------------------------------------------------------------
    function checkDate(x) {
        var obj = ".js-ff-date-" + x;
        var input = $(obj + " .tk-ff__input");
        var error = $(obj + " .tk-ff__error");
        var tick = $(obj + " .tk-ff__icon--approved");
        var known = $(obj + " .tk-ff__icon--known");
        var knownMessage = $(obj + " .tk-ff__message");
        var errorMessage = new DisplayError(input, error);

        function checkValue() {
            if (input.val().length == 10 && input.val() != "01-01-2006") {
                tick.addClass("is-active");
                submit = true;
            } else {
                tick.removeClass("is-active");
                submit = false;
            };

            if (input.val() == "01-01-2006") {
                known.addClass("is-active");
                knownMessage.addClass("is-active");
            } else {
                known.removeClass("is-active");
                knownMessage.removeClass("is-active");
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

            input.keyup(() => {
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

            input.focusout(() => {
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
    checkDate("customer");
    checkDate("child");





    // email field
    // --------------------------------------------------------------------------
    function checkEmail() {
        var typingTimer;
        var serverCallSym;
        var isValidEmail;
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
                        $("#customer-data").attr("action", linkLocation);
                    } else {
                        loading.removeClass("is-active");
                        tick.addClass("is-active");
                        $(".op-c-data").slideDown(200);
                    };
                }, 300);
            } else {
                loading.removeClass("is-active");
                tick.removeClass("is-active");
                known.removeClass("is-active");
            };
        };

        if ($(obj)[0]) {
            submit = false;
            isValidEmail = email.checkValidity();

            // on keyup, start the countdown
            input.keyup(() => {
                errorMessage.hide();
                clearTimeout(typingTimer);
                clearTimeout(serverCallSym);
                typingTimer = setTimeout(doneTyping, 1000);
                loading.removeClass("is-active");
                tick.removeClass("is-active");
                known.removeClass("is-active");
                knownMessage.removeClass("is-active");
                isValidEmail = email.checkValidity();
                $(".js-submit-button").text(buttonText);
                linkLocation = linkLocationDefault;
                $(".op-c-data").slideUp(200);
            });

            // on keydown, clear the countdown 
            input.keydown(() => {
                submit = false;
                clearTimeout(typingTimer);
            });

            input.focusout(() => {
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







    // postal code
    // -----------------------------------------------------------------
    function checkPostal() {
        var input = $(".js-ff-postal .tk-ff__input");
        var tick = $(".js-ff-postal .tk-ff__icon--approved");
        var error = $(".js-ff-postal .tk-ff__error");
        var errorMessage = new DisplayError(input, error);

        // check value
        function checkValue() {
            if (input.val().length == 6) {
                tick.addClass("is-active");
                submit = true;
            } else {
                tick.removeClass("is-active");
                submit = false;
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
            input.keyup(() => {
                errorMessage.hide();
                checkValue();
            });

            // show error on focusout if input is correct
            input.focusout(() => {
                if (input.val().length != 6) {
                    errorMessage.show();
                };
            });
        };

        submitButton(input, error);
    };
    checkPostal();





    // address
    // -----------------------------------------------------------------
    // when done typing house number show full address
    function address() {
        var typingTimer;
        var serverCallSym;
        var obj = ".js-ff-house";
        var input = $(obj + " .tk-ff__input");
        var tick = $(obj + " .tk-ff__icon--approved");
        var loading = $(".tk-ff__address .tk-ff__icon--loading");
        var error = $(obj + " .tk-ff__error");
        var address = $(".tk-ff__address");
        var addressContainer = $(".tk-ff__address-container");
        var errorMessage = new DisplayError(input, error);
        var inputPostal = $(".js-ff-postal .tk-ff__input");

        function doneTyping() {
            if (!addressIsCustom) {
                addressContainer.removeClass("is-active");
                if (input.val() != "" && inputPostal.val().length == 6) {
                    loading.addClass("is-active");
                    address.slideDown(100);
                    serverCallSym = setTimeout(() => {
                        submit = true;
                        loading.removeClass("is-active");
                        tick.addClass("is-active");
                        addressContainer.addClass("is-active");
                    }, 500);
                } else {
                    loading.removeClass("is-active");
                    tick.removeClass("is-active");
                    address.slideUp(100);
                };
            };
        };

        if ($(".js-ff-postal")[0]) {
            inputPostal.keyup(() => {
                clearTimeout(typingTimer);
                clearTimeout(serverCallSym);
                typingTimer = setTimeout(doneTyping, 500);
            });
            inputPostal.keydown(() => {
                clearTimeout(typingTimer);
            });
        };

        if ($(obj)[0]) {
            input.keyup(() => {
                clearTimeout(typingTimer);
                clearTimeout(serverCallSym);
                typingTimer = setTimeout(doneTyping, 500);
                errorMessage.hide();
                if (!addressIsCustom) {
                    tick.removeClass("is-active");
                };
            });

            input.keydown(() => {
                submit = false;
                clearTimeout(typingTimer);
            });

            input.focusout(() => {
                if (input.val() == "") {
                    errorMessage.show();
                    submit = false;
                } else {
                    submit = true;
                };
            });

            doneTyping();
            submitButton(input, error);
        };
    };
    address();

    function addAddressNumber() {
        var input = $("#huisnummer");
        var houseAddition = $("#toevoeging");

        function addNumber() {
            $(".tk-ff__address-number").text(" " + input.val() + houseAddition.val());
        };
        if (input.val() != "" || houseAddition.val() != "") {
            addNumber();
        };
        input.keyup(() => {
            addNumber();
        });
        houseAddition.keyup(() => {
            addNumber();
        });
    };
    addAddressNumber();

    function customAddress() {
        $(".tk-ff__address-icon").click(() => {
            addressIsCustom = true;
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








    // handle form data in session
    // ----------------------------------------------------------------
    function setFormData() {
        if ($("#customer-data")[0]) {
            $(".tk-ff__input").each(function () {
                sessionStorage.setItem(this.id, $("#" + this.id).val());
            });
        };
    };
    setFormData();

    function getFormData() {
        $(".js-customer-data").each(function () {
            var data = sessionStorage.getItem(this.id);
            if (data !== "") {
                $(this).text(data);
            };
        });
    };
    getFormData();








    // submit button
    // -------------------------------------------------------------------------
    function submitButton(i, e) {
        var obj = $(".js-submit-link");
        var btn = $(".js-submit-button");
        var loader = $(".js-submit-loader-icon");
        var errorMessage = new DisplayError(i, e);

        obj.click((event) => {
            event.preventDefault();
            if (submit) {
                if (!obj.hasClass("js-submit-loader")) {
                    window.location = linkLocation;
                } else {
                    btn.addClass("is-loading");
                    loader.addClass("is-active");
                    setTimeout(() => {
                        window.location = linkLocation;
                    }, 1500);
                };
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



    // switch to order for someone else
    // ------------------------------------------------------------
    function otherUser() {
        var time = 250;
        var className = ".js-other-switch";
        var obj = $(className);

        if (obj[0]) {
            submit = true;
            obj.click(function () {
                if (!$(this).hasClass("is-active")) {
                    $(".js-other-margin").show();
                    submit = false;
                } else {
                    $(".js-other-margin").delay(100).hide(time);
                    submit = true;
                }
                $(this).toggleClass("is-active");
                $(".js-other-form").slideToggle(time);
                $(".js-other-label").toggleClass("is-active");
            });
        };
    };
    otherUser();
};

$(function () {
    form();
});
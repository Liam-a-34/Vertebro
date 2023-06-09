$(function() {
    $(".large-service-div").click(function() {
    const $serviceText = $(this).find(".large-service-text");
    $serviceText.toggleClass("service-extend").delay(250).toggleClass("service-padding").end()
    .delay(250).toggleClass("service-shadow");
    });

    $(".hamburger").on("click", function() {
      $(".mobile-header-dropdown").toggleClass("mobile-drop-height")
    })

    $(".map-hamburger").click(function() {
      $(".location-box").toggleClass("location-box-position")
    })
    
    $("#submit-button").click(function(e) {
    e.preventDefault();

    var templateParams = {
        name: `${$("#fname").val()} ${$("#lname").val()}`,
        email: `${$("#email").val()}`,
        phone: `${$("#phone").val()}`,
        message: `${$("#help").val()}`
    }

    const inputs = ["fname", "lname", "email", "phone", "help"];

    inputs.forEach(function(input) {
      const $input = $("#" + input);
      const $div = $("#" + input + "-div");
      if ($input.val() !== "") {
        $div.removeClass("incorrect-input").addClass("correct-input");
        $input.removeClass("incorrect-input").addClass("correct-input");
      } else {
        $div.removeClass("correct-input").addClass("incorrect-input");
        $input.removeClass("correct-input").addClass("incorrect-input");
      }
    });
    
    const $messageSent = $(".message-sent");
    const allInputsFilled = inputs.every(input => $("#" + input).val() !== "");
    if (allInputsFilled) {
      $messageSent.toggleClass("message-sent-toggle").delay(2000).queue(function() {
        $(this).toggleClass("message-sent-toggle");

        emailjs.send('service_1nbpzia', 'template_n6tti7x', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

        inputs.forEach(function(input) {
          $("#" + input + "-div, #" + input).removeClass("correct-input incorrect-input");
        });
        inputs.forEach(input => $("#" + input).val(""));
        $(this).dequeue();
      });
    }

});
});



    


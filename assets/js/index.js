

$(document).ready(function() {

    $(".large-service-div").click(function() {
        $(this).find(".large-service-text").toggleClass("service-extend")
        setTimeout(() => {
            $(this).find(".large-service-text").toggleClass("service-padding")
        },250)
        setTimeout(() => {
            $(this).toggleClass("service-shadow")
        },500)
    })  

})


    


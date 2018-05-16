$(document).ready(function () {
    //Slider Section
    var animationSpeed = 2000;
    var pause = 6000;
    var currentSlide = 1;
    var $slideContainer = $(".slider-container").find('.slider-list');
    var $slides = $slideContainer.find('.slide');
    var interval;
    var width;

    //Start Slider when windows width is less than 760px
    function startSlider() {
        interval = setInterval(function () {
            $(".nextSlideCarousal").trigger("click");
        }, pause);
    }
    //Check windows width on browser width change and call startSlider if width <=760 else stop slider
    $(window).resize(function () {
        var windowWidth = $(window).width();
        if (windowWidth <= 760) {
            startSlider();
        } else {
            clearInterval(interval);
        }
    });

    //change slide depend on id attr in prev or next button 
    $('.nextSlideCarousal,.prevSlideCarousal').on("click", function(){
        width = $(".slide").width();
        let id = $(this).attr("id");

        if(id === "next") {
            currentSlide++;
            if (currentSlide == $slides.length + 1) {
                currentSlide = 1;
            }
        } else {
            currentSlide--;
            if (currentSlide === 0) {
                currentSlide = totalSlideCount;
            }
        }
        var currentLeft = -(currentSlide - 1) * width;
        $slideContainer.animate({ 'margin-left': currentLeft }, animationSpeed);
    });

    //Navbar links show and hide in mobile view
    $(".icon").on('click', function() {
        if (!$(".link-container").hasClass("check")) {
            $(".link-container").addClass("check");
        } else {
            $(".link-container").removeClass("check")
        } 
    });

    //Search pets by typing your faviourite pet's name
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".pets-section .pet-container").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    var $filterCheckboxes = $('input[type="checkbox"]');

    //Filter pets by category
    $filterCheckboxes.on('change', function() {
        $(this).parent(".filterOption").siblings().find("input[type='checkbox']").prop('checked',false); //Remove other chekbox checked attr
        var selectedFilters = {}; //object for selected checkbox
        //filter checked checkbox value for selectedFilters
        $filterCheckboxes.filter(':checked').each(function() {
            if (!selectedFilters.hasOwnProperty(this.name)) {
                selectedFilters[this.name] = "";
            }
            selectedFilters[this.name]=$(this).attr("class");
        });

        //check if selectedFilters object has any property and filter according to that key
        //if selected filter is empty then show all pets
        if (Object.keys(selectedFilters).length !== 0) {
            $.each(selectedFilters, function (name, filterValues) {
                $(".pets-section .pet-container").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(filterValues) > -1)
                });
            });
        } else {
            $(".pet-container").show();
        }
        
    });
});
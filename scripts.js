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
    startSlider();

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
                currentSlide = $slides.length;
            }
        }
        var currentLeft = -(currentSlide - 1) * width;
        $slideContainer.animate({ 'margin-left': currentLeft }, animationSpeed);
    });

    //Navbar links show and hide in mobile view
    $(".icon").on('click', function() {
        $(".link-container").toggleClass("check");
    });

    //Search pets by typing your faviourite pet's name
    $("#search").on("keyup", function () {
        var value = $(this).val().trim().toLowerCase();
        console.log(value);
        searchFilter(value);
    });

    var $filterCheckboxes = $('input[type="checkbox"]');

    //Filter pets by category
    $filterCheckboxes.on('change', function() {
        $(this).parent(".filterOption").siblings().find($filterCheckboxes).prop('checked',false); //Remove other chekbox checked attr
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
                searchFilter(filterValues);
            });
        } else {
            $(".pet-container").show();
        }
        
    });
});
//Search Filter Function
function searchFilter(value) {
    $(".pets-section .pet-container").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) != -1);
    });
}

// function palidromString(str){
//  	var revStr = "";
//  	console.log(str);
//  	for(var i=str.length-1; i>-1;i--) {
//  		revStr += str[i];
//  	}
//  	console.log(revStr);
//  	if(revStr === str) {
//  		alert("Palindrom");
//  	} else {
//  		alert("Not Palindrom");
//  	}
//  }
//  palidromString("nurses run");
function sum(n) {
	var sum = 0;
	for(var i=n;i>0;i--) {
		if(n%3 == 0) {
			sum +=n;
			console.log(n);
		} else if(n%5 == 0) {
			sum +=n;
			console.log(n);
		}
		n--;
	}
	console.log(sum);
}
sum(15);
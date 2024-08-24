// Mobile Click Drop Down
$('.dropnav > a').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
});


// toggle 
$(".toggle").click(function() {
    $(this).toggleClass("on");
    $(".menufull").toggleClass("activated");
    $(".menufull").slideToggle();
});


// Sticy nav bar 
if ($(window).scrollTop() >= 300) {
    $('header').addClass('fixed-header');
} else {
    $('header').removeClass('fixed-header');
};


// All Navigation Variables in mobile views
var middleNavSec = document.getElementById("mobileNav");
var middleNavUl = middleNavSec.querySelector("ul")
var toggleMenuSec = document.querySelector('.allmoblis');

// window resize Qurey
function handleResize() {
    //Resposive Qurey 767 pixels
    if (window.innerWidth <= 767) {
        middleNavSec.style.display = "none";
        toggleMenuSec.append(middleNavUl);
    } else {
        middleNavSec.style.display = "block";
        middleNavSec.append(middleNavUl);
    }
}

// window resize event
window.addEventListener("resize", handleResize);

// set the initial state
handleResize();


// Scroll Top
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.scroll_To_Top').fadeIn();
    } else {
        $('.scroll_To_Top').fadeOut();
    }
});
$('.scroll_To_Top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 10);
    return false;
});


// DownBottom
$('.box-sliderbtn').click(function() {
    $('html, body').animate({ scrollTop: $('.services').offset().top }, 'slow');
    return false;
});



// Services Tab
$(document).ready(function () {
    $('.sertabtn').click(function () {
        $(".sertabconbox").removeClass('tab-active');
        $(".sertabconbox[data-id='" + $(this).attr('data-id') + "']").addClass("tab-active");
        $(".sertabtn").removeClass('active-a');
        $(this).parent().find(".sertabtn").addClass('active-a');
    });
});
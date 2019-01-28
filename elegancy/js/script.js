var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var dots = document.getElementsByClassName("slides__controls-dot");
  var slides = document.getElementsByClassName("slides__item");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var leftArrow = document.querySelector(".slides__button--prev");
var rightArrow = document.querySelector(".slides__button--next");

leftArrow.addEventListener('click', ()=> plusSlides(-1));
rightArrow.addEventListener('click', ()=> plusSlides(1));

var dots = document.getElementsByClassName("slides__controls-dot");

dots[0].addEventListener('click', ()=> currentSlide(1));
dots[1].addEventListener('click', ()=> currentSlide(2));
dots[2].addEventListener('click', ()=> currentSlide(3));
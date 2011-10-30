/**
 * 
 */

var currentSlide = 0;
var slides = null;
var move = function (direction) {
	var notEnd = (direction === "previous" ? (currentSlide != 0) : (currentSlide != slides.length - 1));
	if (notEnd) {
		if (currentSlide - 3 >= 0) {
			slides[currentSlide - 3].className = "slide slide-" + (direction === "previous" ? "previous-2" : "hidden");
		}
		if (currentSlide - 2 >= 0) {
			slides[currentSlide - 2].className = "slide slide-" + (direction === "previous" ? "previous" : "hidden");
		}
		if (currentSlide - 1 >= 0) {
			slides[currentSlide - 1].className = "slide slide-" + (direction === "previous" ? "current" : "previous-2");
		}
		slides[currentSlide].className = "slide slide-" + (direction === "previous" ? "next" : "previous");
		if (currentSlide + 1 < slides.length) {
			slides[currentSlide + 1].className = "slide slide-" + (direction === "previous" ? "next-2" : "current");
		}
		if (currentSlide + 2 < slides.length) {
			slides[currentSlide + 2].className = "slide slide-" + (direction === "previous" ? "hidden" : "next");
		}
		if (currentSlide + 3 < slides.length) {
			slides[currentSlide + 3].className = "slide slide-" + (direction === "previous" ? "hidden" : "next-2");
		}
		currentSlide += (direction === "previous" ? -1 : 1);	
	}
};
var arrowKeyMove = function (e) {
	var e = e || window.event;
	if (parseInt(e.keyCode) == 37) {
		move('previous');
	} else if (parseInt(e.keyCode) == 39) {
		move('next');
	}
};
var init = function () {
	slides = document.getElementsByClassNames('slide');
	if (slides.length > 0) {
		//currentSlide = 2;
		//move('previous');
		slides[0].className = 'slide slide-current';
		slides[1].className = 'slide slide-next';
		slides[2].className = 'slide slide-next-2';
		var rest = slides.slice(3);
		for (var i = 0; i < rest.length; i++) {
			rest[i].className = 'slide slide-hidden';
		}
	}
};
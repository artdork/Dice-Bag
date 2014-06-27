// JavaScript Document

function giveMeRandom(maxNum, floor) {
	return (Math.floor(Math.random() * maxNum) + floor);
}

function dieSides() {
	if ( $('.selected').length > 0 ) {
		return $('.selected').val();
	} else {
		return 6;
	}
};

$(document).ready(function() {
 $('.changeDie').click(function() {
	  $(this).toggleClass('tapped');
  });
  
  $('ul.dieTypes li button').click(function() {
	  $('.selected').removeClass('selected');
	  $(this).addClass('selected');
	  if ( $('.changeDie').hasClass('tapped') ) {
		  $(this).removeClass('tapped');
	  }
	  $('.die').removeAttr('style');
  })  
});

function rollDie() {
	$('.die')
	.html('<img src="images/' + dieSides() + 'sided' + giveMeRandom((dieSides()), 1) + '.png" />')
	.removeAttr('style')
	.animate({ 
       bottom: giveMeRandom(275, 60) + 'px',
       left: giveMeRandom(190, -100) + 'px',
     }, 400)
	.addClass('rot').rotate({
            duration: 400,
            angle: 0,
            animateTo: giveMeRandom(110, 1020)});

};

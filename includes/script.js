/* 
JavaScript Document
Note: All code related to the random number generator which is not found
in index.html can be found in dlrng.js. All other JS can be found in this document.
*/

//dice roll has been triggered
function rollDie() {
	$('.die').html('<img src="images/6sideddie' + giveMeRandom(6, 1) + '.png"> '); 
}

    	

//Moves image to the screen 
$(document).ready(function() {
  $('.btn1').click(function() {
    $('.die').removeAttr('style');
	$('.die').removeClass('diespin');
	$('.die').animate({ 
       bottom: giveMeRandom(275, 60) + 'px',
       left: giveMeRandom(190, -100) + 'px',
     }, 400);
	$('.die').addClass('rot').rotate({
            duration: 400,
            angle: 0,
            animateTo: giveMeRandom(110, 1380)});
  })

});

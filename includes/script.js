// JavaScript Document


function rollDie() {
	$('.die').html('<img src="images/6sideddie' + (Math.floor(Math.random()*6)+1) + '.png"> '); 
};


//Moves image to the screen 
$(document).ready(function() {
  $('.btn1').click(function() {
    $('.die').removeAttr('style');
	$('.die').animate({ 
       top: '-360px',
       left: '50px',
     }, 500);
	$('.die').addClass('diespin');
  })

});

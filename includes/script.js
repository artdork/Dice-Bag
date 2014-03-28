// JavaScript Document



//Moves image to the screen 
$(document).ready(function() {

  $('.btn1').click(function() {
    $('.die').animate({ 
       top: '-360px',
       left: '50px',
     }, 500);
	$('.die').toggleClass('diespin');

  })

});

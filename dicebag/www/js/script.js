// JavaScript Document
var maxSearchIterations = 1000;
var min_x = -100;
var max_x = 110;
var min_y = 340;
var max_y = 670;
var filled_areas = [];
var howManyToRoll;
var obj = document.createElement("audio");   


function giveMeRandom(maxNum, floor) {
	return (Math.floor(Math.random() * maxNum) + floor);
}

function dieSides() {
	if ( $('.changeTypeOfDie .typeselected').length > 0 ) {
		return $('.changeTypeOfDie .typeselected').val();
	} else {
		return 6;
	}
};

function howManyDice() {
	if ( $('.changeHowManyDice .selected').length > 0 ) {
		return parseInt($('.changeHowManyDice .selected').attr('value'));
	} else {
		return 1;
	}
};

function rollThisMany() {
	var howManyToRoll;
	switch ( howManyDice() ) {
		  case 1: howManyToRoll = dieTypeImage();
				  break;
		  case 2: howManyToRoll = dieTypeImage()+dieTypeImage();
				  break;
		  case 3: howManyToRoll = dieTypeImage()+dieTypeImage()+ dieTypeImage();
				  break;
		  case 4: howManyToRoll = dieTypeImage()+dieTypeImage()+ dieTypeImage()+dieTypeImage();
				  break;
		  case 5: howManyToRoll = dieTypeImage()+dieTypeImage()+ dieTypeImage()+dieTypeImage()+dieTypeImage();
				  break;
		  case 6: howManyToRoll = dieTypeImage()+dieTypeImage()+ dieTypeImage()+dieTypeImage()+dieTypeImage()+dieTypeImage();
				  break
		}
	$('.dieimage').html(howManyToRoll);
}

function dieTypeImage() {
	return ('<img class="die" src="images/' + dieSides() + 'sided' + giveMeRandom((dieSides()), 1) + '.png" />');
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.accelerometer);
}

$(document).ready(function () {
	var watchId = 0;
	$('#btnWatch').bind('touchstart', function () {
		if ( watchId == 0 ) {
			watchId = navigator.accelerometer.watchAcceleration( 
				function ( acceleration ) {
					$('#txtX').attr('value', acceleration.x);
					$('#txtY').attr('value', acceleration.y);
					$('#txtZ').attr('value', acceleration.z);
					$('#btnWatch').html('Stop Watching');
					if ( (acceleration.z < -1) && (acceleration.y < -1) ) {
						rollDie();
					}
				},
				function ( error ) {
					console.log('Error');
				}, {
					frequency: 100
			});
		} else {
			navigator.accelerometer.clearWatch( watchId );
			$('#btnWatch').html('Start Watching');
			watchId = 0;
		}
	});
	
  $('.changeTypeOfDie > div > span > .ui-btn-text').html('<img src="images/6sided6.png" />');
  $('.changeTypeOfDie').click(function() {
	  $(this).toggleClass('tapped');
  });
  
  $('.changeHowManyDice').click(function() {
	  $(this).toggleClass('tapped');
  });
  
  $('ul.dieTypes li button').click(function() {
	  $('.typeselected').removeClass('typeselected');
	  $(this).addClass('typeselected');
	  if ( $('.changeTypeOfDie').hasClass('tapped') ) {
		  $(this).removeClass('tapped');
	  }
	  $('.die').removeAttr('style');
	  $('.changeTypeOfDie > div > span > .ui-btn-text').html('<img src="images/' + dieSides() + 'sided' + dieSides() + '.png" />');
	  $('.changeTypeOfDie .toggle').html('<img src="images/' + dieSides() + 'sided' + dieSides() + '.png" />');
  });
  
  $('ul.numberOfDice li button').click(function() {
	  $('.selected').removeClass('selected');
	  $(this).addClass('selected');
	  if ( $('.changeHowManyDice').hasClass('tapped') ) {
		  $(this).removeClass('tapped');
	  }
	  var newNumberOfDice = $(this).attr('value');
	  $('.die').removeAttr('style');
	  $('.changeHowManyDice > div > span > .ui-btn-text').html( newNumberOfDice );
	  $('.changeHowManyDice .toggle').html( newNumberOfDice );
  });
  
	obj.setAttribute('src','sound_diceroll.wav');
	 $.get();
	  
	$('.changeTypeOfDie li').each(function() {
    	var dieImage = $(this).find('button').html();
    	$(this).find('.ui-btn-text').html(dieImage);
	});

});

function rollDie() {
	rollThisMany();
	$('.die').each(function() {
		$(this).removeAttr('style').addClass('rot').rotate({
            duration: giveMeRandom(0, 550),
            angle: 0,
            animateTo: giveMeRandom(110, 1000)
			})
	});
	randomize();
    obj.play(); 
};

function calc_overlap(a1) {
    var overlap = 0;
/*	var a1 = new Object();
	a1.height = 100;
	a1.width = 100;
	var a2 = new Object();
	a2.height = 100;
	a2.width = 100;
*/    for (i = 0; i < filled_areas.length; i++) {

        var a2 = filled_areas[i];

        // no intersection cases
        if (a1.x + a1.width < a2.x) {
            continue;
        }
        if (a2.x + a2.width < a1.x) {
            continue;
        }
        if (a1.y + a1.height < a2.y) {
            continue;
        }
        if (a2.y + a2.height < a1.y) {
            continue;
        }

        // intersection exists : calculate it !
        var x1 = Math.max(a1.x, a2.x);
        var y1 = Math.max(a1.y, a2.y);
        var x2 = Math.min(a1.x + a1.width, a2.x + a2.width);
        var y2 = Math.min(a1.y + a1.height, a2.y + a2.height);

        var intersection = ((x1 - x2) * (y1 - y2));
        overlap += intersection;
    }
    return overlap;
}

function randomize() {

    filled_areas.splice(0, filled_areas.length);

    var index = 0;
    $('.die').each(function() {
        var rand_x = 0;
        var rand_y = 0;
        var i = 0;
        var smallest_overlap = 50;
        var best_choice;
        var area;
        for (i = 0; i < maxSearchIterations; i++) {
            rand_x = Math.round(min_x + ((max_x - min_x) * (Math.random() % 1)));
            rand_y = Math.round(min_y + ((max_y - min_y) * (Math.random() % 1)));
            area = {
                x: rand_x,
                y: rand_y,
                width: 80,
                height: 80
            };
            var overlap = calc_overlap(area);
            if (overlap < smallest_overlap) {
                smallest_overlap = overlap;
                best_choice = area;
            }
            if (overlap === 0) {
                break;
            }
        }

        filled_areas.push(best_choice);

        $(this).css({
            position: "absolute",
            "z-index": index++
        });
        $(this).animate({
            left: rand_x,
            bottom: rand_y
        });
    });
    return false;
}


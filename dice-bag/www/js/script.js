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

$(document).ready(function() {
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
	  $('.changeTypeOfDie .toggle')
	.html('<img src="images/' + dieSides() + 'sided' + dieSides() + '.png" />');
  });
  
  $('ul.numberOfDice li button').click(function() {
	  $('.selected').removeClass('selected');
	  $(this).addClass('selected');
	  if ( $('.changeHowManyDice').hasClass('tapped') ) {
		  $(this).removeClass('tapped');
	  }
	  $('.die').removeAttr('style');
	  $('.changeHowManyDice .toggle')
	.html( howManyDice() );
  });
	obj.setAttribute('src','sound_diceroll.wav');
	 $.get(); 

});

function rollDie() {
	rollThisMany();
	$('.die').each(function() {
		$(this).removeAttr('style').addClass('rot').rotate({
            duration: giveMeRandom(0, 550),
            angle: 0,
            animateTo: giveMeRandom(110, 1020)
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

        // console.log("( "+x1+" - "+x2+" ) * ( "+y1+" - "+y2+" ) = " + intersection);
    }

    // console.log("overlap = " + overlap + " on " + filled_areas.length + " filled areas ");
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

        console.log("and the winner is : " + smallest_overlap);
    });
    return false;
}


/*
This file contians the javascript class and functions that handle the interaction with the horse blocks of the user interface.

Get element by class article:
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByClassName

Creating elements:
http://www.dustindiaz.com/add-and-remove-html-elements-dynamically-with-javascript/

Style syntax:
http://www.webmasterworld.com/javascript/3562960.htm

Notes on bettinginterface:

- on hover: bInterface is shown
- on click: bInterface is locked in place (lock turned off when a different block is clicked).
- - When click lock is on, using arrow keys or numbers will increase the bet.
- bInterface locked when a bet has been placed on it, this does not interfere with the click lock.
- - When the bet is set to 0 the betLock is turned off.
- When user clicks on minus the bet is brought down.
- When user clicks the plus sign or the number the bet increases.
- Bet addition animation mimics 2048, slightly lower and eased into place.

*/


/* Set Up Betting Interface
********************************************************************************************************/

	/* UI Variables
	************************************************/
	var hMoney = [],
		hChance = [],
		totalbets = 0,
		hCount = 8,
		largeBetValue = 10,
		smallBetValue = 1;


	/* UI Functions
	************************************************/
	var distributeStats = function() {

		for(var hi = 0; hi < hCount; hi++){

			// hChance[hi] = Math.floor(hMoney[hi] / totalbets * 100);
			// console.log('#hChance' + (hi) + "=  " + hChance[hi] );
			/*
			Updating horse chance label on bet button click was nixed.
			Instead, update after betting round.
			$('#hChance' + (hi)).html(hChance[hi]);
			*/
		}

	};

	function addBet(index, betVal){

		hMoney[index] += betVal;
		totalbets += betVal;


		$('#hMoneyIncr' + (index)).html(hMoney[index]);
		
		// Animate adding money
		/*
		var h = $('#hMoneyIncr' + (index)).offset().top;
		$('#hMoneyIncr' + (index)).css({top: (h - 10)}, function(){
			$('#hMoneyIncr' + (index)).animate({ top: h}, 25);
		});*/

		distributeStats();
	}

	function minusBet(index, betVal){

		if((hMoney[index] - betVal) < 0 ){
			console.log(hMoney[index] +" " + index);
			return;
		}

		hMoney[index] -= betVal;
		totalbets -= betVal;

		$('#hMoneyIncr' + (index)).html(hMoney[index]);

		distributeStats();
	}
	function clearBet(index){
		totalbets -= hMoney[index];
		hMoney[index] = 0;

		$('#hMoneyIncr' + (index)).html(hMoney[index]);

		distributeStats();
	}

	/* Event Handler Create Methods
	************************************************/
	function addPlusButtonHandler(button, i, betVal){
		button.click(function(){
			addBet(i, betVal);
		});
	}
	function addMinusButtonHandler(button, i, betVal){
		button.click(function(){
			minusBet(i, betVal);
		});
	}
	function addClearButtonHandler(button, i){
		button.click(function(){
			clearBet(i);
		});
	}
	function addHorseBlockClickHandler(block, i){
		block.click(function(){
			console.log('block ' + i + " clicked");

			var bBlock = $('#betInterface' + i);

			bBlock.css({
				left: Math.floor(block.offset().left),
				bottom: Math.floor($(window).height() - block.offset().top) + 10 + 'px',
				width: Math.floor(block.outerWidth()),
				height: block.outerHeight()
			});
			bBlock.fadeToggle();

			console.log('betI Opacity: ' + bBlock.css('display'));

		});
	}

	/* Init UI Elements
	************************************************/
	$('.largeValue').html(largeBetValue);
	$('.smallValue').html(smallBetValue);

	for(var hi = 0; hi < hCount; hi++){

		hMoney[hi] = 0;
		// hChance[hi] = 12.5;
		hChance[hi] = 0;

		$('#hMoney' + (hi)).html('' + hMoney[hi]);
		$('#hChance' + (hi)).html(hChance[hi]);
		$('#horseIcon' + hi).html(SETTINGS_HORSE_SPRITES[hi]);
		$('#horseIcon' + hi).css('color', SETTINGS_HORSE_HASHCOLOR[hi]);

		var hBlock = $('#horseBlock' + hi);

		addHorseBlockClickHandler(hBlock, hi);
		addPlusButtonHandler($('#plusButtonBig' + (hi)), hi, largeBetValue);
		addMinusButtonHandler($('#minusButtonBig' + (hi)), hi, largeBetValue);
		addPlusButtonHandler($('#plusButtonSmall' + (hi)), hi, smallBetValue);
		addMinusButtonHandler($('#minusButtonSmall' + (hi)), hi, smallBetValue);
		addClearButtonHandler($('#clearButton' + hi), hi);
	}


	/* Clear UI Elements
	************************************************/
    function clearBettingInterface(){
    	sendUserBetsToServer();
    	for(var hi = 0; hi < hCount; hi++){
    		
    		$('#betInterface' + hi).fadeOut();
			$('#hMoneyIncr' + hi).html(0);
    		// sendUserBetsToServer(hi);
    		$('#hChance' + (hi)).html(hChance[hi]);

    		hMoney[hi] = 0;
			// hChance[hi] = 12.5;

    	}
    	totalbets = 0;
    }

	/* Send user data to the server
	************************************************/
    function sendUserBetsToServer(){
    	// console.log(hMoney[index]);
    	// console.log(totalbets);
    	// console.log(hChance[index]);
    	onBetClick(hMoney, totalbets);
    }



	/* How To Play 
	************************************************/
	$('#howToPlayContainer').click(function(){
		$(this).fadeOut();
	});

	$('#howToPlayButton').click(function(){
		$('#howToPlayContainer').fadeIn();
	});
const game = document.getElementById('game');
const character = document.getElementById('character');
const block = document.getElementById('block');
const light = document.getElementById('light');

// action
	// 1. jump w/ click
	function jump() {
		if(character.classList != 'animate') {
			character.classList.add('animate');
			jumpSfx();
		}
		setTimeout(function() {
			character.classList.remove('animate');
		}, 500);
	}

	// 2. jump w/ arrow key
	window.addEventListener('keydown', checkKeyPressArrow, false);
	function checkKeyPressArrow(key) {
		if( key.keyCode == '38' ) {
			jump();
	    }
	}

	// 3. light
	window.addEventListener('keyup', checkKeyPressOn, false);
	function checkKeyPressOn(key) {
		if( key.keyCode == '17' ) {
			light.style.opacity = '.5';
			setTimeout(function() {
				light.style.opacity = '0';
			}, 1500)
		}
	}


// mute
	let muteButton = document.querySelector('.muteButton');
	let mute = 'no';
	muteButton.addEventListener('click', function() {
		if(mute == 'no') {
			mute = 'yes';
			muteButton.style.textDecorationLine = 'line-through';
		} else if(mute == 'yes') {
			mute = 'no';
			muteButton.style.textDecorationLine = 'none';
		}
	})


// score system
	let score = document.getElementById("score");
	let scoreNumb = 0;
	let highscore = document.querySelector('.highscore span');
	let scoreSystem = setInterval(function() {
			score.innerHTML = scoreNumb++;
		},100)


// check dead
	let checkDead = setInterval(function() {
		let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
		let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
		if( blockLeft < 40 && blockLeft > -20 && characterTop >= 90 ) {
			block.classList.remove('start');
			block.style.left = `${blockLeft}px`;
			deadSfx();
			let tryAgain = confirm("GAME OVER!\n   Try again?");
			if( tryAgain == true ) {
				block.classList.add('start');
				block.style.left = '450px';
				if( parseInt(highscore.innerHTML) <= scoreNumb ) {
					highscore.innerHTML = `${scoreNumb-1}`;
				}
				scoreNumb = 0;
			}
		}
	},10)
	

// ubah background di waktu tertentu
	let time1 = Math.floor(Math.random() *10000) +8000;
	let time2 = Math.floor(Math.random() *20000) +8000;

	// 1. background #game dan #character
	setInterval(function() {
		game.style.backgroundColor = 'black';
		score.style.color = 'white';
		highscore.style.color = 'white';
		highscore.parentElement.style.color = 'white';
	}, time1);
	setInterval(function() {
		game.style.backgroundColor = 'white';
		score.style.color = 'black';
		highscore.style.color = 'black';
		highscore.parentElement.style.color = 'black';
	}, time2);


// choose character
	const charSuit = document.querySelectorAll('.char-suit');
	for( let i = 0; i < charSuit.length; i++ ) {
		charSuit[i].addEventListener('click', function() {
			character.style.background = `url(img/chars/char${i + 1}.png) no-repeat top`;
		})
	}


// pause
	// space
	window.addEventListener('keydown', checkKeyPressPause, false);
	function checkKeyPressPause(key) {
		if( key.keyCode == '32' ) {
			block.classList.toggle('start');
			scoreNumb = 0;
	    }
	}

	// button
	let startButton = document.querySelector('.startButton');
	startButton.addEventListener('click', function() {
		if( block.classList.contains('start') ) {
			block.classList.remove('start')
			startButton.innerHTML = 'START';
			scoreNumb = 0;
		} else if( !block.classList.contains('start') ) {
			block.classList.add('start')
			startButton.innerHTML = 'PAUSE';
			scoreNumb = 0;
		}
	})


// sound effects
	// dead sfx
	function deadSfx() {
		if( mute == 'no' ) {
			let death = new Audio("sfx/death.mp3");
			death.play();
		}
	}

	// jump sfx
	function jumpSfx() {
		if( mute == 'no' ) {
			let jump = new Audio("sfx/jump.mp3");
			jump.play();
		}
	}



	



	



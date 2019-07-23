var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');

var isGameStarted = false;
var score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {

	isGameStarted = true;
	setGameTime();
	score = 0;
	$resultHeader.classList.add('hide');
	$timeHeader.classList.remove('hide');

	var interval = setInterval(function () {

		var time = parseFloat($time.textContent);


		if (time <= 0) {
			clearInterval(interval);
			endGame();

		} else
			$time.textContent = (time - 0.1).toFixed(1);

	}, 100);

	$game.style.backgroundColor = '#fff';
	$start.classList.add('hide');


	renderBox();
}

function handleBoxClick(event) {
	if (!isGameStarted) {

		return;
	}

	if (event.target.dataset.box) {
		score++;

		renderBox();
	}


}

function endGame() {

	isGameStarted = false;
	setGameScore();
	$start.classList.remove('hide');
	$game.innerHTML = "";
	$game.style.backgroundColor = '#ccc';
	$timeHeader.classList.add('hide');
	$resultHeader.classList.remove('hide');


}

function setGameScore() {

	$result.textContent = score.toString();
}


function setGameTime() {
	var time = 5;
	$time.textContent = time.toFixed(1);
}

function renderBox() {


	$game.innerHTML = '';

	var box = document.createElement('div');
	var boxSize = getRandom(30, 100);
	var gameSize = $game.getBoundingClientRect();
	var maxTop = gameSize.height - boxSize;
	var maxLeft = gameSize.width - boxSize;
	var colorBox = 'rgb(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ')';

	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.backgroundColor = colorBox;
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');


	$game.insertAdjacentElement('afterbegin', box);

	return boxSize;

}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
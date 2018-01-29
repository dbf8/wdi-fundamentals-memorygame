var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];
var score = 0;
var result = document.getElementById("match-or-not");	
var clickedCards = document.getElementsByClassName("clicked"); 

var flipBack = function (){
	for (var i = 0; i < clickedCards.length; i+=1){
		clickedCards[i].setAttribute("src","images/back.png");
	}
};

// slower flip
var delayedFlipBack = function(){
	var timeoutID = window.setTimeout(flipBack, 800);
}

//function checks for matc
var checkForMatch = function(){
	if (cardsInPlay[0] === cardsInPlay[1]){
		result.textContent = "You found a match!";
		score += 1;
		document.getElementById("score").textContent = score;
	} else {
		result.textContent = "Sorry, try again.";
		delayedFlipBack(); // this can be fixed- if you click on a non-match after having matched cards already on the board they all flip back
	}
	cardsInPlay = [];
};

//whenever we click on a card to flip it over, displays card and holds result
var flipCard = function() {
	var cardId = this.getAttribute("data-id");
	var card = cards[cardId];
	this.setAttribute("src", card.cardImage);
	this.setAttribute("class", "clicked");
	console.log(this);
	cardsInPlay.push(card.rank);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
};

var createBoard = function(){
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i)
		cardElement.addEventListener("click", flipCard);
		var board = document.getElementById("game-board");
		board.appendChild(cardElement);
	}
};

var resetGame = function(){
	score = 0;
	document.getElementById("score").textContent = score;
	result.textContent = "Ready for a new game??";
	flipBack();
};


createBoard();
document.querySelector("button").addEventListener("click", resetGame);
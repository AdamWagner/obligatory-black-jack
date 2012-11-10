var Card = function(rank, suit) {
  this.rank = rank;
  this.value = this.values[this.rank];
  this.suit = suit;
  this.symbol = this.symbols[this.suit];
  this.faceUp = false;
};

Card.prototype.symbols = {
  "H" : "❤",
  "S" : "♠",
  "D" : "♦",
  "C" : "♣"
};

Card.prototype.values = {
  "2"  : 2,
  "3"  : 3,
  "4"  : 4,
  "5"  : 5,
  "6"  : 6,
  "7"  : 7,
  "8"  : 8,
  "9"  : 9,
  "10" : 10,
  "J"  : 10,
  "Q"  : 10,
  "K"  : 10,
  "A"  : 11
};

Card.prototype.toString = function() {
  return this.rank + " of " + this.suit;
};

var deck = [];
var playerHand = [];
var dealerHand = [];


var createDeck = function(n) {
    
    // card ingredients
    var suits = ["C", "S", "D", "H"];
    var rank = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

    var i, j, k;
    var rankLength = rank.length;


    // Create n decks
    for (i = 0; i < n; i++) {
        for (j = 0; j < suits.length; j++) {
            for (k = 0; k < rankLength; k++) {
                deck[deck.length] = new Card(rank[k], suits[j]);
            }
        }
    }
};



var shuffle = function() {
    var rand,savedCard;
    for(i=0; i<deck.length; i++) {
        rand = Math.floor(Math.random()* deck.length);
        savedCard = deck[i];
        deck[i] = deck[rand];
        deck[rand] = savedCard;
    }
};

var deal = function() {

  function turnOver() {
    var topCard = deck.pop();
    topCard['faceUp'] = true;
    return topCard;
  }
  
  if (deck.length > 0) {
    playerHand.push(turnOver());
  } else {
    $('.log').append('No more cards in deck!' + '<br/>');
  }
};



var render = function(array, domTarget) {
  var html = '';
  if (array.length === 0) {
    $(domTarget).html('');
  } else {
    for (i = 0; i < array.length; i++) {
      html += "<div data-faceUp=\"" + array[i].faceUp + "; \" style=\"left:" + i/3 + "px;top:" + i/3 + "px;\" class=\"" + array[i].suit +  " card \"> " + array[i].rank + ' '  + array[i].symbol + "</div>";
      $(domTarget).html(html);
    }
  }
};


function getScore(array) {
  var score = 0,
      scoreBefore = "<p>",
      scoreAfter = "</p>";
  for(i=0; i < array.length; i++ ) {
    score += parseInt(array[i].value, 10);
  }
  $('.score').append(scoreBefore + score + scoreAfter);


}

var dealGame = function(){

};

$(document).ready(function(){
  $('#make-deck').on('click',function(){
    createDeck(1);
    render(deck, '.deck');
  });

  $('#shuffle-deck').on('click',function(){
    shuffle();
    render(deck, '.deck');
  });

  $('#deal-card').on('click',function(){
    deal();
    getScore(playerHand);

    render(deck, '.deck');
    render(playerHand, '.player-hand');
  });

});







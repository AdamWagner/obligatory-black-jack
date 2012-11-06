var Card = function(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.symbol = this.symbols[this.suit];
};

Card.prototype.symbols = {
  "H" : "❤",
  "S" : "♠",
  "D" : "♦",
  "C" : "♣"
};

Card.prototype.toString = function() {
  return this.rank + " of " + this.suit;
}

var deck = [];
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
                deck[(j * rankLength) + k] = new Card(rank[k], suits[j]);
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
    deck.shift();
};

var renderDeck = function() {
    for (i = 0; i < deck.length; i++) {
    $('body').append("<div class=\"" + deck[i].suit +  " card \"> " + deck[i].rank + ' '  + deck[i].symbol + "</div>");
    }
};

createDeck(1);
shuffle();
// deal();
renderDeck();





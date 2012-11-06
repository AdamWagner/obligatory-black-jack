var Card = function(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.symbol = this.symbols[this.suit];
  this.turned = false;
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

var hand = [];


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
  if (deck.length > 0) {
    hand.push(deck.shift());
  } else {
    $('.log').append('No more cards in deck!' + '<br/>');
  }
};


var render = function(DOMtarget) {
    if (DOMtarget == '.deck' && deck.length > 0) {
        var deckHtml = '';
        for (i = 0; i < deck.length; i++) {
          deckHtml += "<div class=\"" + deck[i].suit +  " card \"> " + deck[i].rank + ' '  + deck[i].symbol + "</div>";
          $(DOMtarget).html(deckHtml);
        }
    } else if (DOMtarget == '.hand'  && hand.length > 0) {
        var handHtml = '';
        for (i = 0; i < hand.length; i++) {
          handHtml += "<div class=\"" + hand[i].suit +  " card \"> " + hand[i].rank + ' '  + hand[i].symbol + "</div>";
        $(DOMtarget).html(handHtml);
        }
    } else {
      $(DOMtarget).html('');
  }
};


$(document).ready(function(){
  $('#make-deck').on('click',function(){
    createDeck(1);
    render('.deck');
  });

  $('#deal-card').on('click',function(){
    deal();
    render('.hand');
    render('.deck');
  });

});







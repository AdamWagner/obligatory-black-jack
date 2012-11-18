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

var Player = function(hand , selector, dealer) {
  this.hand = hand; // array
  this.selector = selector; // i.e. '.player1' for use in jQuery selectors.
  this.cssClass = selector.substr(1); // i.e. 'player1' for use in printing to DOM.
  this.dealer = dealer; // boolean
};

var players = [];
var createPlayers = function(n) {
  players[0] = new Player( [] , '.dealer' , true); // always create a dealer.
  var i;
  for (i=1; i<n+1; i++) {
    players[i] = new Player( [] , '.player' + (i) , false); // create n players enumerating selector property.
  }
};

var deck = [];
var createDeck = function(n) {
    
    // card ingredients
    var suits = ["C", "S", "D", "H"],
        rank = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

    var i, j, k,
        rankLength = rank.length;

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


// Common DOM elements
var before = "<div ",
    after = "</div>";

// Add html for each player.  If not dealer, show controls.
function prepareDom(){
  var container = '',
      controls = '',
      html = '';
  for (i=0; i < players.length; i++) {
    if (players[i].dealer === false) { controls = "<a href=\"#\" class=\"stand\">Stand</a><a href=\"#\" class=\"hit\">Hit</a>"; }
    container = before + "class=\"cards\">" + after;
    html += before + " class=\"" + players[i].cssClass + " hand\">" + container + controls + after;
  }
    $('.playing-surface').append(html);
}

function flipCard(player, topCard){ // Set faceUp property, which gets printed as data-attribute.
  if(player.dealer === false || player.hand.length>0) { topCard.faceUp = true; }
  return topCard;
}

function deal(n, target) {
  var index, topCard;
  if (deck.length > 0) { // if there are cards in the deck ...
    if (arguments.length === 1) { // if target unspecified, deal to all players
      for (k=0;k<n;k++) {
        for (i=0;i<players.length;i++) {
          topCard = deck.pop();
          index = players[i].hand;
          flipCard(players[i], topCard);
          index[index.length] = topCard;
        }
      }
    } else { // otherwise, deal to specified player
        for (k=0;k<n;k++) {
          topCard = deck.pop();
          flipCard(target, topCard);
          target.hand[target.hand.length] = topCard;
      }
    }
    render();
  }
}

function render() { // For each player, save cards in hand to cardEls, then print.
  for (i=0; i<players.length; i++) {
    cardEls = '';
    for (j=0; j<players[i].hand.length; j++) {
      var currentCard = players[i].hand[j],
      dataAttr = " data-faceUp=\"" + currentCard.faceUp + "\";", // prop set by flipCard();
      cssClass = " class=\"" + currentCard.suit +  " card \"> ",
      htmlRank = currentCard.rank,
      htmlSymbol = currentCard.symbol;
      cardEls += before + dataAttr + cssClass + htmlRank + htmlSymbol + after;
    }
    $(players[i].selector + " .cards").html(cardEls);
  }
}

function matchPlayer(that) { // 'that' is clicked DOM object.
    var cssClass = that.parent().attr('class').split(' ')[0]; // grab class of parent player container.
    var i , target = null;
    for (i=0; i < players.length; i++) { // find player object with matching cssClass property.
      if(players[i].cssClass == cssClass) {
        target = players[i];
      }
    }
    return target;
}

// function getScore(array) {
//   var score = 0,
//       scoreBefore = "<p>",
//       scoreAfter = "</p>";
//   for(i=0; i < array.length; i++ ) {
//     score += parseInt(array[i].value, 10);
//   }
//   $('.score').append(scoreBefore + score + scoreAfter);
// }


function resetGame() {
  $('.playing-surface').html('');
  players = [];
}


$(document).ready(function(){
  $('#new-game').on('click',function(){
    resetGame();
    createPlayers( parseInt($('.control-bar select').val(), 10) ); // grab number of players from select box.
    prepareDom();
    createDeck(1);
    shuffle();
    deal(2);
  });

  $('.hit').live('click',function(){
    var that = $(this);
    deal(1 , matchPlayer(that)); // run matchPlayer, pass returned target player to deal().
  });
});

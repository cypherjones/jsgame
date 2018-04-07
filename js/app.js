// Enemies our player must avoid
var Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.s = s;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.s * dt;

    // check for a collision and send back to the start
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };

    // try to vary the speed of the enembies when an enemy comes off
    // the screen and comes back on
    if (this.x > 506) {
        this.x = -50;
        this.s = 100 + Math.floor(Math.random() * 222);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

// update method
Player.prototype.update = function(dt) {
}
// render mehtod (thanks for the example)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// move the cool little guy around
Player.prototype.handleInput = function(keypress) {

    // if the player moves right and don't go off the canvas
    if (keypress == 'right' && this.x < 405) {
        this.x += 102;
    };
    // if the player moves up and don't go off the canvas
    if (keypress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    // if the player moves left and keep them on the canvas
    if (keypress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    // if the payer moves down and keep them on the canvas
    if (keypress == 'down' && this.y < 405) {
        this.y += 83;
    }
    // if our little guys makes it to the top send 'em back to the start
    if (this.y < 0) {
        this.y = 202;
        this.x = 405;
    }


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// our enemies
var allEnemies = [];

// where we want to put our enemies
var placeEnemies = [63, 147, 230];

// a little function to loop over our enemies
// an place them in the enemy array
placeEnemies.forEach(function(loc) {
    enemy = new Enemy(0, loc, 200);
    allEnemies.push(enemy);
})

// make a new player and start them in the center
var player = new Player(202,405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//sets-up the canvas, also has clear method
function Renderer(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = 563;
    this.canvas.width = 1000;

    this.playerDead = function () {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "bold 30px 'Press Start 2P'";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("You are dead :(", 250, 200);
        this.ctx.fillText("Press 'r' to restart", 200, 300);
    }

    this.playerWon = function () {
        this.ctx.font = "bold 30px 'Press Start 2P'";
        this.ctx.fillStyle = "blue";
        this.ctx.fillText("YOU WON!!!", 350, 200);
        this.ctx.fillText("Press 'r' to restart", 200, 300);
    }

    this.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//explosion constructor
function Explosion(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 10;
    this.image = new Image();
    this.image.src = "img/explosion.png";
    this.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

//big explosion constructor
function BigExplosion(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 10;
    this.image = new Image();
    this.image.src = "img/explosion_big.png";
    this.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

//Boss constructor
function Boss(type, x, enemyHealth, powerup) {
    this.x = x;
    this.y = 50;
    this.vx = 1;
    this.type = type;
    this.enemyHealth = enemyHealth;
    this.healthPowerup = powerup;

    this.update = function () {
        this.x -= this.vx;
    }

    this.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

//Beaters constructor
function Beaters() {
    Boss.call(this, "beaters", 1100, 45, 20);
    this.y = 20;
    this.width = 500;
    this.height = 585;
    this.score_value = 2000;
    this.image = new Image();
    this.image.src = "img/beaters.png";
}

//Lasagna constructor
function Lasagna() {
    Boss.call(this, "lasagna", 1100, 35, 15);
    this.width = 700;
    this.height = 379;
    this.score_value = 1000;
    this.image = new Image();
    this.image.src = "img/lasagna700.png";
}

//Skillet constructor
function Skillet() {
    Boss.call(this, "skillet", 1100, 25, 10);
    this.width = 480;
    this.height = 380;
    this.score_value = 500;
    this.image = new Image();
    this.image.src = "img/skillet480.png";
}


//Dish constructor
function Dish(type, x, enemyHealth) {
    this.x = x;
    this.y = Math.floor((Math.random() * 460) + 1);
    this.vx = Math.floor((Math.random() * 6) + 2);
    this.type = type;
    this.enemyHealth = enemyHealth;
    this.healthPowerup = 0;
    this.hit = false;
    this.hit_timer = 0;

    this.update = function () {
        this.x -= this.vx;
    }

    this.draw = function (ctx) {
        if (this.hit == true && this.hit_timer >= 0) {
            ctx.shadowBlur = 50;
            ctx.shadowColor = "red";
            ctx.drawImage(this.image, this.x, this.y);
            this.hit_timer--;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "black";
        } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "black";
            ctx.drawImage(this.image, this.x, this.y);
        }
    }
}

//Pan constructor
function Pan() {
    Dish.call(this, "pan", 1100, 4);
    this.height = 115;
    this.width = 200;
    this.score_value = 50;
    this.healthPowerup = 1;
    this.image = new Image();
    this.image.src = "img/pan200.png";
}

//Bowl constructor
function Bowl() {
    Dish.call(this, "bowl", 1100, 2);
    this.height = 100;
    this.width = 100;
    this.score_value = 25;
    this.image = new Image();
    this.image.src = "img/bowl100.png";
}

//Plate constructor
function Plate() {
    Dish.call(this, "plate", 1100, 2);
    this.height = 98;
    this.width = 100;
    this.score_value = 25;
    this.image = new Image();
    this.image.src = "img/plate100.png";
}

//Sponge constructor
function Sponge(options) {
    this.x = options.x;
    this.y = options.y;
    this.vx = 10;
    this.maxX = options.maxX;
    this.width = 49;
    this.height = 77;
    this.image = new Image();
    this.image.src = "img/sponge.png";

    this.update = function () {
        this.x += this.vx;
    }

    this.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

//dishwand constructor
function DishWand(options) {
    this.x = options.x || 10;
    this.y = options.y || 200;
    this.maxX = options.maxX || 100;
    this.maxY = options.maxY || 100;
    this.width = options.width || 150;
    this.height = options.height || 150;
    this.upSpeed = options.upSpeed || 8;
    this.downSpeed = options.downSpeed || 8;
    this.keys = options.keys;
    this.image = new Image();
    this.image.src = "img/wand_alpha_100.png";

    this.update = function () {

        //Contain the dish wand
        if ((this.y + this.height) > this.maxY) {
            //if going off the bottom
            this.downSpeed = 0;
        } else if (this.y - this.upSpeed < 0) {
            //if going off the top
            this.upSpeed = 0;
        } else {
            this.upSpeed = 8;
            this.downSpeed = 8;
        }

        //Handle key presses
        if (this.keys[38] !== undefined) {
            //up arrow
            this.y -= this.upSpeed;
        }
        if (this.keys[40] !== undefined) {
            //down arrow
            this.y += this.downSpeed;
        }
    }

    //Draw Dish Wand
    this.draw = function (ctx) {
        this.draw = function (ctx) {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }
}

function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.renderer = new Renderer(this.canvas);
    this.keys = {};
    this.dishes = {};
    this.sponges = {};
    this.explosions = [];
    this.counter = 0;
    this.sponge_counter = 0;
    this.explosions_counter = 0;
    this.score = 0;
    this.health = 100;
    this.bossOne;
    this.bossTwo;
    this.bossThree;
    this.gameWon;


    //Make New Dishwand
    this.dishwand = new DishWand({
        keys: this.keys,
        maxX: this.canvas.width,
        maxY: this.canvas.height + 80
    });

    //UPDATE & DRAW LOOP
    this.onNewFrame = function () {

        //check if sponge hits a dish
        for (var d in this.dishes) {
            var current_dish = this.dishes[d];
            for (var s in this.sponges) {
                var this_sponge = this.sponges[s];
                var center_spongeX = this_sponge.x + 25;
                var center_spongeY = this_sponge.y + 38;
                if (
                    center_spongeX >= current_dish.x && center_spongeX <= current_dish.x + current_dish.width && center_spongeY >= current_dish.y && center_spongeY <= current_dish.y + current_dish.height
                ) {
                    //outline image in red
                    if (this.dishes[d]) {
                        this.dishes[d].hit = true;
                        this.dishes[d].hit_timer = 12;
                    }

                    //reduce enemy health
                    this.dishes[d].enemyHealth--;

                    //check if dish is dead
                    if (this.dishes[d].enemyHealth <= 0) {

                        //increment player health and score
                        this.health += this.dishes[d].healthPowerup;
                        this.score += this.dishes[d].score_value;

                        //make an explosion
                        this.explosions_counter++;

                        //if player killed a boss
                        if (this.dishes[d].type == "skillet") {
                            this.bossOne = "dead";
                            this.explosions[this.explosions_counter] = new BigExplosion(this.dishes[d].x + 50, this.dishes[d].y + 50);
                        } else if (this.dishes[d].type == "lasagna") {
                            this.bossTwo = "dead";
                            this.explosions[this.explosions_counter] = new BigExplosion(this.dishes[d].x + 50, this.dishes[d].y + 50);
                        } else if (this.dishes[d].type == "beaters") {
                            this.bossThree = "dead";
                            this.explosions[this.explosions_counter] = new BigExplosion(this.dishes[d].x + 50, this.dishes[d].y + 50);
                        } else {
                            //if not a boss
                            this.explosions[this.explosions_counter] = new Explosion(this.dishes[d].x, this.dishes[d].y);
                        }

                        //remove this dish from the array
                        delete this.dishes[d];
                    }
                    delete this.sponges[s];
                } else {
                    //check if dish still exists and change hit status to zero
                    if (this.dishes[d]) {
                        this.dishes[d].hit = false;
                        this.dishes[d].hit_timer = 0;
                    }
                }
            }
        }

        //UPDATE STUFF
        this.counter++;
        var dishID = Math.floor(Math.random() * 10000000);
        if (this.counter % 140 == 0) {
            var dishPickArray = [];
            if (this.bossOne == "dead" && this.bossTwo != "dead") {
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
            } else if (this.bossTwo == "dead") {
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
            } else {
                dishPickArray.push(Math.floor(Math.random() * 3) + 1);
            }


            for (var j in dishPickArray) {
                switch (dishPickArray[j]) {
                case 1:
                    this.dishes[dishID + j] = new Plate();
                    break;
                case 2:
                    this.dishes[dishID + j] = new Bowl();
                    break;
                case 3:
                    this.dishes[dishID + j] = new Pan();
                    break;
                }
            }
        }

        //        if (this.counter == 250) {
        //            this.bossThree = 'dead';
        //        }

        if (this.counter == 2701) {
            this.dishes[this.counter] = new Skillet();
        }

        if (this.counter == 5401) {
            this.dishes[this.counter] = new Lasagna();
        }

        if (this.counter == 8101) {
            this.dishes[this.counter] = new Beaters();
        }

        //fire sponges
        this.fire_sponge = function () {
            this.sponge_counter++;
            var spongeX = this.dishwand.x + 100;
            var spongeY = this.dishwand.y + 10;

            this.sponges[this.sponge_counter] = new Sponge({
                x: spongeX,
                y: spongeY,
                maxX: this.canvas.width
            });
        }

        //update dishwand
        this.dishwand.update();

        //update dishes
        for (var d in this.dishes) {
            //If the dish goes off the left
            if ((this.dishes[d].x + this.dishes[d].width) < -10) {
                delete this.dishes[d];
                if (this.gameWon != true) {
                    this.health -= 10;
                }
            } else {
                this.dishes[d].update();
            }
        }

        //update sponges
        for (var s in this.sponges) {
            //If sponge goes off the right
            if (this.sponges[s].x > this.sponges[s].maxX) {
                delete this.sponges[s];
            } else {
                this.sponges[s].update();
            }
        }

        //update explosions
        for (var e in this.explosions) {
            this.explosions[e].timer--;
            if (this.explosions[e].timer == 0) {
                delete this.explosions[e];
            }
        }

        //DRAW STUFF
        this.renderer.clear();

        this.dishwand.draw(this.renderer.ctx);

        for (var d in this.dishes) {
            this.dishes[d].draw(this.renderer.ctx);
        }

        for (var s in this.sponges) {
            this.sponges[s].draw(this.renderer.ctx);
        }

        for (var e in this.explosions) {
            this.explosions[e].draw(this.renderer.ctx);
        }

        //update score
        this.renderer.ctx.font = "bold 22px 'Press Start 2P'";
        this.renderer.ctx.fillStyle = "orange";
        this.renderer.ctx.fillText("Score: " + this.score, 10, 70);

        //update health
        this.renderer.ctx.font = "bold 22px 'Press Start 2P'";
        this.renderer.ctx.fillStyle = "orange";
        this.renderer.ctx.fillText("Health: " + this.health, 10, 30);

        //get ready countdown
        if (this.counter <= 30) {
            this.renderer.ctx.font = "bold 42px 'Press Start 2P'";
            this.renderer.ctx.fillStyle = "red";
            this.renderer.ctx.fillText("3", 470, 275);
        } else if (this.counter > 30 && this.counter <= 60) {
            this.renderer.ctx.font = "bold 42px 'Press Start 2P'";
            this.renderer.ctx.fillStyle = "red";
            this.renderer.ctx.fillText("2", 470, 275);
        } else if (this.counter > 60 && this.counter <= 90) {
            this.renderer.ctx.font = "bold 42px 'Press Start 2P'";
            this.renderer.ctx.fillStyle = "red";
            this.renderer.ctx.fillText("1", 470, 275);
        }

        //check if player died
        if (this.health <= 0) {
            this.renderer.playerDead();
            clearInterval(gameInterval);
            gameOver();
        }

        //check if player won
        if (this.bossThree == 'dead') {
            this.gameWon = true;
            this.renderer.playerWon();
            gameWon();
        }
    }

    window.onkeydown = function (evt) {
        this.keys[evt.keyCode] = true;
    }.bind(this);

    window.onkeyup = function (evt) {
        //shift key

        if (this.keys[16] == true) {
            this.fire_sponge();
        }

        delete this.keys[evt.keyCode];
    }.bind(this);

}

//Start and manage game
window.onload = preGame();

//main game loop
var gameInterval;

function runGame() {
    var game = new Game("gameCanvas");
    gameInterval = setInterval(game.onNewFrame.bind(game), 1000 / 60);
}

function gameOver() {
    window.onkeydown = function (evt) {
        if (evt.keyCode == 82) {
            runGame();
            return;
        } else {
            gameOver();
        }
    }
}

function gameWon() {
    window.onkeydown = function (evt) {
        if (evt.keyCode == 82) {
            clearInterval(gameInterval);
            runGame();
        } else {
            gameWon();
        }
    }
}

function preGame() {
    window.onkeydown = function (evt) {
        if (evt.keyCode == 83) {
            document.getElementById("startScreen").style.display = "none";
            document.getElementById("gameCanvas").style.display = "block";
            runGame();
        } else {
            preGame();
        }
    }
}
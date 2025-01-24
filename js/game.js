class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );

    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps

    this.scoreIntervalId = null;
    this.baseObstacleSpeed = 3;
    this.obstacleSpeedIncrement = 1;
  }

  startScoreInterval() {
    this.scoreIntervalId = setInterval(() => {
      this.score++;
      this.updateScore();
    

    if (this.score % 10 === 0) {
      this.baseObstacleSpeed += this.obstacleSpeedIncrement;
    } 
    }, 5000); //5 seg aqui
  }
  updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = this.score;
  }
  updateLives() {
    const livesElement = document.getElementById("lives");
    livesElement.textContent = this.lives;
  }


  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.startScoreInterval();
  }

  gameLoop() {
    console.log("in the game loop");

    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    console.log("in the update");
     this.player.move();

    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.lives--;
        this.updateLives();
        return false;
      } 
      
       if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.score++;
        this.updateScore();
        return false;
      }

      return true;
    });

    if (this.lives === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
      
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());
   this.gameIsOver = true;

   this.gameScreen.style.display = "none";
   this.gameEndScreen.style.display = "block";

   clearInterval(this.scoreIntervalId);

  }
}

class Obstacle extends Component {
  constructor(gameScreen, speed) {
    const left = Math.floor(Math.random() * 300 + 70); 
    const top = 0; 
    const width = 100; 
    const height = 150; 
    const imgSrc = "./images/redCar.png"; 

    super(gameScreen, left, top, width, height, imgSrc); 

    this.speed = 3; 
  }

  move() {
    this.top += this.speed;
    this.updatePosition();
  }
}

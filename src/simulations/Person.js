import DiseaseState from './DiseaseState';

class Person {
  static get defaultRadius() {
    return 5;
  }

  static get speed() {
    return 1;
  }

  constructor({
    x,
    y,
    horizontalSpeed,
    verticalSpeed,
    radius,
    state,
    staysHome = false,
    p5,
  }) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.staysHome = staysHome;
    this.p5 = p5;

    this.horizontalSpeed = horizontalSpeed !== undefined
      ? horizontalSpeed : p5.random(-1, 1) * Person.speed;
    this.verticalSpeed = verticalSpeed !== undefined
      ? verticalSpeed : p5.random(-1, 1) * Person.speed;
    this.radius = radius !== undefined ? radius : Person.defaultRadius;

    this.infectedTime = 0;
    this.willSurvive = true;
  }

  render() {
    this.p5.fill(this.state.color);
    this.p5.noStroke();
    this.p5.ellipse(this.x, this.y, this.radius);
  }

  canMove() {
    return !this.staysHome && this.state !== DiseaseState.FATAL;
  }

  move() {
    if (!this.canMove()) return;

    if ((this.x - this.radius < 0 && this.horizontalSpeed < 0)
      || (this.x + this.radius > this.p5.width && this.horizontalSpeed > 0)) {
      this.horizontalSpeed *= -1;
    }

    if ((this.y - this.radius < 0 && this.verticalSpeed < 0)
      || (this.y + this.radius > this.p5.height && this.verticalSpeed > 0)) {
      this.verticalSpeed *= -1;
    }

    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
  }

  infect(willSurvive = true) {
    if (this.state === DiseaseState.INFECTED) return false;

    this.state = DiseaseState.INFECTED;
    this.willSurvive = willSurvive;

    return true;
  }
}

export default Person;

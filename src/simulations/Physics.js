/* eslint-disable no-param-reassign */
const checkCollision = (currentPerson, otherPerson) => {
  const horizontalDistance = otherPerson.x - currentPerson.x;
  const verticalDistance = otherPerson.y - currentPerson.y;

  return Math.sqrt((horizontalDistance ** 2) + (verticalDistance ** 2))
    <= (currentPerson.radius);
};

const changeDirections = (currentPerson, otherPerson) => {
  const horizontalDistance = otherPerson.x - currentPerson.x;
  const verticalDistance = otherPerson.y - currentPerson.y;

  const impactAngle = Math.atan2(verticalDistance, horizontalDistance);
  const horizontalForce = Math.cos(impactAngle);
  const verticalForce = Math.sin(impactAngle);

  currentPerson.horizontalSpeed -= horizontalForce;
  currentPerson.verticalSpeed -= verticalForce;

  otherPerson.horizontalSpeed = horizontalForce;
  otherPerson.verticalSpeed = verticalForce;
};

export {
  checkCollision,
  changeDirections,
};

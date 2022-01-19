/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import InfectionSketch from './InfectionSketch';
import Person from '../Person';
import DiseaseState from '../DiseaseState';

const StayHomeSketch = (props) => {
  const { stayHomePercentage, ...rest } = props;

  const setupPopulation = (p5, population, size, statistics) => {
    population[0] = new Person({
      x: p5.random(Person.defaultRadius, p5.width - Person.defaultRadius),
      y: p5.random(Person.defaultRadius, p5.height - Person.defaultRadius),
      radius: 10,
      state: DiseaseState.INFECTED,
      p5,
    });

    statistics.infected += 1;

    for (let i = 1; i < size; i += 1) {
      population[i] = new Person({
        x: p5.random(Person.defaultRadius, p5.width - Person.defaultRadius),
        y: p5.random(Person.defaultRadius, p5.height - Person.defaultRadius),
        radius: 10,
        state: DiseaseState.UNAFFECTED,
        staysHome: p5.random(0, 1) <= stayHomePercentage,
        p5,
      });

      statistics.unaffected += 1;
    }
  };

  return <InfectionSketch id="stay-home" setupPopulation={setupPopulation} {...rest} />;
};

StayHomeSketch.propTypes = {
  stayHomePercentage: PropTypes.number,
};

StayHomeSketch.defaultProps = {
  stayHomePercentage: 0.4,
};

export default StayHomeSketch;

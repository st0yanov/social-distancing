/* eslint-disable no-param-reassign */
import InfectionSketch from './InfectionSketch';
import Person from '../Person';
import DiseaseState from '../DiseaseState';

const NoRestrictionsSketch = (props) => {
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
        p5,
      });

      statistics.unaffected += 1;
    }
  };

  return <InfectionSketch id="no-restrictions" setupPopulation={setupPopulation} {...props} />;
};

export default NoRestrictionsSketch;

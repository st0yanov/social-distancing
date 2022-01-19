/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import P5 from 'p5';
import { setupCanvas, toggleAnimation, handleInteractions } from '../SketchHelpers';
import DiseaseState from '../DiseaseState';
import Statistics from '../Statistics';
import Graph from '../Graph';
import Counters from '../Counters';
import Replay from '../Replay';

const InfectionSketch = (props) => {
  const {
    id,
    className,
    canvasWidth,
    canvasHeight,
    populationSize,
    recoveryTime,
    mortalityRate,
    graphWidth,
    graphHeight,
    maxFrameCount,
    backgroundColor,
    setupPopulation,
    CountersComponent,
  } = props;

  const containerRef = useRef();
  const statistics = new Statistics({});
  const [counters, setCounters] = useState(statistics.counters());
  const [timelines, setTimelines] = useState(statistics.timelines());
  const [showReplay, setShowReplay] = useState(false);
  const [handleReplay, setHandleReplay] = useState();
  const [toggleSketch, setToggleSketch] = useState();

  const sketch = (p) => {
    let population = [];

    const updateState = (person) => {
      if (person.state !== DiseaseState.INFECTED) return;

      if (person.infectedTime > recoveryTime / 2 && !person.willSurvive) {
        person.state = DiseaseState.FATAL;
        statistics.fatal += 1;
        statistics.infected -= 1;
        return;
      }

      if (person.infectedTime >= recoveryTime) {
        person.state = DiseaseState.CURED;
        statistics.cured += 1;
        statistics.infected -= 1;
        return;
      }

      person.infectedTime += 1;
    };

    const initialize = () => {
      population = [];
      statistics.reset();
      setCounters(statistics.counters());
      setTimelines(statistics.timelines());
      setShowReplay(false);
      setupPopulation(p, population, populationSize, statistics);
      p.frameCount = -1;
      p.loop();
    };

    const toggleSketch = () => toggleAnimation(p, maxFrameCount);

    p.setup = () => {
      setupCanvas(p, canvasWidth, canvasHeight);
      initialize();
      setHandleReplay(() => initialize);
      setToggleSketch(() => toggleSketch);
    };

    p.draw = () => {
      if (p.frameCount === maxFrameCount) {
        p.noLoop();
        setShowReplay(true);
      }

      p.background(backgroundColor);

      population.forEach((person) => {
        updateState(person);
        person.move();
        handleInteractions(p, person, population, statistics, mortalityRate);
        person.render();
      });

      statistics.recordTimelines();

      if (p.frameCount % 2 === 0) {
        setCounters(statistics.counters());
        setTimelines(statistics.timelines());
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && p.frameCount < maxFrameCount) {
        p.loop();
      } else {
        p.noLoop();
      }
    }, {
      threshold: 0.50,
    });

    observer.observe(containerRef.current);
  };

  useEffect(() => {
    // eslint-disable-next-line no-new
    new P5(sketch, containerRef.current);
  }, []);

  return (
    <div id={id} className={`simulation ${className}`} style={{ maxWidth: canvasWidth }} onClick={toggleSketch}>
      <CountersComponent counters={counters} />
      <Graph
        width={graphWidth}
        height={graphHeight}
        timelines={timelines}
        populationSize={populationSize}
      />

      <div ref={containerRef} className={showReplay && 'overlay'} style={{ position: 'relative' }}>
        <Replay show={showReplay} onClick={handleReplay} />
      </div>

      <style jsx global>
        {`
          .overlay canvas {
            opacity: 0.2;
          }

          .simulation canvas {
            width: 100% !important;
            height: auto !important;
          }
        `}
      </style>
    </div>
  );
};

InfectionSketch.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  populationSize: PropTypes.number,
  recoveryTime: PropTypes.number,
  mortalityRate: PropTypes.number,
  graphWidth: PropTypes.number,
  graphHeight: PropTypes.number,
  maxFrameCount: PropTypes.number,
  backgroundColor: PropTypes.string,
  setupPopulation: PropTypes.func.isRequired,
  CountersComponent: PropTypes.func,
};

InfectionSketch.defaultProps = {
  className: '',
  canvasWidth: 640,
  canvasHeight: 480,
  populationSize: 200,
  recoveryTime: 600,
  mortalityRate: 0.04,
  graphWidth: 640,
  graphHeight: 60,
  maxFrameCount: 1600,
  backgroundColor: '#ffffff',
  CountersComponent: Counters,
};

export default InfectionSketch;

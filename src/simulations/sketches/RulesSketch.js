/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import P5 from 'p5';
import { setupCanvas, toggleAnimation, handleInteractions } from '../SketchHelpers';
import Replay from '../Replay';
import DiseaseState from '../DiseaseState';

const RulesSketch = (props) => {
  const {
    id,
    className,
    backgroundColor,
    maxFrameCount,
    recoveryTime,
    mortalityRate,
    setupPopulation,
    replayProps,
  } = props;

  const canvasWidth = 300;
  const canvasHeight = 100;

  const containerRef = useRef();
  const [showReplay, setShowReplay] = useState(false);
  const [handleReplay, setHandleReplay] = useState();
  const [toggleSketch, setToggleSketch] = useState();

  const sketch = (p) => {
    let population = [];

    const updateState = (person) => {
      if (person.state !== DiseaseState.INFECTED) return;

      if (person.infectedTime > recoveryTime / 2 && !person.willSurvive) {
        person.state = DiseaseState.FATAL;
        return;
      }

      person.infectedTime += 1;
    };

    const initialize = () => {
      population = [];
      setupPopulation(p, population);
      setShowReplay(false);
      p.frameCount = -1;
      p.loop();
    };

    const toggleSketch = () => toggleAnimation(p, maxFrameCount);

    p.setup = () => {
      setupCanvas(p, canvasWidth, canvasHeight);
      setupPopulation(p, population);
      setHandleReplay(() => initialize);
      setToggleSketch(() => toggleSketch);
      p.noLoop();
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
        handleInteractions(p, person, population, null, mortalityRate);
        person.render();
      });
    };

    // const observer = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting && p.frameCount < maxFrameCount) {
    //     p.loop();
    //   } else {
    //     p.noLoop();
    //   }
    // }, {
    //   threshold: 0.50,
    // });

    // observer.observe(containerRef.current);
  };

  useEffect(() => {
    // eslint-disable-next-line no-new
    new P5(sketch, containerRef.current);
  }, []);

  return (
    <div id={id} ref={containerRef} className={`simulation ${className} ${showReplay && 'overlay'}`} style={{ maxWidth: canvasWidth, position: 'relative' }} onClick={toggleSketch}>
      <Replay show={showReplay} onClick={handleReplay} {...replayProps} />
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

RulesSketch.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  maxFrameCount: PropTypes.number,
  recoveryTime: PropTypes.number,
  mortalityRate: PropTypes.number,
  setupPopulation: PropTypes.func.isRequired,
  replayProps: PropTypes.object,
};

RulesSketch.defaultProps = {
  className: '',
  backgroundColor: '#ffffff',
  maxFrameCount: 500,
  recoveryTime: 450,
  mortalityRate: 0,
  replayProps: {},
};

export default RulesSketch;

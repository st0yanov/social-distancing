import PropTypes from 'prop-types';
import DiseaseState from './DiseaseState';

const Graph = (props) => {
  const {
    width,
    height,
    timelines,
    populationSize,
  } = props;

  const generatePath = (dataset) => {
    const horizontalStep = width / 1600;
    const verticalStep = height / populationSize;

    let pathData = `M 0 ${height}`;

    dataset.forEach((record, i) => {
      const x = horizontalStep * i;
      const y = height - (verticalStep * record);
      pathData = `${pathData} L ${x} ${y}`;
    });

    pathData = `${pathData} V ${height} L 0 ${height}`;

    return pathData;
  };

  const generateInversePath = (dataset) => {
    const horizontalStep = width / 1600;
    const verticalStep = height / populationSize;

    let pathData = 'M 0 0';

    dataset.forEach((record, i) => {
      const x = horizontalStep * i;
      const y = verticalStep * record;
      pathData = `${pathData} L ${x} ${y}`;
    });

    pathData = `${pathData} V 0 L 0 0`;

    return pathData;
  };

  return (
    <svg
      className="graph"
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: width }}
    >
      <g>
        <rect width={width} height={height} className="background" />
        <path d={generatePath(timelines.infectedTimeline)} className="infected" />
        <path d={generateInversePath(timelines.unaffectedTimeline)} className="unaffected" />
        <path d={generateInversePath(timelines.curedTimeline)} className="cured" />
      </g>

      <style jsx>
        {`
          .graph {
            width: 100%;
            height: auto;
          }

          .graph .background {
            fill: #eeeeee;
          }

          .graph .unaffected {
            fill: ${DiseaseState.UNAFFECTED.color};
          }

          .graph .infected {
            fill: ${DiseaseState.INFECTED.color};
          }

          .graph .cured {
            fill: ${DiseaseState.CURED.color};
          }
        `}
      </style>
    </svg>
  );
};

Graph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  timelines: PropTypes.object.isRequired,
  populationSize: PropTypes.number.isRequired,
};

Graph.defaultProps = {
  width: 600,
  height: 60,
};

export default Graph;

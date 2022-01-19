import PropTypes from 'prop-types';

const Counters = (props) => {
  const { counters } = props;
  const {
    unaffected,
    infected,
    cured,
    fatal,
  } = counters;

  return (
    <ul>
      <li>
        Незасегнати - {unaffected}
      </li>
      <li>
        Заразени - {infected}
      </li>
      <li>
        Излекувани - {cured}
      </li>
      <li>
        Жертви - {fatal}
      </li>
    </ul>
  );
};

Counters.propTypes = {
  counters: PropTypes.shape({
    unaffected: PropTypes.number,
    infected: PropTypes.number,
    cured: PropTypes.number,
    fatal: PropTypes.number,
  }).isRequired,
};

export default Counters;

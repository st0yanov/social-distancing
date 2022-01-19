import PropTypes from 'prop-types';

const Replay = ({ show, onClick, replayText }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className={`replay ${show ? 'show' : ''}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className="icon">
        <span role="img" aria-label="replay">🔄</span>
      </div>
      <div>
        {replayText}
      </div>
      <style jsx>
        {`
          .replay {
            display: none;
            position: absolute;
            font-weight: bold;
            text-align: center;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            cursor: pointer;
          }

          .replay.show {
            display: block;
          }

          .replay .icon {
            font-size: 25px;
          }
        `}
      </style>
    </div>
  );
};

Replay.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  replayText: PropTypes.string,
};

Replay.defaultProps = {
  onClick: () => { },
  replayText: 'Стартирай нова симулация',
};

export default Replay;

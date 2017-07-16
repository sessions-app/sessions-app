import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const contributionSource = {
  beginDrag(props) {
    return { position: props.position };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const Contribution = (props) => {
  const { contributionId, connectDragSource, isDragging } = props;

  const contribution = (
    <div className="contribution">
      <p
        className="contribution-content"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {contributionId}
      </p>
    </div>
  );

  return connectDragSource(contribution);
};

Contribution.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  contributionId: PropTypes.string.isRequired,
};

module.exports = DragSource('CONTRIBUTION', contributionSource, collect)(Contribution);

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const contributionSource = {
  beginDrag(props) {
    return { name: props.name };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const Contribution = (props) => {
  const { connectDragSource, isDragging, name } = props;

  return connectDragSource(
    <div className="contribution">
      <p
        className="contribution-content"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {name}
      </p>
    </div>
  );
};

Contribution.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

module.exports = DragSource('CONTRIBUTION', contributionSource, collect)(Contribution);

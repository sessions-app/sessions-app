import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import qs from 'querystring';

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
  const trackQuery = {
    uri: `spotify:track:${contributionId}`,
  };
  const source = `https://open.spotify.com/embed?${qs.encode(trackQuery)}`;
  const contribution = (
    <div className="contribution">
      <iframe
        title="track"
        src={source}
        width="300"
        height="80"
        frameBorder="0"
        allowTransparency="true"
        className="contribution-content"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      />
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

export default DragSource('CONTRIBUTION', contributionSource, collect)(Contribution);

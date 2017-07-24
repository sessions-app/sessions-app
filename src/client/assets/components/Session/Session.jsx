import React from 'react';
import PropTypes from 'prop-types';

import AlertFlash from '../AlertFlash';
import JoinModal from './JoinModal';
import { track } from './shapes';

const Session = props => (
  <div>
    <AlertFlash bsStyle={props.flashType}>{props.flashMsg}</AlertFlash>
    <JoinModal
      contributions={props.contributions}
      modalOpen={props.modalOpen}
      searchValue={props.searchValue}
      selectedTrack={props.selectedTrack}
      suggestions={props.suggestions}
      storeSetState={value => props.storeSetState(value)}
    />
    <p>Eventually there will be a session here.</p>
  </div>
);

Session.propTypes = {
  contributions: PropTypes.arrayOf(PropTypes.string).isRequired,
  flashMsg: PropTypes.node,
  flashType: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  modalOpen: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  selectedTrack: PropTypes.shape(track),
  suggestions: PropTypes.arrayOf(PropTypes.shape(track)).isRequired,
  storeSetState: PropTypes.func.isRequired,
};

Session.defaultProps = {
  flashMsg: null,
  selectedTrack: null,
};

export default Session;

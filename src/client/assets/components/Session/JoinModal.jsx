import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ContributionList from './ContributionList';
import ContributionSearch from './ContributionSearch';
import { track } from './shapes';

const contributeBtnClasses = (selected, length) =>
  classnames('contribute-track-btn', {
    'contribute-track-enabled': (selected && length < 5),
    'contribute-track-disabled': (!selected || length >= 5),
  });

const contributeBtnDisabled = (selected, length) => (!selected || length >= 5);

const contributeTrack = (storeSetState, contributions, selectedTrack) => {
  const currContributions = _.clone(contributions);

  if (currContributions.length < 5) {
    currContributions.push(selectedTrack.id);
  }

  storeSetState({
    contributions: currContributions,
    selectedTrack: null,
    searchValue: '',
  });
};

const renderContributeBtn = (storeSetState, contributions, selectedTrack) => (
  <Button
    className={contributeBtnClasses(selectedTrack, contributions.length)}
    onClick={() => contributeTrack(storeSetState, contributions, selectedTrack)}
    disabled={contributeBtnDisabled(selectedTrack, contributions.length)}
  >
    +
  </Button>
);


const submitBtnClasses = length =>
  classnames('submit-contributions-btn', {
    'submit-contributions-enabled': (length >= 5),
    'submit-contributions-disabled': (length < 5),
  });

const submitBtnDisabled = length => (length < 5);

const submitContributions = (storeSetState) => {
  storeSetState({ modalOpen: false });
  /* TODO wire to contributions endpoint */
};

const renderSubmitBtn = (storeSetState, contributions) => (
  <Button
    className={submitBtnClasses(contributions.length)}
    onClick={() => submitContributions(storeSetState)}
    disabled={submitBtnDisabled(contributions.length)}
  >
    Submit
  </Button>
);


const JoinModal = (props) => {
  const {
    contributions,
    modalOpen,
    searchValue,
    selectedTrack,
    suggestions,
    storeSetState,
  } = props;

  return (
    <Modal
      aria-labelledby="contained-modal-title-lg"
      bsSize="large"
      onHide={() => { window.location.href = '/'; }}
      show={modalOpen}
    >
      <Modal.Header className="join-modal" closeButton>
        <Modal.Title>Join a Session</Modal.Title>
      </Modal.Header>

      <Modal.Body className="join-modal">
        <ContributionList
          contributions={contributions}
          updateOrder={contribs => storeSetState({ contributions: contribs })}
        />
        <span className="contribution-controls">
          <span className="contribution-search">
            <ContributionSearch
              searchValue={searchValue}
              suggestions={suggestions}
              storeSetState={value => storeSetState(value)}
            />
            {renderContributeBtn(storeSetState, contributions, selectedTrack)}
          </span>
          <span className="submit-contributions">
            {renderSubmitBtn(storeSetState, contributions)}
          </span>
        </span>

      </Modal.Body>
    </Modal>
  );
};

JoinModal.propTypes = {
  contributions: PropTypes.arrayOf(PropTypes.string).isRequired,
  modalOpen: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  selectedTrack: PropTypes.shape(track),
  suggestions: PropTypes.arrayOf(PropTypes.shape(track)).isRequired,
  storeSetState: PropTypes.func.isRequired,
};

JoinModal.defaultProps = {
  selectedTrack: null,
};

export default JoinModal;

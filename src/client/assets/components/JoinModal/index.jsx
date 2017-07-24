import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';
import classnames from 'classnames';

import ContributionList from '../ContributionList';

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if (inputLength === 0) return Promise.resolve([]);
  return axios.post('/sessions/search-tracks', {
    query: value,
  }).then(res => res.data);
};

const getSuggestionValue = suggestion => (suggestion);

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name} - {suggestion.artist}
  </div>
);

class JoinModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      contributions: [],
      value: '',
      selectedTrack: null,
      suggestions: [],
    };
  }

  onChange(event, track) {
    if (track.method === 'type') {
      this.setState({
        value: track.newValue,
      });
    } else if (track.method === 'click' || track.method === 'enter') {
      this.setState({
        value: `${track.newValue.name} - ${track.newValue.artist}`,
        selectedTrack: track.newValue,
      });
    }
  }

  onSuggestionsFetchRequested({ value }) {
    getSuggestions(value)
    .then((returnedTracks) => {
      this.setState({
        suggestions: returnedTracks,
      });
    },
    );
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  addTrack() {
    const currContributions = _.clone(this.state.contributions);
    if (currContributions.length < 5) (currContributions.push(this.state.selectedTrack.id));
    this.setState({
      contributions: currContributions,
      selectedTrack: null,
      value: '',
    });
  }

  updateOrder(contributions) {
    this.setState({ contributions });
  }

  render() {
    const { contributions, value, suggestions, selectedTrack } = this.state;
    const submitBtnClasses = classnames('submit-contributions-btn', {
      'submit-contributions-enabled': (contributions.length >= 5),
      'submit-contributions-disabled': (contributions.length < 5),
    });
    const contributeBtnClasses = classnames('contribute-track-btn', {
      'contribute-track-enabled': (selectedTrack || (contributions.length < 5)),
      'contribute-track-disabled': (!selectedTrack || (contributions.length >= 5)),
    });
    const inputProps = {
      placeholder: 'Type a track',
      value,
      onChange: (event, val) => this.onChange(event, val),
    };

    return (
      <Modal
        aria-labelledby="contained-modal-title-lg"
        bsSize="large"
        onHide={() => { window.location.href = '/'; }}
        show={this.state.open}
      >
        <Modal.Header className="join-modal" closeButton>
          <Modal.Title>Join a Session</Modal.Title>
        </Modal.Header>

        <Modal.Body className="join-modal">
          <ContributionList
            contributions={contributions}
            updateOrder={contribs => this.updateOrder(contribs)}
          />
          <span className="contribution-controls">
            <span className="contribution-search">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={val => this.onSuggestionsFetchRequested(val)}
                onSuggestionsClearRequested={() => this.onSuggestionsClearRequested()}
                getSuggestionValue={val => getSuggestionValue(val)}
                renderSuggestion={sugg => renderSuggestion(sugg)}
                inputProps={inputProps}
              />
              <Button
                className={contributeBtnClasses}
                onClick={() => this.addTrack()}
                disabled={!selectedTrack || (contributions.length >= 5)}
              >+</Button>
            </span>
            <span className="submit-contributions">
              <Button
                className={submitBtnClasses}
                onClick={() => this.submitContributions()}
                disabled={contributions.length < 5}
              >Submit</Button>
            </span>
          </span>

        </Modal.Body>
      </Modal>
    );
  }
}

module.exports = JoinModal;

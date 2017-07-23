import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';

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
    } else if (track.method === 'click' || track.method === 'submit') {
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
    currContributions.push(this.state.selectedTrack.name);
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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={val => this.onSuggestionsFetchRequested(val)}
            onSuggestionsClearRequested={() => this.onSuggestionsClearRequested()}
            getSuggestionValue={val => getSuggestionValue(val)}
            renderSuggestion={sugg => renderSuggestion(sugg)}
            inputProps={inputProps}
          />
          <Button
            bsStyle="primary"
            onClick={() => this.addTrack()}
            disabled={!selectedTrack}
          >+</Button>
        </Modal.Body>

        <Modal.Footer className="join-modal">
          <Button
            bsStyle="primary"
            onClick={() => this.submitContributions()}
          >Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = JoinModal;

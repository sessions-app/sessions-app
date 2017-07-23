import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Promise from 'bluebird';

import ContributionList from '../ContributionList';

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if (inputLength === 0) return Promise.resolve([]);
  return axios.post('/sessions/search-tracks', {
    query: value,
  }).then(res => res.data);
};

const getSuggestionValue = suggestion => (suggestion.name);

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
      contributions: [
        'a',
        'b',
      ],
      value: '',
      suggestions: [],
    };
  }

  onChange(event, value) {
    debugger;
    if (value.method === 'type') {
      this.setState({
        value: value.newValue,
      });
    } else if (value.method === 'click') {
      event.preventDefault();
      debugger;
    } else if (value.method === 'enter') {
      debugger;
      event.preventDefault();
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

  updateOrder(contributions) {
    this.setState({ contributions });
  }

  render() {
    const { contributions, value, suggestions } = this.state;
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

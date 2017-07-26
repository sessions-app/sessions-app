import React from 'react';
import ReactDOM from 'react-dom';

import Session from './Session';

class SessionStore extends React.Component {
  constructor() {
    super();

    this.state = {
      contributions: [],
      modalOpen: true,
      searchValue: '',
      selectedTrack: null,
      suggestions: [],
      flashMsg: null,
      flashType: 'info',
    };
  }

  render() {
    return (
      <Session
        /* Attributes */
        contributions={this.state.contributions}
        flashMsg={this.state.flashMsg}
        flashType={this.state.flashType}
        modalOpen={this.state.modalOpen}
        searchValue={this.state.searchValue}
        selectedTrack={this.state.selectedTrack}
        suggestions={this.state.suggestions}
        /* Methods */
        storeSetState={value => this.setState(value)}
      />
    );
  }
}

ReactDOM.render(<SessionStore />, document.getElementById('session-root'));

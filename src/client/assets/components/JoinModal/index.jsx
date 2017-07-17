import React from 'react';
import { Modal } from 'react-bootstrap';

import ContributionList from '../ContributionList';

class JoinModal extends React.Component {
  constructor() {
    super();

    this.state = {
      open: true,
      contributions: [
        'a',
        'b',
      ],
    };
  }

  updateOrder(contributions) {
    this.setState({ contributions });
  }

  render() {
    const { contributions } = this.state;
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
        </Modal.Body>
      </Modal>
    );
  }
}

module.exports = JoinModal;

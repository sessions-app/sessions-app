import React from 'react';
import { Button, Modal } from 'react-bootstrap';

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

  submitContributions() {
    // Handle submitting contributions
    this.setState({ open: false });
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

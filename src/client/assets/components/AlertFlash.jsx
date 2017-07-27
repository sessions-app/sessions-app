import React from 'react';
import { Alert, Fade } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

class AlertFlash extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.visible && !_.isEqual(nextProps, this.props)) {
      this.setState({ visible: true });
    }
  }

  render() {
    return (
      <Fade in={this.state.visible}>
        <Alert
          bsStyle={this.props.bsStyle}
          className="alert-flash"
          onDismiss={() => this.setState({ visible: false })}
        >
          {this.props.children}
        </Alert>
      </Fade>
    );
  }
}

AlertFlash.propTypes = {
  bsStyle: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
  children: PropTypes.node,
};

AlertFlash.defaultProps = {
  bsStyle: 'info',
  children: null,
};

export default AlertFlash;

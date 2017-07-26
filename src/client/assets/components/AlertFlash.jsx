import React from 'react';
import { Alert } from 'react-bootstrap';
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
    if (this.state.visible) {
      return (
        <Alert
          bsStyle={this.props.bsStyle}
          className="alert-flash"
          onDismiss={() => this.setState({ visible: false })}
        >
          {this.props.children}
        </Alert>
      );
    }

    return null;
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

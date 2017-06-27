import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Hello = props => <div> Hello {props.name} </div>;

Hello.propTypes = {
  name: PropTypes.string.isRequired,
};

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('root'),
);

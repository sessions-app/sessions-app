import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Hello = props => <div className='well well-lg'> Hello {props.name} </div>;

Hello.propTypes = {
  name: PropTypes.string.isRequired,
};



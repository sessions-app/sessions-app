import React from 'react';
import ReactDOM from 'react-dom';

import JoinModal from './JoinModal';

const Session = () => (
  <JoinModal />
);

ReactDOM.render(<Session />, document.getElementById('session-root'));

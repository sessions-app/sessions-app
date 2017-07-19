import React from 'react';
import ReactDOM from 'react-dom';

import JoinModal from './JoinModal';

const Session = () => (
  <div>
    <JoinModal />
    <p>Eventually there will be a session here.</p>
  </div>
);

ReactDOM.render(<Session />, document.getElementById('session-root'));

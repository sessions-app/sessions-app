import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import Contribution from './Contribution';

const ContributionSlot = props => (
  <div className="contribution-list-item">
    {props.contribution}
  </div>
);

ContributionSlot.propTypes = {
  contribution: PropTypes.node,
};

ContributionSlot.defaultProps = {
  contribution: null,
};


class ContributionList extends React.Component {
  constructor() {
    super();

    this.state = {
      contributions: [
        <Contribution name="a" />,
        <Contribution name="b" />,
      ],
    };
  }

  render() {
    const slots = _.times(5, i => (
      <ContributionSlot
        contribution={this.state.contributions[i]}
      />
    ));

    return (
      <div className="contribution-list">
        {slots}
      </div>
    );
  }
}

module.exports = DragDropContext(HTML5Backend)(ContributionList);

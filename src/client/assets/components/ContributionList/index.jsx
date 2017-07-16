import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import ContributionSlot from './ContributionSlot';

class ContributionList extends React.Component {
  constructor() {
    super();

    this.state = {
      contributions: [
        'a',
        'b',
      ],
    };
  }

  swap(x) {
    return (y) => {
      const contributions = _.clone(this.state.contributions);

      const temp = contributions[x];
      contributions[x] = contributions[y];
      contributions[y] = temp;

      this.setState({ contributions });
    };
  }

  render() {
    const slots = _.times(5, (i) => {
      const contributionId = this.state.contributions[i];
      const swap = contributionId ? this.swap(i) : null;

      return (
        <ContributionSlot
          contributionId={contributionId}
          key={i}
          position={i}
          swap={swap}
        />
      );
    });

    return (
      <div className="contribution-list">
        {slots}
      </div>
    );
  }
}

module.exports = DragDropContext(HTML5Backend)(ContributionList);

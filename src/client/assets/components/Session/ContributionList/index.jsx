import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import ContributionSlot from './ContributionSlot';

const swap = (updateOrder, contributions, x) => (y) => {
  const newContributionOrder = _.clone(contributions);

  const temp = newContributionOrder[x];
  newContributionOrder[x] = newContributionOrder[y];
  newContributionOrder[y] = temp;

  updateOrder(newContributionOrder);
};

const ContributionList = (props) => {
  const { contributions, updateOrder } = props;
  const slots = _.times(5, (i) => {
    const contributionId = contributions[i];
    const swapWith = contributionId ? swap(updateOrder, contributions, i) : null;

    return (
      <ContributionSlot
        contributionId={contributionId}
        key={i}
        position={i}
        swap={swapWith}
      />
    );
  });

  return (
    <div className="contribution-list">
      {slots}
    </div>
  );
};

ContributionList.propTypes = {
  contributions: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateOrder: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(ContributionList);

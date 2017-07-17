import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classnames from 'classnames';

import Contribution from './Contribution';

const contributionSlotTarget = {
  canDrop(props) {
    return typeof props.contributionId === 'string';
  },

  drop(props, monitor) {
    const { swap } = props;
    const item = monitor.getItem();

    if (swap && item) {
      swap(item.position);
    }
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver(),
});

const ContributionSlot = (props) => {
  const { position, contributionId, connectDropTarget, canDrop, isOver } = props;
  const contribution = contributionId
    ? <Contribution contributionId={contributionId} position={position} />
    : null;

  const className = classnames('contribution-list-item', {
    'contribution-drop-valid-over': (isOver && canDrop),
    'contribution-drop-valid': (!isOver && canDrop),
    'contribution-drop-invalid': (isOver && !canDrop),
  });

  const contributionSlot = (
    <div
      className={className}
      role="presentation"
    >
      {contribution}
    </div>
  );

  return connectDropTarget(contributionSlot);
};

ContributionSlot.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  contributionId: PropTypes.string,
  swap: PropTypes.func,
};

ContributionSlot.defaultProps = {
  contributionId: null,
  swap: null,
};

module.exports = DropTarget('CONTRIBUTION', contributionSlotTarget, collect)(ContributionSlot);

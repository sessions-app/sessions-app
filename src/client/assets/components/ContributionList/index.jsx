import React from 'react';
import PropTypes from 'prop-types';

const ContributionSlot = props => (
  <div className="contribution-list-item">
    <p className="contribution-list-content">{props.number}</p>
  </div>
);
ContributionSlot.propTypes = { number: PropTypes.number.isRequired };

const ContributionList = () => (
  <div className="contribution-list">
    <ContributionSlot number={1} />
    <ContributionSlot number={2} />
    <ContributionSlot number={3} />
    <ContributionSlot number={4} />
    <ContributionSlot number={5} />
  </div>
);

module.exports = ContributionList;

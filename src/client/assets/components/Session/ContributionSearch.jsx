import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

import { track } from './shapes';

const onChange = storeSetState => (event, { method, newValue }) => {
  if (method === 'type') {
    storeSetState({ searchValue: newValue });
  } else if (method === 'click' || method === 'enter') {
    storeSetState({
      searchValue: `${newValue.name} - ${newValue.artist}`,
      selectedTrack: newValue,
    });
  }
};

const getSuggestions = (query) => {
  const inputValue = query.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return Promise.resolve([]);
  }

  return axios.post('/sessions/search-tracks', { query })
    .then(res => res.data)
    .catch((err) => { throw err; });
};

const onSuggestionsFetchRequested = (storeSetState, { value }) =>
  getSuggestions(value)
    .then(returnedTracks => storeSetState({ suggestions: returnedTracks }))
    .catch(() => storeSetState({
      flashMsg: (<p>Spotify search failed. Please contact support.</p>),
      flashType: 'danger',
    }));

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name} - {suggestion.artist}
  </div>
);

const ContributionSearch = (props) => {
  const {
    searchValue,
    suggestions,
    storeSetState,
  } = props;

  const inputProps = {
    placeholder: 'Type a track',
    value: searchValue,
    onChange: onChange(storeSetState),
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={val => onSuggestionsFetchRequested(storeSetState, val)}
      onSuggestionsClearRequested={() => storeSetState({ suggestions: [] })}
      getSuggestionValue={val => val}
      renderSuggestion={sugg => renderSuggestion(sugg)}
      inputProps={inputProps}
    />
  );
};

ContributionSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape(track)).isRequired,
  storeSetState: PropTypes.func.isRequired,
};

export default ContributionSearch;

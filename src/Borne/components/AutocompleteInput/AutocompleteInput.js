import React from 'react'
import PropTypes from 'prop-types'

import styles from './AutocompleteInput.module.css'

class AutocompleteInput extends React.Component {
  state = {
    input: "",
    resident: {},
    suggestions: []
  };
  handleInputChange(e) {
    var suggestions = [];
    var list = this.props.list;

    (e.target.value != "") && list.map(item => {
      if (item.firstname.startsWith(e.target.value, 0) || item.lastname.startsWith(e.target.value, 0))
      suggestions.push(item)
    })

    this.setState({input: e.target.value, suggestions});
  }
  selectSuggestionInList(suggestion) {
    this.setState({
      suggestion: suggestion,
      input: `${suggestion.lastname.toUpperCase()} ${suggestion.firstname.slice(0, 1).toUpperCase() + suggestion.firstname.slice(1)}`
    })
    this.props.selectResident(suggestion)
  }
  render () {
    const { suggestions, input } = this.state;
    return (
      <div id={styles.container}>
        <div className={styles["input-group"]}>
          <input
            onChange={this.handleInputChange.bind(this)}
            value={input}
            placeholder="Nom..."
            className={styles.input}
            />
          <i className="fas fa-chevron-down"/>
        </div>
        <SuggestionList
          onSuggestionClick={this.selectSuggestionInList.bind(this)}
          suggestions={suggestions}/>}
        </div>
      )
    }
  }

  const SuggestionList = props => {
    return (
      <div
        style={{
          maxHeight: props.suggestions.length > 0 ? '1000px' : 0,
          transition: 'all .3s ease-in-out',
          overflow: 'hidden'
        }}
        className={styles['suggestion-list']}
        >
        {props.suggestions.map((suggestion, key) => {
          return <span className={styles.suggestion} key={key} onClick={() => props.onSuggestionClick(suggestion)}>{`${suggestion.lastname.toUpperCase()} ${suggestion.firstname.slice(0, 1).toUpperCase() + suggestion.firstname.slice(1)}`}</span>
        })}
      </div>
    )
  }

  export default AutocompleteInput;

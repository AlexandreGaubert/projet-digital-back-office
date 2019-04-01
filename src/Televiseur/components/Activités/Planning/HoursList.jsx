import React from 'react'
import PropTypes from 'prop-types'

import { store } from '../../../../redux/store'

class PlanningHoursList extends React.Component {
  state = {
    hours: store.getState().activities.hours,
    textSize: 3 // vh
  }
  render () {
    const { hours, textSize } = this.state;
    const { hourHeight, headerHeight } = this.props;

    return (
      <div className="PlanningHoursList-container">
        <div style={{marginTop: (headerHeight - textSize) + 'vh' }} className="PlanningHoursList-list">
          {hours.map((hour, key) => {
            return <PlanningHour hour={hour} textSize={textSize} hourHeight={hourHeight}/>
          })}
        </div>
      </div>
    )
  }
}

class PlanningHour extends React.Component {
  render () {
    const { hour, hourHeight, textSize } = this.props;
    return (
      <div style={{height: hourHeight + 'vh', fontSize: textSize + 'vh'}} className="PlanningHour">
        {hour + 'h'}
      </div>
    )
  }
}

export default PlanningHoursList;

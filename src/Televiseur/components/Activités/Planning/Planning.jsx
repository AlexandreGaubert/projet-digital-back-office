import React from 'react'
import PropTypes from 'prop-types'

import PlanningDaysList from './DaysList'
import PlanningHoursList from './HoursList'
import PlanningActivitiesList from './ActivitiesList'
import './Planning.css'
import { store } from '../../../../redux/store'

class ActivityPlanning extends React.Component {
  state = {
    hours: store.getState().activities.hours,
  }
  componentDidMount() {
  }
  render () {
    const headerHeight = 15; // vh
    const hourHeight = (100 - headerHeight - 9) / this.state.hours.length; //vh
    return (
      <div style={{overflow: 'hidden', height: '100vh'}}>
        <div className="PlanningNavigator">
          {/*<span className="PlanningNavigator-nextWeekButton">
            <p>Semaine Suivante</p>
            <i className="fas fa-arrow-right"/>
          </span>*/}
        </div>
        <div className="PlanningContainer">

          <PlanningHoursList headerHeight={headerHeight} hourHeight={hourHeight}/>
          <PlanningDaysList headerHeight={headerHeight} hourHeight={hourHeight}/>
        </div>
      </div>
    );
  }
}

export default ActivityPlanning;

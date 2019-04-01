import React from 'react'
import PropTypes from 'prop-types'

import './Planning.css'

class PlanningActivitiesList extends React.Component {
  render () {
    var hours = [10, 11, 12, 13, 14, 15, 16, 17]

    return (
      <div className="PlanningActivitiesList">
        {hours.map((hour, key) => {
          return <span className="PlanningActivitiesList-line" key={key}/>
        })}
      </div>
    )
  }
}

export default PlanningActivitiesList;

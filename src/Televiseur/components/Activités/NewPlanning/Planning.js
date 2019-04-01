import React from 'react'
import PropTypes from 'prop-types'

import PlanningHeader from './Header/Header'
import {store} from '../../../../redux/store'
import './Planning.css'

var daySlots = [
  {hour: '10:00', activity: null},
  {hour: '11:00', activity: null},
  {hour: '12:00', activity: null},
  {hour: '13:00', activity: null},
  {hour: '14:00', activity: null},
  {hour: '15:00', activity: null},
  {hour: '16:00', activity: null},
  {hour: '17:00', activity: null},
]

var slots = [
  daySlots,
  daySlots,
  daySlots,
  daySlots,
  daySlots,
  daySlots,
  daySlots
]

function getCurrentWeekMonday(date) {
  if (date.getDay === 1) return date;

  var monday = new Date();
  //decreasing date until monday
  for (var i = date.getDay(); i > 1; i--) {
    monday.setDate(monday.getDate() -1)
  }
  return monday;
}

class NewPlanning extends React.Component {
  state = {
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const activities = store.getState().activities.activities;

      activities.map(activity => {
        var activityDate = new Date(activity.date)
        console.log(activityDate);
        slots[activityDate.getDay()].map(slot => {
          if (slot.hour === activity.beginAt) slot.activity = activity;
        })
      })

      this.setState({slots: slots});
    })
    const monday = getCurrentWeekMonday(new Date())
    store.dispatch({type: 'GET_ACTIVITY', data: {monday: monday.toISOString().slice(0, 10)}})
  }
  render () {
    const contentHeight = 79; //vh

    return (
      <div id="Planning">
        <PlanningHeader/>
        <div style={{width: '100vw', display: 'flex', flexDirection: 'row', height: contentHeight}}>
          <div style={{width: '80px', height: contentHeight + 'vh'}}/>
          <div id="PlanningContent" style={{height: contentHeight + 'vh'}}>
            {slots.map((daySlot, key) => {
              return (
                <div className="PlanningDay" style={{width: (100/slots.length) + '%'}}>
                  {daySlot.map((slot, key) => {
                    return (
                      <span style={{height: (contentHeight/daySlot.length) + 'vh', width: '100%', border: '1px solid'}}>
                        {slot.activity != null && <p>{slot.activity.name}</p>}
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default NewPlanning;

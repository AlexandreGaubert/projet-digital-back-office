import React from 'react'
import PropTypes from 'prop-types'
import Timetable from 'react-timetable-events'
import moment from 'moment'

import ActivityPlanning from '../../components/Activités/Planning/Planning.jsx'
import NewPlanning from '../../components/Activités/NewPlanning/Planning.js'
import {store} from '../../../redux/store'
import './Activités.css'

function getCurrentWeekMonday(date) {
  if (date.getDay === 1) return date;

  var monday = new Date();
  //decreasing date until monday
  for (var i = date.getDay(); i > 1; i--) {
    monday.setDate(monday.getDate() -1)
  }
  return monday;
}

var initialEvents = {
  Lundi: [],
  Mardi: [],
  Mercredi: [],
  Jeudi: [],
  Vendredi: []
}

class ScreensActivités extends React.Component {
  state = {
    events: initialEvents
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const activities = store.getState().activities.activities;
      var events = initialEvents;
      activities.map(activity => {
        var date = new Date(activity.date);
        console.log(date);
        events[window.days[date.getDay()]].push({
          id: activity._id,
          name: activity.name,
          salle: activity.salle,
          color: activity.color,
          type: 'custom',
          startTime: moment(`${activity.date}T${activity.beginAt}:00`),
          endTime: moment(`${activity.date}T${activity.endAt}:00`)
        })
      })
      this.setState({events: events});
    })
    const monday = getCurrentWeekMonday(new Date())
    store.dispatch({type: 'GET_ACTIVITY', data: {monday: monday.toISOString().slice(0, 10)}})
  }
  render () {
    const TimeTableProps = {
      hoursInterval: [ 10, 18 ],
      timeLabel: '',
      renderHour(hour, defaultAttributes, styles) {
        return (
          <div {...defaultAttributes} className={defaultAttributes.className + ' ' + 'Hour'} key={hour}>
            { hour }
          </div>
        )
      },
      renderEvent(event, defaultAttributes, styles) {
        return (
          <div {...defaultAttributes} style={{...defaultAttributes.style, background: event.color}} className={defaultAttributes.className + ' ' + 'Event'} title={event.name} key={event.id}>
            <span className={styles.event_info + ' ' + 'Event-info'}>{ event.name }</span>
            <span className={styles.event_info + ' ' + 'Event-info'}>{ `salle de ${event.salle}` }</span>
            <span className={styles.event_info + ' ' + 'Event-info'}>
              { event.startTime.format('HH:mm') } - { event.endTime.format('HH:mm') }
            </span>
          </div>
        )
      },
      // getDayLabel: (day) => upperCase(day)
    }
    return (
      <div>
        <Timetable
          {...TimeTableProps}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default ScreensActivités;

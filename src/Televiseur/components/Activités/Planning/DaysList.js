import React from 'react'
import PropTypes from 'prop-types'

import { store } from '../../../../redux/store'

const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

class PlanningDaysList extends React.Component {
  state = {
    days: [],
    activities: store.getState().activities.activities
  }
  componentDidMount() {
    var today = new Date();
    var monday = getCurrentWeekMonday(today);
    var max_number_of_days = 7;

    var days = new Array();

    for (var i = 0; i < max_number_of_days; i++) {
      var day = new Date(monday);
      day.setDate(monday.getDate() + i)
      days.push({
        activities: [],
        date: day.toISOString().slice(0, 10)
      });
    }
    this.setState({days: days});

    this.unsubscribe = store.subscribe(() => {
      this.setState({activities: store.getState().activities.activities});
    })
    store.dispatch({type: 'GET_ACTIVITY', data: {monday: monday.toISOString().slice(0, 10)}})
  }

  render () {
    const { days, activities } = this.state;

    for (var i = 0; i < activities.length; i++) {
      for (var j = 0; j < days.length; j++) {
        if (activities[i].date === days[j].date && days[j].activities.map(act => act._id).indexOf(activities[i]._id) === -1)
          days[j].activities.push(activities[i])
      }
    }

    const { headerHeight } = this.props;
    return (
      <div className="PlanningDaysList">
        {this.state.days.map((day, key) => {
          return <PlanningDay headerHeight={headerHeight} day={day}/>
        })}
      </div>
    );
  }
}

class PlanningDay extends React.Component {
  state = {
    hours: store.getState().activities.hours,
    hourHeight: 0,
  }
  componentDidMount() {
    var date = new Date(this.props.day.date)

    this.setState({hourHeight: document.getElementById(`PlanningDay${date.getDay()}-list`).clientHeight / this.state.hours.length});
  }
  render () {
    const { day, headerHeight } = this.props;
    const { hours, hourHeight } = this.state;
    var date = new Date(day.date)
    return (
      <div className="PlanningDay" id={`PlanningDay-${date.getDate()}`}>
        <div style={{height: headerHeight + 'vh', fontSize: (headerHeight * 0.35) + 'vh'}} className="PlanningDay-header" id={`PlanningDay-header${date.getDate()}`}>
          <p className="PlanningDay-day">{weekDays[date.getDay()].slice(0, 3) + '.'}</p>
          <p className="PlanningDay-date">{date.getDate()}</p>
        </div>
        <div id={`PlanningDay${date.getDay()}-list`} className="PlanningDay-list">
          {hours.map((hour, key) => {
            return <span style={{height: `${hourHeight}px`}} className="PlanningDay-list-item" key={key}/>
          })}
          {day.activities.map((activity, key) => {
            return (
              <span
                className="PlanningDay-list-activity"
                style={{
                  backgroundColor: activity.color,
                  height: hourHeight * (parseInt(activity.endAt.slice(0, 2)) - parseInt(activity.beginAt.slice(0, 2))) + 'px',
                  top: hourHeight * (parseInt(activity.beginAt.slice(0, 2)) - parseInt(hours[0].slice(0, 2))),
                }}>
                <p>{activity.name}</p>
                <p>{activity.salle}</p>
                <p>{activity.beginAt} - {activity.endAt}</p>
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}

function getCurrentWeekMonday(date) {
  if (date.getDay === 1) return date;

  var monday = new Date();
  //decreasing date until monday
  for (var i = date.getDay(); i > 1; i--) {
    monday.setDate(monday.getDate() -1)
  }
  return monday;
}

export default PlanningDaysList;

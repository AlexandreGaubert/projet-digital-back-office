import React from 'react'
import PropTypes from 'prop-types'

import './Picker.css'
import MenusPickerPlat from './Plat.jsx'
import MenusFinish from '../Finish/Finish.jsx'
import { APICall } from '../../../../redux/APICall'
import { store } from '../../../../redux/store'

class MenusPicker extends React.Component {
  state = {
    currentDay: getCurrentWeekMonday(new Date()),
    selectedPlatIndex: null,
    results: []
  }
  selectPlat(plat) {
    this.setState({selectedPlatIndex: plat});
  }
  submitResults(results) {
    const { menu, resident } = this.props;

    var foundIndex = menu.results.findIndex(result => result.resident._id === resident._id);
    foundIndex > -1 ? menu.results[foundIndex] = {resident, results} : menu.results.push({resident, results})

    store.dispatch({type: 'EDIT_MENU', data: menu})
  }
  validateDayChoice() {
    this.setState(prevstate => {
      var results = prevstate.results;
      var currentDay = prevstate.currentDay;
      results.push(prevstate.selectedPlatIndex);
      if (currentDay.getDay() === 5) this.submitResults(results)
      currentDay.setDate(currentDay.getDate() + 1)
      return {results, currentDay, selectedPlatIndex: null}
    });
  }
  cancelPreviousDay() {
    this.setState(prevstate => {
      var results = prevstate.results;
      if (prevstate.currentDay.getDay() === 1) return;

      var previousDay = new Date(prevstate.currentDay);
      previousDay.setDate(prevstate.currentDay.getDate() - 1)
      if (previousDay.getDay() === 5) this.submitResults(results)

      results.pop(); //remove last element

      return {results, currentDay: previousDay, selectedPlatIndex: null}
    });
  }
  render() {
    const { currentDay } = this.state;
    console.log(this.state.results);
    if (currentDay.getDay() > 5) return this.renderFinish()
    else return this.renderPicker()
  }
  renderFinish() {
    return(
      <MenusFinish text={"Votre choix de menu a été enregistré, merci."} resident={this.props.resident}/>
    )
  }
  renderPicker () {
    const { currentDay, selectedPlatIndex } = this.state;
    const { menu, resident } = this.props;
    var day = window.days[currentDay.getDay()];
    var currentDayMenu = menu[day.charAt(0).toLowerCase() + day.slice(1)]

    return (
      <div className="container">

        <h2 className="current-day">{window.days[currentDay.getDay()]}</h2>

        <div className="picker">
          <MenusPickerPlat bgColor="#cc998d" platIndex={1} platLabel={currentDayMenu.plat_1} selectPlat={this.selectPlat.bind(this)} selected={selectedPlatIndex === 1}/>
          <MenusPickerPlat bgColor="#429ea6" platIndex={2} platLabel={currentDayMenu.plat_2} selectPlat={this.selectPlat.bind(this)} selected={selectedPlatIndex === 2}/>
          <MenusPickerPlat bgColor="#a6a6a6" platIndex={3} platLabel={currentDayMenu.plat_3} selectPlat={this.selectPlat.bind(this)} selected={selectedPlatIndex === 3}/>
        </div>

        <div className="button-group">
          <Button action={this.cancelPreviousDay.bind(this)} text="Revenir en arrière" icon="fas fa-undo" bgColor="#ff914d"/>
          <Button bgColor="#7ed957" text="Jour Suivant" icon="fas fa-check" action={this.validateDayChoice.bind(this)}/>
        </div>

      </div>
    )
  }
}

const Button = (props) => {
  return (
    <span style={{backgroundColor: props.bgColor}} onClick={props.action} className="button">
      <i className={"button-icon" + " " + props.icon }/>
      <p className="button-text">{props.text}</p>
    </span>
  )
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

export default MenusPicker;

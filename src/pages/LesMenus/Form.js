import React, { Component } from "react"

import Button from '../../components/reusable/Button'
import FormErrors from '../../components/FormErrors'
import { store } from '../../redux/store'

const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

export default class Form extends Component {
  constructor(props) {
    super(props);
    var formErrors = {
      from: '',
      to: '',
    }
    if (props.data) {
      this.state = {
        ...props.data,
        day: 0,
        formErrors: formErrors
      }
    }
    else {
      this.state = {
        ...initialState,
        day: 0,
        formErrors: formErrors
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.validate = this.validate.bind(this);
  }
  nextDay() {
    this.setState(prevstate => {return {day: prevstate.day === 4 ? 0 : prevstate.day + 1}});
  }
  prevDay() {
    this.setState(prevstate => {return {day: prevstate.day === 0 ? 4 : prevstate.day - 1}});
  }
  handleInputChange(e) {
    const day = days[this.state.day]
    this.setState({
      [day]: {
        ...this.state[day],
        [e.target.name]: e.target.value
      }
    })
  }
  handleDateChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  validate() {
    var formIsValid = true;
    var { formErrors, from, to } = this.state;
    if (from.length === 0) {
      formErrors.from = 'Vous devez définir une date de début'
      formIsValid = false
    }
    if (to.length === 0) {
      formErrors.to = 'Vous devez définir une date de fin'
      formIsValid = false
    }
    from = new Date(from);
    to = new Date(to);
    if ((from - to) > 0) {
      formErrors.from = 'La date de début est antérieur à la date de fin'
      formIsValid = false
    }
    if ((from - to) === 0) {
      formErrors.from = 'La date de début est la même que la date de fin'
      formIsValid = false
    }


    this.setState({formErrors: formErrors})

    return formIsValid;
  }
  handleSubmit() {
    const { type } = this.props;

    if (this.validate() === true) {
      if (type === 'create')
        store.dispatch({type: 'CREATE_MENU', data: this.state})
      else if ( type === 'edit' )
        store.dispatch({type: 'EDIT_MENU', data: this.state})
      this.props.onClose()
    }
  }
  render() {
    const day = days[this.state.day];
    const { plat_1, plat_2, plat_3, entree_1, entree_2, legumes, plateau_1, plateau_2} = this.state[day];
    const { from, to, formErrors } = this.state;
    console.log(formErrors);

    return (
      <div style={styles.container}>
        <span style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc'}}>
          <p style={{fontSize: '2vw', fontWeight: 'bold'}}>Semaine du</p>
          <Input
            error={formErrors['from']}
            style={{...styles.platInput, margin: '0 1em'}}
            onChange={this.handleDateChange}
            name={'from'}
            value={from}
            type="date"
          />
          <p style={{fontSize: '2vw', fontWeight: 'bold'}}>au</p>
          <Input
            error={formErrors['to']}
            style={{...styles.platInput, margin: '0 1em'}}
            onChange={this.handleDateChange}
            name={'to'}
            value={to}
            type="date"
          />
        </span>

        <span style={styles.nav}>
          <i style={{cursor: 'pointer'}} onClick={this.prevDay} className="fas fa-chevron-left"/>
          {day.charAt(0).toUpperCase() + day.slice(1)}
          <i style={{cursor: 'pointer'}} onClick={this.nextDay} className="fas fa-chevron-right"/>
        </span>

        <span style={styles.entrees}>
          <Input placeholder="Entrée N°1" style={styles.entreeInput} onChange={this.handleInputChange} name={"entree_1"} value={entree_1}/>
          <Input placeholder="Entrée N°2" style={styles.entreeInput} onChange={this.handleInputChange} name={"entree_2"} value={entree_2}/>
        </span>
        <span style={styles.plats}>
          <Input placeholder="Plat N°1" style={styles.platInput} onChange={this.handleInputChange} name={"plat_1"} value={plat_1}/>
          <Input placeholder="Plat N°2" style={styles.platInput} onChange={this.handleInputChange} name={"plat_2"} value={plat_2}/>
          <Input placeholder="Plat N°3" style={styles.platInput} onChange={this.handleInputChange} name={"plat_3"} value={plat_3}/>
          <Input placeholder="Légumes" style={styles.platInput} onChange={this.handleInputChange} name={"legumes"} value={legumes}/>
          <Input placeholder="Plateau N°1" style={styles.platInput} onChange={this.handleInputChange} name={"plateau_1"} value={plateau_1}/>
          <Input placeholder="Plateau N°2" style={styles.platInput} onChange={this.handleInputChange} name={"plateau_2"} value={plateau_2}/>
        </span>
        <FormErrors formErrors={formErrors}/>
        <Button action={this.handleSubmit} type="submit" text="VALIDER" style={styles.button}/>
      </div>
    )
  }
}

const Input = (props) => {
  const { placeholder, style, onChange, name, value, error, type } = props;
  const mergedStyle = {style};

  // console.log(name, error);
  if (error) {
    if (error.length !== 0) {
      Object.assign(mergedStyle, styles.inputError)
    }
  }
  return (
    <input
       placeholder={placeholder}
       style={style}
       onChange={onChange}
       name={name}
       value={value}
       type={type ? type : 'text'}
     />
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eaedf2',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    padding: '0 1em',
    fontSize: '1.2vw'
  },
  nav: {
    display: 'flex',
    alignItems: 'baseline',
    margin: '0 auto .5em auto',
    width: '60%',
    fontSize: '2vw',
    justifyContent: 'space-between',
    marginTop: '1em',
  },
  plats: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontSize: 'inherit'
  },
  platInput: {
    padding: '.5em',
    margin: '.5em 0',
    fontSize: 'inherit'
  },
  entrees: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  entreeInput: {
    padding: '.5em',
    margin: '.5em 0',
    width: '40%',
    fontSize: 'inherit'
  },
  button: {
    padding: '2vh 0',
    margin: '.5em 0',
    width: '100%',
    fontSize: 'inherit'
  },
  inputError: {
    backgroundColor: 'red'
  }
}

var initialStateDay = {
  plat_1: '',
  plat_2: '',
  plat_3: 'Jambon',
  entree_1: '',
  entree_2: '',
  legumes: '',
  plateau_1: 'Produits laitiers',
  plateau_2: 'Fruits',
}

var initialState = {
  from: '',
  to: '',
  lundi: {...initialStateDay},
  mardi: {...initialStateDay},
  mercredi: {...initialStateDay},
  jeudi: {...initialStateDay},
  vendredi: {...initialStateDay},
}

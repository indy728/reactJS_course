import React, { Component } from 'react';

import './App.css';

// import Radium, { StyleRoot } from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }

  // state must be used with classes that extend components
  // **use state with care
  state = {
    persons: [
      {id: 'hjfdl1', name: 'Kyle', age: 31},
      {id: 'hjfdl3', name: 'Lexi', age: 23},
      {id: 'hjfdl4', name: 'Graham', age: 39},
    ],
    otherState: 'some other value',
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  // switchNameHandler = (newName) => {
  //   // console.log('Was clicked!');
  //   // DONT DO THIS: this.state.persons[0].name = 'Big Boy';
  //   this.setState({
  //     persons: [
  //       {name: 'Big Boy', age: 31},
  //       {name: 'Lexi', age: 23},
  //       {name: newName, age: 39},
  //     ]
  //   })
  // }
  
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    // this.setState({
      //   persons: [
        //     {name: 'Kyle', age: 31},
        //     {name: event.target.value, age: 23},
        //     {name: 'Graham', age: 39},
        //   ]
        // }) 
    // this.setState({persons: persons});
    this.setState( (prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    // slice() copies an array so that you are not damaging original program
    // const persons = this.state.persons.slice();
    // or you can spread:
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: !this.state.authenticated});
  }

  // Whatever app or component is used, 
  // it always needs to return or render HTML to the DOM
  render() {

    console.log('[App.js] render');
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}
          /> 
      )
    }

    return (
      <Aux>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          <Cockpit
            clicked={this.togglePersonsHandler}
            title={this.props.appTitle}
            />
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

    // {/* <Person 
    //   name={this.state.persons[0].name}
    //   age={this.state.persons[0].age}/>
    // <Person
    //   name={this.state.persons[1].name}
    //   age={this.state.persons[1].age}
    //   click={this.switchNameHandler.bind(this, 'Gray')} 
    //   changed={this.nameChangeHandler}>My Hobbies: Pizza</Person>
    // <Person
    //   name={this.state.persons[2].name}
    //   age={this.state.persons[2].age}/> */}

// export default Radium(App);
export default withClass(App, "App");
// export default App;

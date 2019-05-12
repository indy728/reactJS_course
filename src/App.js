import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  // state must be used with classes that extend components
  // **use state with care
  state = {
    persons: [
      {id: 'hjfdl1', name: 'Kyle', age: 31},
      {id: 'hjfdl3', name: 'Lexi', age: 23},
      {id: 'hjfdl4', name: 'Graham', age: 39},
    ],
    otherState: 'some other value',
    showPersons: false
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
    this.setState({persons: persons});
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

  

  // Whatever app or component is used, 
  // it always needs to return or render HTML to the DOM
  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      color: 'white',
      // Radium is required for pseudo selectors on inline styling
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red')
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold')
    }



    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          {/* notice that switchNameHandler is a function but is not called with parentheses */}
          <button style={style} onClick={this.togglePersonsHandler}>Switch Name</button>
          {persons}
        </div>
      </StyleRoot>
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

export default Radium(App);

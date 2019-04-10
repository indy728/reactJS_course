import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  // state must be used with classes that extend components
  // **use state with care
  state = {
    persons: [
      {name: 'Kyle', age: 31},
      {name: 'Lexi', age: 23},
      {name: 'Graham', age: 39},
    ],
    otherState: 'some other value'
  }

  switchNameHandler = () => {
    // console.log('Was clicked!');
    // DONT DO THIS: this.state.persons[0].name = 'Big Boy';
    this.setState({
      persons: [
        {name: 'Big Boy', age: 31},
        {name: 'Lexi', age: 23},
        {name: 'Graham', age: 39},
      ]
    })
  }

  // Whatever app or component is used, 
  // it always needs to return or render HTML to the DOM
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* notice that switchNameHandler is a function but is not called with parentheses */}
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name="Lexi" age = "23">My Hobbies: Pizza</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );
  }
}

export default App;

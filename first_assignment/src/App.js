import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {

  state = {
    userOutput: [
      {userName: 'Kyle', hobby: "fucking"},
      {userName: 'Lexi', hobby: "sucking"}
    ]
  }

  switchHobbyHandler = (event) => {
    this.setState({
      userOutput: [
        {userName: 'Kyle', hobby: event.target.value},
        {userName: 'Lexi', hobby: "sucking"}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <UserInput
          changed={this.switchHobbyHandler}
          currentHobby={this.state.userOutput[0].hobby}></UserInput>
        <UserOutput 
          userName={this.state.userOutput[0].userName}
          hobby={this.state.userOutput[0].hobby}></UserOutput>
        <UserOutput 
          userName={this.state.userOutput[1].userName}
          hobby={this.state.userOutput[1].hobby}></UserOutput>
      </div>
    );
  }
}

export default App;

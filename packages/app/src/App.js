import React, { Component } from 'react'
import {Cat} from 'cat'
import {Dog} from 'dog'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="PetContainer">
          <Cat />
          <Dog />
        </div>
      </div>
    );
  }
}

export default App

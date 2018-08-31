import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Service } from './_services';




class App extends Component {

  constructor() {
    super(); //hereda todas las funcionalidades de react

    this.state = {
      title: 'Prueba1 title',
      description: 'Prueba1 descripcion',
      status: {
        type: false,
        default: false
      }
    }
  }

  componentDidMount() {
    Service.get('all/')
      .then(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">.</h1>
        </header>
        <p className="App-intro">
          .
        </p>
      </div>
    );
  }
}

export default App;

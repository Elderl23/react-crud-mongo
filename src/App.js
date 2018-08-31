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
        // console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          this.state = response.data;
        }
        },
        error => {
          // console.log(error);
        }
      )
  }

  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#">CRUD ReactJs y Nodejs con Mongodb</a>
        </nav>


        <div className="container">

    <div className="row">
      <div className="col-md-5">
        <div className="card">
          <div className="card-body">

          </div>
        </div>
      </div>

      <div className="col-md-7">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>N°</th>
              <th>Title</th>
              <th>Description</th>
              <th>Operations</th>
            </tr>
          </thead>

          <tbody>
              
             
          </tbody>

        </table>
  
      </div>
    </div>
  </div>





      </div>
    );
  }
}

export default App;

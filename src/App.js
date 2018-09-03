import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Service } from './_services';




class App extends Component {

  constructor() {
    super(); //hereda todas las funcionalidades de react

    this.state = {
      posts: [{
        title: '',
        description: '',
        status: false,
      }]
    }

    this.addValorInput = this.addValorInput.bind(this);

  }

  componentDidMount() {
    Service.get('all/')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({ posts: response.data })
        }
        },
        error => {
          console.log(error);
        }
      )
  }

  addValorInput(e){
    const { value , name } = e.target;
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value
    });

    console.log(this.state.posts);
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
            <form action="/add" method="post">
              <div className="form-group">
                <input className="form-control" type="text" id="title" name="title" placeholder="Title" onChange={this.addValorInput}/>
              </div>
              <div className="form-group">
                <textarea className = "form-control"name = "description" cols = "80" placeholder="Add a Description" onChange={this.addValorInput}></textarea>
              </div>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </form>
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
              
             {this.state.posts.map(function(obj, index){
                return (
                    <tr key={ index++ }> 
                      <td>{ index }</td>
                      <td>{ obj.title }</td>
                      <td>{ obj.description }</td>
                      <td>
                        <a className={(obj.status ? 'btn btn-success' : 'btn btn-dark')}> Done </a>
                      </td>
                    </tr>
                );
              })} 
              
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

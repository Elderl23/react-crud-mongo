import React, { Component } from 'react';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
// import logo from './logo.svg';
import './App.css';

import { Service } from './_services';

import  Taskform  from './crud/form';

class App extends Component {

  constructor() {
    super(); //hereda todas las funcionalidades de react

    this.state = {
      posts: [],
      isShow: false,
      isTask: '',
      loading: false
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    Service.get('allTask/')
      .then(response => {
        if (response.status === 200) {
          this.setState({
            posts: response.data,
            loading: false
          });
        }
      },
      error => {
        this.setState({
          loading: false
        });
          console.log(error);
        }
      );
  }

  

  handleAddTodo(todo) {
    console.log(todo);
    this.setState({
      posts: todo
    });
  }

  activateTask(id) {
    this.setState({
      loading: true
    });
    Service.get('updateStatusTask/'+id+'/')
      .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.setState({
              posts: response.data,
              loading: false
            });
          }
        },
        error => {
          console.log(error);
          this.setState({
            loading: false
          });
        }
      );
  }

  deleteTask(id) {
    Service.get('deleteStatusTask/' + id + '/')
      .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.setState({
              posts: response.data,
              loading: false
            });
          }
        },
        error => {
          this.setState({
            loading: false
          });
          console.log(error);
        }
      );
  }

  editTask(id){
      this.setState(state => ({
        isShow: true,
        isTask: id
      }));
  }


  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#">CRUD ReactJs y Nodejs con Mongodb</a>
        </nav>
        <div className="container">

        <div className="row">

        <Taskform onAddTodo={this.handleAddTodo} isShow={this.state.isShow} isTask={this.state.isTask}/>
          
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
                  
                {this.state.posts.map((obj, index) => {
                    return (
                        <tr key={ index++ }> 
                          <td>{ index }</td>
                          <td>{ obj.title }</td>
                          <td>{ obj.description }</td>
                          <td>
                            <button type="button"  className={(obj.status ? 'btn btn-success' : 'btn btn-primary')} onClick={this.activateTask.bind(this, obj._id)}>Done</button>
                            <button type="button"  className='btn btn-info' onClick={this.editTask.bind(this, obj._id)}>Editar</button>
                            <button type="button"  className='btn btn-danger' onClick={this.deleteTask.bind(this, obj._id)}>Eliminar</button>
                          </td>
                        </tr>
                    );
                  })} 
                  
              </tbody>

            </table>
      
          </div>
        </div>
      </div>
      { this.state.loading ? <div className='sweet-loading sweet-loading'><ClipLoader className = 'override' sizeUnit={"px"} size={150} color={'#123abc'} loading={this.state.loading}/></div> : null}
      </div>
    );
  }

}

export default App;

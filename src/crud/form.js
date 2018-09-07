

import React, { Component } from 'react';
import { Service } from '../_services';

class Taskform extends Component {

  constructor(props) {
    super(props); //hereda todas las funcionalidades de react

    this.state = {
      title: '',
      description: '',
      status: false,
      isEdit: false,
      idTask:'',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(props) {//Obtenemos los parametros pasados por el componente padre
    console.log("Obtengo los datos");

    console.log(this.state.isEdit);


    
    
    if (!this.state.status && props.isShow) {
      console.log("entro");
      
      this.setState({
        isEdit: props.isShow,
        idTask: props.isTask,
        status: true
      }, () => {
        console.log(this.state);
        if (this.state.isEdit) {
          this.getByIdTask(this.state.idTask);
        }
      });
    }else{
      console.log("nel");
      
    }
  }

  getByIdTask(id){
    console.log(this.state.isEdit);
    
    Service.get('selectTask/'+ id +'/')
      .then(response => {
          if (response.status === 200) {
            this.setState({
              title: response.data.title,
              description: response.data.description,
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }


  handleInput(e) {
    const { value , name } = e.target;
    this.setState({
      [name]: value
    });
  }

  validateForm() {
      return ((this.state.title.length > 0 && this.state.title.trim() !== "") && (this.state.description.length > 0 && this.state.description.trim() !== ""));
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.isEdit);

    if (!this.state.isEdit) {
      Service.post('addTask/', this.state)
        .then(response => {
            if (response.status === 200) {
              this.props.onAddTodo(response.data);
              this.resetSetState();
            }
          },
          error => {
            console.log(error);
          }
      );
    }else{
      Service.post('editTask/' + this.state.idTask + '/', this.state)
        .then(response => {
            if (response.status === 200) {
              this.props.onAddTodo(response.data);
              this.setState({
                isEdit: false,
              });
              this.resetSetState();
            }
          },
          error => {
            console.log(error);
          }
      );
    }
  }

  resetSetState(){
    console.log("limpiamos");
    
    this.setState({
      title: '',
      description: '',
      status: false,
      isEdit: false,
      idTask: '',
    });

    console.log(this.state);
    
  }


  render() {
    return (
      <div className="col-md-5">
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" type="text" id="title" name="title" placeholder="Título" value={this.state.title} onChange={this.handleInput} />
              </div>
              <div className="form-group">
                <textarea className = "form-control"name = "description" cols = "80" placeholder="Agrega una descripción" value={this.state.description} onChange={this.handleInput}></textarea>
              </div>
              <button className="btn btn-primary" type="submit" disabled={!this.validateForm()}>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Taskform;

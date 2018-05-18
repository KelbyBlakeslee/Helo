import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Routes from './route';
import { connect } from 'react-redux';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      input2: '',
      name: '',
      num: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChangeTwo = this.handleInputChangeTwo.bind(this);
    this.handleAddTwo = this.handleAddTwo.bind(this);



  }

  handleInputChange(value) {
    this.setState({ input: value });
  }
  handleAdd() {
    this.props.add(this.state.input);
    this.setState({ input: '' })
  }

  handleInputChangeTwo(value) {
    this.setState({ input: value });
  }
  handleAddTwo() {
    this.props.add(this.state.input);
    this.setState({ input2: '' })
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(response => {
        console.log(response)
      })
    console.log("Component did mount!")
  }




  render() {
    return (
      <div className="App">
        {HashRouter}
      </div>
    );
  }
}

function moveFromStateToProps(state) {
  return {
    name: state.name,
    number: state.num
  }
}


let connected_function = connect(moveFromStateToProps);
let connected_component = connected_function(App);
export default connected_component;

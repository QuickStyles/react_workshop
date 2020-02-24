import React, { Component } from 'react';

import NewItemForm from './components/NewItemForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props) // must super props for React to work
    this.state = {
      items: [{title: 'stuff'}, {title: 'birds'}, {title: 'bees'}],
      timer: 3,
      user: null,
    }
  }
  componentDidMount() {
    // this happens immediately after a React component gets placed onto the dom
    // setTimeout(() => {
    //   this.setState({
    //     items: [{title: 'apples'}]
    //   })
    // }, 3000)
    const loginData = {
      email: 'js@winterfell.gov',
      password: 'supersecret'
    }
    fetch(`http://localhost:3000/api/v1/session`,
      {
        method: "POST",
        header: {
          'Content-Type': "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      },
    ).then(res => res.json())
    .then(data => {
      this.setState({user: data.user})
    })

    fetch(`http://localhost:3000/api/v1/products`)
      .then(res => res.json())
      .then(data => {
        // this.setState({
        //   items: data,
        //   timer: this.state.timer +1,
        // }); // this is bad because setState is async there's no garauntee that this.state.timer is what you think it is.
        this.setState((state, props) => {
          return {
            items: data,
            timer: state.timer + 1, // because the new timer state relies on the old timer state we want to pass a callback into setState instead of just an object
          }
        })
      })
  }
  render() {
    return (
      <div className="App">
        <NewItemForm />
        <ul>
          {this.state.items.map(item => <li>{item.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;

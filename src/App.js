import React, { Component } from 'react';

import NewItemForm from './components/NewItemForm';
import requests from './requests'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props) // must super props for React to work
    this.state = {
      items: [{title: 'stuff'}, {title: 'birds'}, {title: 'bees'}],
      timer: 3,
      user: null,
      title: '',
      description: '',
      price: ''
    }
    this.handleCreateItem = this.handleCreateItem.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(inputData) {
    console.log(inputData);
    const { name, value } = inputData;
    this.setState({[name]: value})
  }

  handleCreateItem() { // invoked when we submit the form
    const data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
    }
    requests.create(data) // sending a fetch request to create new item
    .then(data => {
      const { id } = data; // data.id
      this.setState({
        title: '',
        description: '',
        price: ''
      })
      return requests.getOne(id) // when we get the new item back we use the id to fetch it's data (title, description, price, tags)
    })
    .then(data => { // when we recieve the item's data back 
      this.setState((state) => { // we add that one item to our current list of items
      // const newArray = [].concat(state.items)
        return {
          items: [data, ...state.items] // ...state.items is copying all of the current state's items and appending data (our new item) to the current list
        }
      })
    })
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
        <NewItemForm 
          onCreateItem={this.handleCreateItem} 
          title={this.state.title}
          description={this.state.description}
          price={this.state.price}
          onInputChange={this.handleInputChange}
        />
        <ul>
          {this.state.items.map((item, id) => <li key={id}>{item.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;

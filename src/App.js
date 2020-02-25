// WHy would we want to use hooks?
// 1) keeps file sizes small
// 2) a lot less boilerplate code
// 3) its easier to test
// 4) a lot of stateful logic you can re-use
// 5) probably make file sizes 90% smaller
// 6) a lot of libraries use it. Facebook really wants you to use it

import React, {useState, useEffect} from 'react'

import NewItemForm from './components/NewItemForm';
import requests from './requests'

import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([{title: 'stuff'}, {title: 'birds'}, {title: 'bees'}]);

  const [input, setInput] = useState({
    title: '',
    description: '', 
    price: ''
  })

  function handleCreateItem() {
    requests.create(input)
    .then(data => {
      const { id } = data;
      setInput({
        title: '',
        description: '', 
        price: ''
      })
      return requests.getOne(id)
    })
    .then(data => {
      setItems([data, ...items])
    })
  }

  function handleInputChange(inputData) {
    const data = {[inputData.name]: inputData.value};
    setInput({...input, ...data})
  }

  useEffect(() => {
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
      setUser(data.user)
    })
  }, []) // useState accepts a 2nd argument it uses to determine when it should trigger. If you pass it an empty array it will only trigger once on component mount

  // populate the items array
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/products`)
      .then(res => res.json())
      .then(data => {
        setItems(data)
      })
  }, [])

  return (
    <div className="App">
      <NewItemForm 
        onCreateItem={handleCreateItem} 
        title={input.title}
        description={input.description}
        price={input.price}
        onInputChange={handleInputChange}
      />
      <ul>
      {items.map((item, id) => <li key={id}>{item.title}</li>)}
      </ul>
    </div>
  );
}
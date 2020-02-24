import React from 'react'

export default function NewItemForm({onCreateItem, title, description, price}) {

  function handleSubmit(event) {
    event.preventDefault();
    const target = event.currentTarget
    const formData = new FormData(target);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price')
    }
    onCreateItem(data)
  }
  // const onSubmit = props.onSubmit;
  return(
    <form style={{display: 'flex', flexDirection:'column', width: '400px'}} onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input name="title"></input>
      <label htmlFor="description">Description</label>
      <input name="description"></input>
      <label htmlFor="price">Price</label>
      <input name="price"></input>
      <input type="submit"/>
    </form>
  )
}
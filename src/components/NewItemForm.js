import React from 'react'

export default function NewItemForm({onCreateItem, title, description, price, onInputChange}) {

  function handleSubmit(event) {

    onCreateItem(data)
  }

  function handleChange(event) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    onInputChange({name, value})
  }
  // const onSubmit = props.onSubmit;
  return(
    <form style={{display: 'flex', flexDirection:'column', width: '400px'}} onSubmit={() => {handleSubmit()}}>
      <label htmlFor="title">Title</label>
      <input name="title" value={title} onChange={handleChange}></input>
      <label htmlFor="description">Description</label>
      <input name="description" value={description} onChange={handleChange}></input>
      <label htmlFor="price">Price</label>
      <input name="price" value={price} onChange={handleChange}></input>
      <input type="submit"/>
    </form>
  )
}
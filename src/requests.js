export default {
  create(data) {
    return fetch('http://localhost:3000/api/v1/products', {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  },
  getOne(id) {
    return fetch(`http://localhost:3000/api/v1/products/${id}`)
    .then(res => res.json())
  }
}
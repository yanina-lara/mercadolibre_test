import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api';

export const searchProducts = search => {
  return axios.get(`${BASE_URL}/items?q=${search}`)
  .then(({data}) => data)
  .catch(error => console.log(error));
}

export const productDetails = productId => {
  return axios.get(`${BASE_URL}/items/${productId}`)
  .then(({data}) => data)
  .catch(error => console.log(error));
}

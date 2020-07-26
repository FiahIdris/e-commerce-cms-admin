import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-fiah.herokuapp.com'
})

export default instance

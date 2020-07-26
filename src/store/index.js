import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    access_token: null,
    products: []
  },
  mutations: {
    LOGIN (state, payload) {
      state.access_token = payload
    },
    FETCH_DATA (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios
        .post('/login',
          {
            email: payload.email,
            password: payload.password
          })
        .then(({ data }) => {
          commit('LOGIN', data.access_token)
          localStorage.setItem('access_token', data.access_token)
          router.push('/products')
        })
        .catch(err => {
          console.log('failed to login', err)
        })
    },
    fetchData ({ commit }) {
      axios({
        url: '/products',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          // console.log(data)
          commit('FETCH_DATA', data.data)
        })
        .catch(err => {
          console.log('failed fetching data', err)
        })
    },
    newProduct ({ commit, dispatch }, payload) {
      // console.log(payload)
      axios({
        url: '/products',
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          payload
        }
      })
        .then(data => {
          console.log('success added')
          dispatch('fetchData')
          Swal.fire('Success adding a new product')
        })
        .catch(err => {
          console.log(err.response.data.errors)
          let error = err.response.data.errors[0].errors
          if (err.response.data.errors[0].errors === 'Validation min on price failed') {
            error = 'price/stock must be greater than 0'
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops... Sorry!',
            text: `${error}`
          })
        })
    },
    edit ({ commit, dispatch }, payload) {
      axios({
        url: '/products/' + payload.id,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          payload
        }
      })
        .then(data => {
          console.log('success editing')
          dispatch('fetchData')
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Oops... Sorry!',
            text: 'Any field cannot be empty'
          })
        })
    },
    deleteProduct ({ commit, dispatch }, id) {
      axios({
        url: '/products/' + id,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log('success deleted')
          dispatch('fetchData')
          Swal.fire('Success destroying the product')
        })
        .catch(err => {
          console.log('failed to delete', err)
          Swal.fire({
            icon: 'error',
            title: 'Oops... Sorry!',
            text: `${err.response.data.message}`
          })
        })
    }
  },
  modules: {
  }
})

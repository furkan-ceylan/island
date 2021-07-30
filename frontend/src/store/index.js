import { Commit, createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: '',
  },
  getters: {},
  actions: {
    async fetchUser({ commit }) {
      let response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      commit('SET_USER', response.data.user)
    },
    async refreshToken() {
      await axios
        .get('auth/token')
        .then((response) => {
          localStorage.setItem('token', response.data.refreshToken)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
})

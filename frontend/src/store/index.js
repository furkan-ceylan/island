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
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
})

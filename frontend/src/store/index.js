import { Commit, createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    userId: '',
  },
  getters: {
    setUserId: (state, userId) => state.userId,
  },
  actions: {
    async fetchUserId({ commit }) {
      await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      }),
        then((response) => {
          commit('setUserId', response.data.user._id)
        })
    },
  },
  mutations: {},
})

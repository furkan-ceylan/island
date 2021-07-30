import { Commit, createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: [],
    posts: [],
  },
  getters: {},
  actions: {
    async fetchUser({ commit }) {
      let response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      commit('SET_USER', response.data.user)
    },
    async fetchPosts({ commit }) {
      const responseId = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })

      const currentUser = responseId.data.user._id

      const responsePosts = await axios.get('posts/timeline/' + currentUser)

      const posts = responsePosts.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })

      commit('SET_POSTS', posts)
    },
    async addPost({ commit }, post) {
      await axios.post('posts/', post)
      commit('ADD_POST', post)
    },
    async addImagePost({ commit }, {post, formData}) {
      await axios.post('posts/', post)
      await axios.post('posts/upload', formData)
      commit('ADD_POST', post)
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
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    ADD_POST(state, post) {
      state.posts.push(post)
    },
  },
})

<template>
  <form
    class="add-post"
    @submit.prevent="addImagePost"
    enctype="multipart/form-data"
    v-if="openAddPost"
  >
    <h2 class="add-post__title">
      Add an Image Post
    </h2>
    <label class="input">
      <input
        class="input__field"
        type="text"
        placeholder=" "
        v-model="imageTitle"
      />
      <span class="input__label">Title</span>
    </label>
    <label class="input">
      <input
        class="input__field"
        type="file"
        @change="onFileChange"
        ref="file"
        name="file"
      />
      <span class="input__label">Image</span>
    </label>
    <span class="input__label warn" v-if="fillError"
      >Please fill in all fields</span
    >
    <div class="options">
      <button type="submit" class="btn-addpost" v-if="!isLoading">
        Add
      </button>
      <sync-loader
        :color="color"
        :loading="loading"
        v-if="isLoading"
      ></sync-loader>
      <button
        @click="openAddPost = !openAddPost"
        class="btn-addpost"
        v-if="!isLoading"
        type="button"
      >
        Close
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: 'AddImagePost',
  components: {
    SyncLoader,
  },
  data() {
    return {
      posts: [],
      user: [],
      imageTitle: '',
      file: null,
      isLoading: false,
      color: 'pink',
      openAddPost: true,
    }
  },
  methods: {
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.file = file
    },
    async addImagePost() {
      this.isLoading = true
      const response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      const currentUser = response.data.user._id

      const formData = new FormData()
      formData.append('file', this.file)

      if (this.imageTitle === '' || this.file === '') {
        this.fillError = true
      } else {
        const responseUsers = await axios.get('users/' + currentUser)
        this.user = responseUsers.data

        const response = await axios.post('posts/', {
          title: this.imageTitle,
          isImagePost: true,
          displayName: this.user.displayName,
          userId: currentUser,
          file: this.file.name,
        })
        try {
          await axios.post('posts/upload', formData)
        } catch (err) {
          console.log(err)
        }

        this.posts.push(response.data)
        this.isLoading = false
        this.openAddImagePost = false
        this.imageTitle = ''
      }
    },
  },
}
</script>

<style></style>

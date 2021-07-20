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
        v-model="textDescription"
      />
      <span class="input__label">Description</span>
    </label>
    <label class="input">
      <input
        class="input__field"
        type="file"
        @change="onFileChange"
        ref="file"
        name="file"
        accept="image/*"
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
      <sync-loader :color="color" v-if="isLoading"></sync-loader>
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
      file: null,
      isLoading: false,
      color: 'pink',
      openAddPost: true,
      textDescription: '',
      fillError: false,
    }
  },
  methods: {
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.file = file
    },
    async addImagePost() {
      this.$store.dispatch('fetchUser')
      const currentUser = this.$store.state.user._id
      this.user = this.$store.state.user

      const formData = new FormData()
      formData.append('file', this.file)

      if (this.file === null || this.textDescription === '') {
        this.fillError = true
      } else {
        this.isLoading = true

        const response = await axios.post('posts/', {
          isImagePost: true,
          displayName: this.user.displayName,
          userId: currentUser,
          file: this.file.name,
          description: this.textDescription,
        })
        try {
          await axios.post('posts/upload', formData)
        } catch (err) {
          console.log(err)
        }

        this.posts.push(response.data)
        this.isLoading = false
        this.textDescription = ''
        this.openAddPost = false
      }
    },
  },
}
</script>

<style></style>

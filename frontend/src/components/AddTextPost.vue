<template>
  <form class="add-post" @submit.prevent="addTextPost" v-if="openAddPost">
    <h2 class="add-post__title">
      Add a Text Post
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
    <span class="input__label warn" v-if="fillError"
      >Please fill in all fields</span
    >
    <div class="options">
      <button class="btn-addpost" type="submit" v-if="!isLoading">
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
  name: 'AddTextPost',
  components: {
    SyncLoader,
  },
  data() {
    return {
      posts: [],
      user: [],
      textDescription: '',
      openAddPost: true,
      fillError: false,
      isLoading: false,
      color: 'pink',
    }
  },
  methods: {
    async addTextPost() {
      const response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      const currentUser = response.data.user._id

      if (this.textDescription === '') {
        this.fillError = true
      } else {
        this.isLoading = true

        const responseUsers = await axios.get('users/' + currentUser)
        this.user = responseUsers.data

        const response = await axios.post('posts/', {
          description: this.textDescription,
          isTextPost: true,
          userId: currentUser,
          displayName: this.user.displayName,
        })

        this.posts.push(response.data)
        this.textDescription = ''
        this.openAddTextPost = false
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss">
@keyframes slide {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -120px 60px;
  }
}

.add-post {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 3rem;
  border: 3px solid black;
  border-radius: 5px;
  background: white;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  &__title {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}

.description {
  font-size: 1.1rem;
  margin-bottom: 1.6rem;
  margin-top: 0;
}
.btn-addpost {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  background: white;
  padding: 0.3rem 3.4rem;
  border: 3px solid black;
  margin-right: 2.6rem;
  box-shadow: 0 0 0 black;
  transition: all 0.2s;
}

.btn-addpost:last-child {
  margin: 0;
}

.btn-addpost:hover {
  box-shadow: 0.4rem 0.4rem 0 black;
  transform: translate(-0.4rem, -0.4rem);
}

.btn-addpost:active {
  box-shadow: 0 0 0 black;
  transform: translate(0, 0);
}

.options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input {
  position: relative;

  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * 0.5);
    margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * 0.5);
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }
  &__field {
    box-sizing: border-box;
    display: block;
    width: 300px;
    border: 3px solid currentColor;
    padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
    color: currentColor;
    background: transparent;
    border-radius: var(--size-radius);
    margin-bottom: 1rem;

    &:focus,
    &:not(:placeholder-shown) {
      & + .input__label {
        transform: translate(0.25rem, -90%) scale(0.8);
        color: var(--pink);
      }
    }
  }
}

.warn {
  color: var(--red);
}
</style>

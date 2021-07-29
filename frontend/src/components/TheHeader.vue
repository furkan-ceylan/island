<template>
  <header>
    <div class="header">
      <div class="header__left">
        <img class="header__logo" src="../assets/logo.png" />
        <i class="material-icons">home</i>
      </div>
      <div class="header__main">
        <h2 class="header__main-text">{{ $route.name }}</h2>
        <div class="header__main-right">
          <div class="header__main-right-search">
            <input type="text" placeholder="Search" />
            <i class="material-icons">search</i>
          </div>
          <button
            @click="
              ;(openAddTextPost = !openAddTextPost), (openAddImagePost = false)
            "
            class="btn btn-textadd"
          >
            Add a Text Post
          </button>
          <button
            @click="
              ;(openAddImagePost = !openAddImagePost), (openAddTextPost = false)
            "
            class="btn btn-imageadd"
          >
            Add an Image Post
          </button>
        </div>
      </div>
      <div class="header__user">
        <label class="header__user-username">{{ user.displayName }}</label>
        <img
          v-if="user.profilePicture"
          class="image-post__img"
          :src="`http://localhost:3000/uploads/user/${user.profilePicture}`"
        />
        <img
          v-else
          class="image-post__img"
          src="../assets/defaultProfile.png"
        />
        <button @click="logout" class="btn btn-logout">
          Logout
        </button>
      </div>
    </div>
    <AddTextPost v-if="openAddTextPost" :id="currentUser" />
    <AddImagePost v-if="openAddImagePost" :id="currentUser" />
  </header>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import AddTextPost from '@/components/AddTextPost'
import AddImagePost from '@/components/AddImagePost'

export default {
  name: 'TheHeader',
  components: {
    SyncLoader,
    AddTextPost,
    AddImagePost,
  },
  props: ['currentUser'],
  data() {
    return {
      posts: [],
      openAddImagePost: false,
      openAddTextPost: false,
      username: '',
      profilePicture: '',
      id: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
  async mounted() {
    this.$store.dispatch('fetchUser')
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  position: fixed;
  z-index: 9999;
  width: 95%;
  height: 65px;
  background-color: #fffaf9;
}

.header__left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15%;
}

.header__logo {
  width: 120px;
}

.header__left i {
  margin-left: auto;
  right: 0;
  border-bottom: 2px solid var(--pink);
}

.header__main {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__main-text {
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 2.3rem;
}

.header__main-right {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header__main-right-search {
  background-color: white;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__main-right input {
  height: 30px;
  border-radius: 5px;
  padding-left: 5px;
}

.header__main-right i {
  height: 30px;
  border-radius: 7px;
}

.header__main-right button {
  width: 120px;
  font-weight: 600;
  font-size: 0.75em;
  margin-top: 0.7rem;
}

.header__user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
}

.header__user-username {
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 0.5em;
}

.header__user-image {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.btn {
  margin-left: 1rem;
}

.btn-textadd {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--orange);
}

.btn-textadd:hover {
  background-color: #eba12a;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.btn-imageadd {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--purple);
}

.btn-imageadd:hover {
  background-color: #5863c8;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.btn-logout {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--red);
}

.btn-logout:hover {
  background-color: #e64e49;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.image-post__img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>

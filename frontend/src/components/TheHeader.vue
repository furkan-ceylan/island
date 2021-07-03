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
        <label class="header__user-username">username</label>
        <img
          class="header__user-image"
          src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        />
      </div>
    </div>
    <div class="add-post" v-if="openAddTextPost">
      <h2 class="add-post__title">
        Add a Text Post
      </h2>
      <label class="input">
        <input
          class="input__field"
          type="text"
          placeholder=" "
          v-model="textTitle"
        />
        <span class="input__label">Title</span>
      </label>
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
        <button class="btn-addpost" @click="addTextPost">Add</button>
        <button @click="openAddTextPost = !openAddTextPost" class="btn-addpost">
          Close
        </button>
      </div>
    </div>
    <div class="add-post" v-if="openAddImagePost">
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
          accept="image/*"
          placeholder=" "
          @change="onFileChange"
        />
        <span class="input__label">Image</span>
      </label>
      <span class="input__label warn" v-if="fillError"
        >Please fill in all fields</span
      >
      <div class="options">
        <button class="btn-addpost" @click.prevent="addImagePost()">Add</button>
        <button
          @click="openAddImagePost = !openAddImagePost"
          class="btn-addpost"
        >
          Close
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheHeader',
  data() {
    return {
      posts: [],
      user: [],
      textTitle: '',
      imageTitle: '',
      textDescription: '',
      image: '',
      isTextPost: false,
      isImagePost: false,
      openAddTextPost: false,
      openAddImagePost: false,
      fillError: false,
    }
  },
  methods: {
    async addTextPost() {
      const currentUser = '60df466844d54d0adc94f75e'

      if (this.textDescription === '' || this.textTitle === '') {
        this.fillError = true
      } else {
        const responseUsers = await axios.get(
          'http://localhost:3000/api/users/' + currentUser
        )
        this.user = responseUsers.data

        const response = await axios.post('http://localhost:3000/api/posts/', {
          description: this.textDescription,
          title: this.textTitle,
          isTextPost: true,
          userId: '60df466844d54d0adc94f75e',
          displayName: this.user.displayName,
        })

        this.posts.push(response.data)
        this.textDescription = ''
        this.textTitle = ''
        this.openAddTextPost = false
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      const image = new Image()
      const reader = new FileReader()

      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async addImagePost() {
      if (this.imageTitle === '' || this.image === '') {
        this.fillError = true
      } else {
        const response = await axios.post('http://localhost:3000/api/posts/', {
          title: this.imageTitle,
          isTextPost: true,
          userId: '60df467d44d54d0adc94f760',
        })
        this.posts.push(response.data)
        this.imageTitle = ''
      }
    },
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
  background-color: var(--lightest);
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
}

.btn-textadd:hover {
  background-color: #e64e49;
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

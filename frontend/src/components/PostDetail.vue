<template>
  <div class="post-detail">
    <div class="timeline__text-post">
      <div class="main-post">
        <img
          src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        />
        <div class="text-post__user-post">
          <a>{{ posts.displayName }}</a>
          <p class="text-post__content">
            {{ posts.description }}
          </p>
        </div>
      </div>
      <div class="comments">
        <div class="comment" v-for="comment in comments" :key="comment._id">
          <img
            src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
          />
          <div class="text-post__user-post">
            <a>{{ comment.displayName }}</a>
            <p class="text-post__content">
              {{ comment.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <button @click="openAddComment = !openAddComment" class="btn btn-textadd">
      Add a Comment
    </button>
    <div class="add-post" v-if="openAddComment">
      <h2 class="add-post__title">
        Add a Comment
      </h2>
      <label class="input">
        <input
          class="input__field"
          type="text"
          placeholder=" "
          v-model="commentModel"
        />
        <span class="input__label">Comment</span>
      </label>
      <span class="input__label warn" v-if="fillError"
        >Please fill in all fields
      </span>
      <div class="options">
        <button class="btn-addpost" @click="addComment">Add</button>
        <button @click="openAddComment = !openAddComment" class="btn-addpost">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostDetail',
  props: ['id'],
  data() {
    return {
      posts: [],
      comments: [],
      user: [],
      commentModel: '',
      openAddComment: false,
      fillError: false,
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/api/auth/user', {
      headers: { token: localStorage.getItem('token') },
    })
    const currentUser = response.data.user._id

    const responseUser = await axios.get(
      'http://localhost:3000/api/users/' + currentUser
    )
    this.user = responseUser.data

    const responsePost = await axios.get(
      'http://localhost:3000/api/posts/' + this.id
    )
    this.posts = responsePost.data

    const responseComment = await axios.get(
      'http://localhost:3000/api/posts/' + this.id + '/comments'
    )
    this.comments = responseComment.data

    console.log(responseComment.data)
  },
  methods: {
    async addComment() {
      const responseId = await axios.get(
        'http://localhost:3000/api/auth/user',
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      const currentUser = responseId.data.user._id

      const responseUser = await axios.get(
        'http://localhost:3000/api/users/' + currentUser
      )
      this.user = responseUser.data

      if (this.commentModel === '') {
        this.fillError = true
      } else {
        const response = await axios.put(
          'http://localhost:3000/api/posts/' + this.id + '/comment',
          {
            comment: this.commentModel,
            userId: currentUser,
            postId: this.id,
            displayName: this.user.displayName,
          }
        )
        this.comments.push(response.data)
        this.commentModel = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.post-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.timeline__text-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.timeline__text-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
}

.timeline__text-post img {
  width: 54px;
  height: 54px;
  border-radius: 35%;
  margin-right: 1rem;
}

.text-post__user-post a {
  font-weight: bold;
  font-size: 0.9rem;
}

.text-post__content {
  font-size: 0.75rem;
}

.main-post {
  display: flex;
}

.comments {
  margin-top: 1rem;
  margin-left: 1.5rem;
}

.comment {
  margin-top: 1rem;
  display: flex;
}

.btn-textadd {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--green);
  width: 8rem;
  font-size: 0.85rem;
  right: 0;
  margin-left: auto;
}

.btn-textadd:hover {
  background-color: #59b956;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.add-post {
  position: absolute;
  left: 50%;
  top: 25%;
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

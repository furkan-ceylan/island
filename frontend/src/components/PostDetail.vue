<template>
  <div class="post-detail">
    <div class="timeline__text-post">
      <Skeletor circle size="50" class="skeletor" v-if="isSkeletorLoading" />
      <Skeletor
        v-if="isSkeletorLoading"
        class="skeletor"
        width="600"
        height="20"
      />
      <Skeletor
        v-if="isSkeletorLoading"
        class="skeletor"
        width="600"
        height="300"
      />
      <div class="main-post" v-else>
        <ProfileImage :id="posts.userId" class="text-post__img" />
        <div class="text-post__user-post" v-if="posts.isTextPost">
          <PostDisplayName :id="posts.userId" />
          <p class="text-post__content">
            {{ posts.description }}
          </p>
        </div>
        <div class="image-post__user-post" v-else>
          <PostDisplayName :id="posts.userId" />
          <img
            v-if="posts.file"
            class="image-post__img"
            :src="`http://localhost:3000/uploads/${posts.file}`"
          />
        </div>
      </div>
      <div class="comments">
        <div class="comment" v-for="comment in comments" :key="comment._id">
          <ProfileImage :id="comment.userId" class="text-post__img" />
          <div class="text-post__user-post" v-if="comment.isTextComment">
            <PostDisplayName :id="comment.userId" />
            <p class="text-post__content">
              {{ comment.comment }}
            </p>
          </div>
          <div class="image-post__user-post" v-else>
            <PostDisplayName :id="comment.userId" />
            <img
              v-if="comment.file"
              class="image-post__img"
              :src="`http://localhost:3000/uploads/${comment.file}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comment-buttons">
      <button @click="openAddComment = !openAddComment" class="btn btn-textadd">
        Add a Text Comment
      </button>
      <button
        @click="
          ;(openAddImageComment = !openAddImageComment),
            (openAddComment = false)
        "
        class="btn btn-textadd"
      >
        Add an Image Comment
      </button>
    </div>
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
          data-test="comment"
        />
        <span class="input__label">Comment</span>
      </label>
      <span class="input__label warn" v-if="fillError"
        >Please fill in all fields
      </span>
      <div class="options">
        <button
          class="btn-addpost"
          id="btn-comment"
          type="button"
          @click="addComment"
          v-if="!isLoading"
        >
          Add
        </button>
        <sync-loader :color="color" v-if="isLoading"></sync-loader>
        <button
          @click="openAddComment = !openAddComment"
          class="btn-addpost"
          v-if="!isLoading"
        >
          Close
        </button>
      </div>
    </div>
    <form
      class="add-post"
      @submit.prevent="addImageComment"
      v-if="openAddImageComment"
      enctype="multipart/form-data"
    >
      <h2 class="add-post__title">
        Add an Image Comment
      </h2>
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
        <sync-loader :color="color" v-if="isLoading"></sync-loader>
        <button
          @click="openAddImageComment = !openAddImageComment"
          class="btn-addpost"
          v-if="!isLoading"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ProfileImage from '@/components/ProfileImage'
import PostDisplayName from '@/components/PostDisplayName'
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import { Skeletor } from 'vue-skeletor'
import { createToast } from 'mosha-vue-toastify'

export default {
  name: 'PostDetail',
  props: ['id'],
  components: { ProfileImage, SyncLoader, Skeletor, PostDisplayName },
  data() {
    return {
      posts: [],
      comments: [],
      user: [],
      commentModel: '',
      openAddComment: false,
      openAddImageComment: false,
      fillError: false,
      file: '',
      isTextComment: false,
      userId: '',
      isLoading: false,
      isSkeletorLoading: false,
      color: 'pink',
      commentingSuccess: '',
    }
  },
  async created() {
    this.isSkeletorLoading = true

    this.$store.dispatch('fetchUser')
    this.user = this.$store.state.user

    const responsePost = await axios.get('posts/' + this.id)
    this.posts = responsePost.data

    const responseComment = await axios.get('posts/' + this.id + '/comments')
    this.comments = responseComment.data

    this.isSkeletorLoading = false
  },
  methods: {
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.file = file
    },
    async addComment() {
      if (this.commentModel === '') {
        this.fillError = true
      } else {
        this.isLoading = true

        const response = await axios.put('posts/' + this.id + '/comment', {
          comment: this.commentModel,
          userId: this.$store.state.user._id,
          postId: this.id,
          displayName: this.user.displayName,
          isTextComment: true,
        })
        this.comments.push(response.data)
        this.commentModel = ''
        this.isLoading = false
        this.openAddComment = false
        this.commentingSuccess = 'Your comment was successfully added!'
        createToast(
          {
            title: this.commentingSuccess,
          },
          {
            type: 'success',
            showIcon: true,
          }
        )
      }
    },
    async addImageComment() {
      const formData = new FormData()
      formData.append('file', this.file)

      if (!this.file) {
        this.fillError = true
      } else {
        this.isLoading = true

        const response = await axios.put('posts/' + this.id + '/comment', {
          userId: this.$store.state.user._id,
          postId: this.id,
          displayName: this.user.displayName,
          file: this.file.name,
          isTextComment: false,
        })
        this.comments.push(response.data)
        try {
          await axios.post('posts/upload', formData)
        } catch (err) {
          console.log(err)
        }
        this.isLoading = false
        this.openAddImageComment = false
        this.commentingSuccess = 'Your comment was successfully added!'
        createToast(
          {
            title: this.commentingSuccess,
          },
          {
            type: 'success',
            showIcon: true,
          }
        )
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
  font-size: 1rem;
}

.text-post__content {
  font-size: 0.9rem;
}

.main-post {
  display: flex;
}

.comments {
  margin-top: 1rem;
  margin-left: 2rem;
}

.comment {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 35px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.btn-textadd {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--green);
  width: 8rem;
  font-size: 0.85rem;
  margin-right: 1rem;
}

.btn-textadd:hover {
  background-color: #59b956;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.add-post {
  position: fixed;
  left: 50%;
  top: 40%;
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

.image-post__user-post {
  display: flex;
  flex-direction: column;
}

.image-post__user-post a {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.image-post__avatar {
  width: 54px;
  height: 54px;
  border-radius: 35%;
  margin-right: 1rem;
}

.image-post__user-post img {
  width: 500px;
  height: 100%;
  border-radius: 7px;
  max-height: 350px;
  object-fit: cover;
}

.comment-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>

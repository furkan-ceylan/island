<template>
  <div class="user-posts">
    <Skeletor circle size="50" class="skeletor" v-if="isSkeletorLoading" />
    <Skeletor
      v-if="isSkeletorLoading"
      class="skeletor"
      width="600"
      height="100"
    />
    <Skeletor circle size="50" class="skeletor" v-if="isSkeletorLoading" />
    <Skeletor
      v-if="isSkeletorLoading"
      class="skeletor"
      width="600"
      height="100"
    />
    <div
      class="user-posts__text-post"
      v-for="post in posts"
      :key="post._id"
      v-else
    >
      <router-link
        :to="{
          name: 'PostDetail',
          params: {
            id: post._id,
          },
        }"
      >
        <div class="text-post" v-if="currentUser">
          <img
            v-if="user.profilePicture"
            class="image-post__avatar"
            :src="`http://localhost:3000/uploads/user/${user.profilePicture}`"
          />
          <img
            v-else
            class="image-post__avatar"
            src="../assets/defaultProfile.png"
          />
          <div class="text-post__user-post">
            <div class="user-post-name">
              <a>
                {{ user.displayName }}
              </a>
            </div>
            <p class="text-post__content">
              {{ post.description }}
            </p>
            <img
              class="image-post__img"
              :src="`http://localhost:3000/uploads/${post.file}`"
              v-if="post.file"
            />
          </div>
        </div>
        <div class="text-post" v-else>
          <ProfileImage :id="post.userId" class="image-post__avatar" />
          <div class="text-post__user-post">
            <PostDisplayName :id="post.userId" />
            <p class="text-post__content">
              {{ post.description }}
            </p>
            <img
              class="image-post__img"
              :src="`http://localhost:3000/uploads/${post.file}`"
              v-if="post.file"
            />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Skeletor } from 'vue-skeletor'
import ProfileImage from '@/components/ProfileImage'
import PostDisplayName from '@/components/PostDisplayName'

export default {
  name: 'ProfileUserPosts',
  components: {
    Skeletor,
    PostDisplayName,
    ProfileImage,
  },
  props: ['id'],
  data() {
    return {
      posts: [],
      profilePicture: '',
      userId: '',
      isSkeletorLoading: false,
      currentUser: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  async created() {
    this.isSkeletorLoading = true

    const responsePosts = await axios.get('posts/' + this.id + '/posts')
    this.posts = responsePosts.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt)
    })
    //is current user
    if (this.id === this.user._id) this.currentUser = true
    this.isSkeletorLoading = false
  },
  async mounted() {
    this.$store.dispatch('fetchUser')
  },
}
</script>

<style scoped>
.user-posts {
  width: 800px;
  min-height: 450px;
}

.user-posts__text-post {
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.user-posts__text-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
}

.user-posts__text-post img {
  width: 54px;
  height: 54px;
  border-radius: 35%;
}

.text-post__user-post {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.text-post__user-post a {
  font-weight: bold;
  font-size: 1rem;
}

.text-post__content {
  font-size: 0.9rem;
}

.user-posts__image-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.user-posts__image-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
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
}

.text-post__user-post img {
  width: 500px;
  height: 100%;
  border-radius: 7px;
  max-height: 350px;
  object-fit: cover;
  margin-top: 1rem;
}

.text-post {
  display: flex;
  flex-direction: row;
  width: 750px;
  padding: 1.5rem;
}

.skeletor {
  margin-top: 1rem;
}
</style>

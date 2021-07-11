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
        <div class="text-post">
          <ProfileImage :id="post.userId" class="image-post__avatar" />
          <div class="text-post__user-post">
            <a>{{ post.displayName }}</a>
            <p class="text-post__content" v-if="post.isTextPost">
              {{ post.description }}
            </p>
            <img
              class="image-post__img"
              :src="`http://localhost:3000/uploads/${post.file}`"
              v-else
            />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProfileImage from '@/components/ProfileImage'
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'

export default {
  name: 'ProfileUserPosts',
  components: {
    ProfileImage,
    Skeletor,
  },
  props: ['id'],
  data() {
    return {
      posts: [],
      user: [],
      profilePicture: '',
      userId: '',
      isSkeletorLoading: false,
    }
  },
  async mounted() {
    this.isSkeletorLoading = true

    const responsePosts = await axios.get('posts/' + this.id + '/posts')
    this.posts = responsePosts.data

    const responseUser = await axios.get('users/' + this.userId)
    this.user = responseUser.data
    this.isSkeletorLoading = false
  },
}
</script>

<style scoped>
.user-posts {
  width: 800px;
  min-height: 450px;
}

.user-posts__text-post {
  padding: 1.5rem;
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
}

.skeletor {
  margin-top: 1rem;
}
</style>

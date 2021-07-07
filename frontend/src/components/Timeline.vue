<template>
  <div class="timeline">
    <div class="timeline__text-post" v-for="post in posts" :key="post._id">
      <router-link
        :to="{
          name: 'PostDetail',
          params: {
            id: post._id,
          },
        }"
      >
        <div class="text-post">
          <img
            src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
          />
          <div class="text-post__user-post">
            <a>{{ post.displayName }}</a>
            <p class="text-post__content">
              {{ post.description }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="timeline__image-post">
      <img
        src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        class="image-post__avatar"
      />
      <div class="image-post__user-post">
        <a>username</a>
        <img
          class="image-post__img"
          src="http://seattlemag.com/sites/default/files/field/image/views%20lead%20780%20x%20505.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Timeline',
  data() {
    return {
      posts: [],
      users: [],
      description: '',
      img: '',
      displayName: '',
      isTextPost: false,
      isImagePost: false,
    }
  },
  async mounted() {
    const responseId = await axios.get('http://localhost:3000/api/auth/user', {
      headers: { token: localStorage.getItem('token') },
    })
    const currentUser = responseId.data.user._id

    const responsePost = await axios.get(
      'http://localhost:3000/api/posts/timeline/' + currentUser
    )
    this.posts = responsePost.data

    const responseUsers = await axios.get('http://localhost:3000/api/users/')
    this.users = responseUsers.data
  },
}
</script>

<style scoped>
.timeline {
  width: 100%;
  height: 100%;
}

.timeline__text-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
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

.text-post {
  display: flex;
  justify-content: flex-start;
  width: 700px;
}

.text-post__user-post a {
  font-weight: bold;
  font-size: 0.9rem;
}

.text-post__content {
  font-size: 0.75rem;
}

.timeline__image-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.timeline__image-post:hover {
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
  margin-right: 1rem;
}

.image-post__user-post img {
  width: 100%;
  height: 100%;
  margin-right: 1rem;
  border-radius: 7px;
  max-height: 350px;
}
</style>

<template>
  <div class="profile">
    <div class="profile-info">
      <div class="profile-avatar">
        <img
          src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        />
      </div>
      <div class="profile__detail">
        <div class="detail__user">
          <div class="detail__user-top">
            <a class="user-top__name">{{ user.displayName }}</a>
            <div class="user-top__birth">
              <a>Birth Date:</a>
              <span>{{ user.birthDate }}</span>
            </div>
            <div class="user-follow">
              <div class="user-top__birth">
                <a>Followers:</a>
                <span>{{ followers }}</span>
              </div>
              <div class="user-top__birth">
                <a>Following:</a>
                <span>{{ following }}</span>
              </div>
            </div>
          </div>
          <div class="detail__user-bot"></div>
        </div>
      </div>
    </div>
    <div class="profile-desc">
      <h5>About Me</h5>
      <p class="detail__content">
        {{ user.description }}
      </p>
      <h5 class="detail__hobbies">My Hobbies</h5>
      <p class="detail__content">
        {{ user.hobbies }}
      </p>
    </div>
    <div class="profile-posts">
      <h3>Posts</h3>
      <UserPosts :id="id" />
    </div>
  </div>
</template>

<script>
import UserPosts from '@/components/UserPosts'
import axios from 'axios'

export default {
  name: 'ProfileDetail',
  props: ['id'],
  components: { UserPosts },
  data() {
    return {
      user: [],
      followers: '',
      following: '',
    }
  },
  async mounted() {
    const responseUser = await axios.get(
      'http://localhost:3000/api/users/' + this.id
    )
    this.user = responseUser.data
    this.followers = this.user.followers.length
    this.following = this.user.followings.length
  },
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.profile-info {
  display: flex;
  align-items: center;
  position: relative;
}

.profile__detail {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 300px;
  height: 70px;
  left: 7.8rem;
  top: 1.2rem;
}

.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: white;
  z-index: 1;
}

.profile img {
  width: 108px;
  height: 108px;
  border-radius: 100%;
  background-color: white;
}

.detail__user a {
  font-weight: bold;
  padding-left: 1.5rem;
}

.user-top__name {
  font-size: 1.2rem;
}

.user-top__birth {
  margin-top: 0.25rem;
}

.user-top__birth span {
  margin-left: 0.5rem;
}

.user-follow {
  display: flex;
}

.detail__content {
  font-size: 0.75rem;
  margin-top: 0.5em;
}

.profile-desc {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  border-radius: 0.3rem;
  margin-top: 1rem;
  padding: 1rem;
}

.detail__hobbies {
  margin-top: 1rem;
}

.profile-posts {
  margin-top: 2rem;
}

.profile-posts h3 {
  margin-bottom: 1rem;
}
</style>

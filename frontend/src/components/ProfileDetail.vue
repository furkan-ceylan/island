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
            <a class="user-top__name">username</a>
            <div class="user-top__birth">
              <a>Birth Date:</a>
              <span>11/10/1990</span>
            </div>
          </div>
          <div class="detail__user-bot"></div>
        </div>
      </div>
    </div>
    <div class="profile-desc">
      <h5>About Me</h5>
      <p class="detail__content">
        Hello there, my name is John. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nulla sapiente maxime velit architecto corporis ut at
        pariatur.
      </p>
      <h5 class="detail__hobbies">My Hobbies</h5>
      <p class="detail__content">
        Hello there, my name is John. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nulla sapiente maxime velit architecto corporis ut at
        pariatur.
      </p>
    </div>
    <div class="profile-posts">
      <h3>Posts</h3>
      <UserPosts />
    </div>
  </div>
</template>

<script>
import UserPosts from '@/components/UserPosts'

export default {
  name: 'ProfileDetail',
  components: { UserPosts },
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

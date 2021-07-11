<template>
  <div class="profile">
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
    <div class="profile-all" v-else>
      <div class="profile-info">
        <div class="profile-avatar">
          <img
            class="image-post__img"
            v-if="user"
            :src="`http://localhost:3000/uploads/user/${user.profilePicture}`"
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
                <div class="user-top__birth" v-if="!isFollowing">
                  <button class="btn btn-imageadd" @click="followUser">
                    Follow
                  </button>
                </div>
                <div class="user-top__birth" v-else>
                  <button class="btn btn-unfollow" @click="unFollowUser">
                    Unfollow
                  </button>
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
        <ProfileUserPosts :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileUserPosts from '@/components/ProfileUserPosts'
import axios from 'axios'
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'

export default {
  name: 'ProfileDetail',
  props: ['id'],
  components: { ProfileUserPosts, Skeletor },
  data() {
    return {
      user: [],
      followers: '',
      following: '',
      isFollowing: true,
      isSkeletorLoading: false,
    }
  },
  async mounted() {
    this.isSkeletorLoading = true

    const responseUser = await axios.get('users/' + this.id)

    const response = await axios.get('auth/user', {
      headers: { token: localStorage.getItem('token') },
    })
    const currentUser = response.data.user._id

    const userData = responseUser.data
    this.user = userData
    this.followers = userData.followers.length
    this.following = userData.followings.length
    this.isFollowing = userData.followers.includes(currentUser)
    this.isSkeletorLoading = false
  },
  methods: {
    async followUser() {
      const response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      const currentUser = response.data.user._id

      const responseUser = await axios.get('users/' + this.id)

      const userData = responseUser.data

      const profileUser = response.data

      const responseFollow = await axios.put('users/' + this.id + '/follow', {
        userId: currentUser,
      })

      this.isFollowing = !profileUser.user.followers.includes(currentUser)
      this.followers++
      this.following = userData.followings.length
    },
    async unFollowUser() {
      const response = await axios.get('auth/user', {
        headers: { token: localStorage.getItem('token') },
      })
      const currentUser = response.data.user._id

      const responseUser = await axios.get('users/' + this.id)
      const userData = responseUser.data

      const profileUser = response.data

      const responseunFollow = await axios.put(
        'users/' + this.id + '/unfollow',
        {
          userId: currentUser,
        }
      )
      this.isFollowing = profileUser.user.followers.includes(currentUser)
      this.followers--
      this.following = userData.followings.length
    },
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
  width: 350px;
  height: 80px;
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

.btn-imageadd {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--green);
  margin-left: 2rem;
}

.btn-imageadd:hover {
  background-color: #6dc271;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.btn-unfollow {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--red);
  margin-left: 2rem;
}

.btn-unfollow:hover {
  background-color: #e64e49;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}
</style>

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
            v-if="user.profilePicture"
            :src="`http://localhost:3000/uploads/user/${user.profilePicture}`"
          />
          <img
            v-else
            class="image-post__img"
            src="../assets/defaultProfile.png"
          />
        </div>
        <div class="profile__detail">
          <div class="detail__user">
            <div class="detail__user-top">
              <a class="user-top__name">{{ user.displayName }}</a>
              <div class="user-top__birth">
                <a v-if="user.birthDate">Birth Date:</a>
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
                <div class="user-functions" v-if="!currentUser">
                  <div class="user-top__birth" v-if="!isFollowing">
                    <div class="add-button-wrapper" v-if="!followLoading">
                      <button class="btn" id="btnFollow" @click="followUser">
                        Follow
                      </button>
                    </div>
                    <div class="add-button-loader" v-else>
                      <SyncLoader class="follow-loader" :color="color" />
                    </div>
                  </div>
                  <div class="user-top__birth" v-else>
                    <div class="add-button-wrapper" v-if="!followLoading">
                      <button
                        class="btn btn-unfollow"
                        id="btnUnfollow"
                        @click="unFollowUser"
                      >
                        Unfollow
                      </button>
                    </div>
                    <div class="add-button-loader" v-else>
                      <SyncLoader class="follow-loader" :color="color" />
                    </div>
                  </div>
                </div>
                <div class="user-edit-profile" v-else>
                  <button
                    class="btn edit-profile"
                    @click="openEditProfile = !openEditProfile"
                  >
                    Edit Profile
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
      <ProfileEdit
        @updateUser="updateUser($event)"
        v-if="openEditProfile"
        :id="id"
      />
    </div>
  </div>
</template>

<script>
import ProfileUserPosts from '@/components/ProfileUserPosts'
import ProfileEdit from '@/components/ProfileEdit'
import axios from 'axios'
import { Skeletor } from 'vue-skeletor'
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: 'ProfileDetail',
  props: ['id'],
  components: { ProfileUserPosts, Skeletor, SyncLoader, ProfileEdit },
  data() {
    return {
      user: [],
      color: 'pink',
      followers: 0,
      following: 0,
      isFollowing: false,
      isSkeletorLoading: false,
      followLoading: false,
      currentUser: false,
      openEditProfile: false,
    }
  },
  async created() {
    this.isSkeletorLoading = true

    const responseUser = await axios.get('users/' + this.id)

    this.$store.dispatch('fetchUser')
    const currentUser = this.$store.state.user._id

    const userData = responseUser.data
    if (currentUser === userData._id) this.currentUser = true
    this.user = userData
    this.followers = userData.followers.length
    this.following = userData.followings.length
    this.isFollowing = userData.followers.includes(currentUser)
    this.isSkeletorLoading = false
  },
  methods: {
    async followUser() {
      this.followLoading = true
      this.followers++

      const currentUser = this.$store.state.user._id
      const responseUser = await axios.get('users/' + this.id)
      const userData = responseUser.data
      const profileUser = this.$store.state.user

      const responseFollow = await axios.put('users/' + this.id + '/follow', {
        userId: currentUser,
      })
      this.followLoading = false
      this.isFollowing = !profileUser.followers.includes(currentUser)
      this.following = userData.followings.length
    },
    async unFollowUser() {
      this.followLoading = true
      this.followers--

      const currentUser = this.$store.state.user._id
      const responseUser = await axios.get('users/' + this.id)
      const userData = responseUser.data
      const profileUser = this.$store.state.user

      const responseUnFollow = await axios.put(
        'users/' + this.id + '/unfollow',
        {
          userId: currentUser,
        }
      )
      this.followLoading = false
      this.isFollowing = profileUser.followers.includes(currentUser)
      this.following = userData.followings.length
    },
    updateUser(user) {
      this.user = user || []
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
  width: 360px;
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

.btn {
  transform: translate(0, 3px);
  transition: 0.4s;
  background-color: var(--green);
  margin-left: 2rem;
}

.btn:hover {
  background-color: #6dc271;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.edit-profile {
  width: 100px;
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

.follow-loader {
  margin-left: 3rem;
}
</style>

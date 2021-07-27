<template>
  <div class="right-sidebar">
    <div class="friends">
      <h4 class="friends-title">People</h4>
      <Skeletor circle size="50" v-if="isLoading" />
      <Skeletor v-if="isLoading" class="skeleton" width="150" height="20" />
      <Skeletor circle size="50" v-if="isLoading" />
      <Skeletor v-if="isLoading" class="skeleton" width="150" height="20" />
      <Skeletor circle size="50" v-if="isLoading" />
      <Skeletor v-if="isLoading" class="skeleton" width="150" height="20" />
      <div
        class="friend"
        v-for="profileUser in users"
        :key="profileUser._id"
        v-else
      >
        <router-link :to="`/profile/${profileUser._id}`">
          <div class="friend-info">
            <img
              v-if="profileUser.profilePicture"
              class="image-post__img"
              :src="`http://localhost:3000/uploads/user/${profileUser.profilePicture}`"
            />
            <img
              v-else
              class="image-post__img"
              src="../assets/defaultProfile.png"
            />
            <label>{{ profileUser.displayName }}</label>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Skeletor } from 'vue-skeletor'

export default {
  name: 'SidebarRight',
  components: { Skeletor },
  data() {
    return {
      users: [],
      isLoading: false,
    }
  },
  async created() {
    this.isLoading = true
    const responseUsers = await axios.get('users/')
    this.users = responseUsers.data
    this.isLoading = false
  },
}
</script>

<style scoped>
.right-sidebar {
  background-color: var(--light);
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  width: 17%;
  height: 650px;
  margin-left: 1rem;
  margin-top: 5rem;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
}
.friends {
  padding: 1rem;
  margin-top: 1rem;
}

.friends-title {
  margin-bottom: 1rem;
}

.friend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5em;
  margin-bottom: 1em;
}

.friend img {
  width: 35px;
  border-radius: 30%;
}

.friend label {
  margin-left: 1em;
  font-size: 0.85em;
  font-weight: 500;
}

.online {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: var(--green);
  margin-left: 1em;
}

.image-post__img {
  width: 35px;
  height: 35px;
  border-radius: 100%;
}

.skeleton {
  margin-left: 3rem;
}
</style>

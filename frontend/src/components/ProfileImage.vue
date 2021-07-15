<template>
  <img
    v-if="profilePicture"
    class="image-post__avatar"
    :src="`http://localhost:3000/uploads/user/${profilePicture}`"
  />
  <img v-else class="image-post__avatar" src="../assets/defaultProfile.png" />
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileImage',
  props: ['id'],
  data() {
    return {
      user: [],
      profilePicture: '',
    }
  },
  async created() {
    const responseUser = await axios.get('users/' + this.id)
    this.user = responseUser.data
    this.profilePicture = this.user.profilePicture
  },
}
</script>

<style scoped>
.image-post__avatar {
  width: 54px;
  height: 54px;
  border-radius: 35%;
}
</style>

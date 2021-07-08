<template>
  <img
    class="image-post__img"
    :src="`http://localhost:3000/uploads/user/${profilePicture}`"
  />
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
  async mounted() {
    const responseUser = await axios.get(
      'http://localhost:3000/api/users/' + this.id
    )
    this.user = responseUser.data
    this.profilePicture = this.user.profilePicture
  },
}
</script>

<style></style>

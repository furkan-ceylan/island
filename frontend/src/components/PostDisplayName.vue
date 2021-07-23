<template>
  <div class="user-post-name">
    <a>
      {{ displayName }}
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostDisplayName',
  props: ['id'],
  data() {
    return {
      user: [],
      displayName: '',
    }
  },
  async created() {
    const responseUser = await axios.get('users/' + this.id)
    this.user = responseUser.data
    this.displayName = this.user.displayName
  },
}
</script>

<style scoped>
.user-post-name {
  font-weight: bold;
  font-size: 1rem;
}
</style>

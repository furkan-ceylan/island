<template>
  <div class="home">
    <TheHeader />
    <div class="home__content">
      <div class="home__left-sidebar">
        <SidebarLeft />
      </div>
      <div class="home__container">
        <Timeline />
      </div>
      <div class="home__right-sidebar">
        <SidebarRight />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarRight from '@/components/SidebarRight'
import SidebarLeft from '@/components/SidebarLeft'
import Timeline from '@/components/Timeline'
import TheHeader from '@/components/TheHeader'
import axios from 'axios'

export default {
  name: 'Home',
  components: { SidebarLeft, SidebarRight, Timeline, TheHeader },
  data() {
    return {
      user: [],
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/api/auth/user', {
      headers: { token: localStorage.getItem('token') },
    })
    this.username = response.data.user.displayName
    console.log(response.data.user)
  },
  computed() {
    this.auth = localStorage.getItem('token')
    console.log(localStorage.getItem('token'))
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped>
.home__content {
  display: grid;
  grid-template-columns: 3fr 10fr 4fr;
  grid-gap: 3.3rem;
}

.home__container {
  border-radius: 2rem;
  position: sticky;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 800px;
  margin-top: 6rem;
}

.home__right-sidebar {
  margin-right: 1rem;
  margin-top: 5rem;
}

.home__left-sidebar {
  margin-top: 5rem;
}
</style>

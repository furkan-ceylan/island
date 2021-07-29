<template>
  <div class="home">
    <TheHeader :currentUser="user._id" />
    <div class="home__content">
      <div class="home__left-sidebar">
        <SidebarLeft :currentUser="user._id" />
      </div>
      <div class="home__container">
        <Timeline />
      </div>
      <div class="home__right-sidebar">
        <SidebarRight />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import SidebarRight from '@/components/SidebarRight'
import SidebarLeft from '@/components/SidebarLeft'
import Timeline from '@/components/Timeline'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'Home',
  components: { SidebarLeft, SidebarRight, Timeline, TheHeader, TheFooter },
  data() {
    return {
      currentUser: this.$store.state.user._id,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.$store.dispatch('fetchUser')
  },
  provide() {
    return {
      id: this.$store.state.user._id,
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
  min-height: 800px;
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

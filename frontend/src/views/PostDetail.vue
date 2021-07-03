<template>
  <div class="home">
    <TheHeader />
    <div class="home__content">
      <div class="home__left-sidebar">
        <LeftSidebar />
      </div>
      <div class="home__container">
        <PostDetail :id="id" />
      </div>
      <div class="home__right-sidebar">
        <RightSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import PostDetail from '@/components/PostDetail'
import TheHeader from '@/components/TheHeader'

export default {
  components: { LeftSidebar, RightSidebar, PostDetail, TheHeader },
  props: ['id'],
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
  margin-top: 5rem;
}

.home__right-sidebar {
  margin-right: 1rem;
  margin-top: 5rem;
}

.home__left-sidebar {
  margin-top: 5rem;
}
</style>

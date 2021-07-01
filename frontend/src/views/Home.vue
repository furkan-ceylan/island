<template>
  <div class="home">
    <div class="home__left-sidebar">
      <LeftSidebar />
    </div>
    <div class="home__container"></div>
    <div class="home__right-sidebar">
      <RightSidebar />
    </div>
  </div>
</template>

<script>
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'

export default {
  name: 'Home',
  components: { LeftSidebar, RightSidebar },
}
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 3fr 10fr 3fr;
  grid-gap: 3.3rem;
}

.home__container {
  background-color: white;
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

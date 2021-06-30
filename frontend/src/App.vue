<template>
  <div id="nav">
    <TheHeader />
    <!-- <router-link to="/">Home</router-link> -->
  </div>
  <router-view />
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'App',
  components: { TheHeader },
}
</script>

<style scoped></style>

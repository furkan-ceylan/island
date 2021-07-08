<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'App',
  components: { TheHeader },
}
</script>

<style scoped></style>

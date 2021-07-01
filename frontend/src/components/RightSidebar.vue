<template>
  <div class="right-sidebar"></div>
</template>

<script>
export default {
  name: 'RightSidebar',
}
</script>

<style scoped>
.right-sidebar {
  background-color: var(--light);
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  width: 17%;
  height: 500px;
  margin-left: 1rem;
  margin-top: 5rem;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
}
</style>

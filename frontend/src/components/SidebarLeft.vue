<template>
  <div class="left-sidebar">
    <nav class="left-sidebar__menu">
      <h4>Menu</h4>
      <div class="left-sidebar__nav">
        <router-link to="/">
          <div v-if="$route.name === 'Home'" class="on-page">
            <span class="material-icons w3-xxlarge">home</span>
            <span class="nav-icon">Home</span>
          </div>
          <div v-else class="not-on-page">
            <span class="material-icons w3-xxlarge nav-icon-not">home</span>
            <span class="nav-icon">Home</span>
          </div>
        </router-link>
        <div v-if="$route.name === 'Profile'" class="on-page">
          <span class="material-icons w3-xxlarge">account_circle</span>
          <span class="nav-icon">Profile</span>
        </div>
        <router-link
          :to="{
            name: 'Profile',
            params: {
              id: currentUser,
            },
          }"
        >
          <div v-if="$route.name != 'Profile'" class="not-on-page">
            <span class="material-icons w3-xxlarge nav-icon-not"
              >account_circle</span
            >
            <span class="nav-icon">Profile</span>
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'Profile',
            params: {
              id: currentUser,
            },
          }"
        >
          <div v-if="$route.name === 'messages'" class="on-page">
            <span class="material-icons w3-xxlarge">message</span>
            <span class="nav-icon">Messages</span>
          </div>
          <div v-else class="not-on-page">
            <span class="material-icons w3-xxlarge nav-icon-not">message</span>
            <span class="nav-icon">Messages</span>
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'Profile',
            params: {
              id: currentUser,
            },
          }"
        >
          <div v-if="$route.name === 'settings'" class="on-page">
            <span class="material-icons w3-xxlarge">settings</span>
            <span class="nav-icon">Settings</span>
          </div>
          <div v-else class="not-on-page">
            <span class="material-icons w3-xxlarge nav-icon-not">settings</span>
            <span class="nav-icon">Settings</span>
          </div>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SidebarLeft',
  props: ['currentUser'],
}
</script>

<style scoped>
.left-sidebar {
  background-color: white;
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  width: 16%;
  height: 650px;
  margin-left: 1rem;
  margin-top: 5rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
}

.left-sidebar__menu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
}

.left-sidebar__menu h4 {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}

.left-sidebar__nav {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.on-page {
  opacity: 1;
  background-color: var(--light);
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.3rem 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.not-on-page {
  opacity: 0.7;
  background-color: none;
  color: rgb(92, 92, 92);
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.3rem 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  transition: 0.3s;
}

.nav-icon {
  margin-left: 1rem;
}

.nav-icon-not {
  color: rgb(92, 92, 92);
}
</style>

<template>
  <div class="right-sidebar">
    <div class="friends">
      <h4 class="friends-title">Friends</h4>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=143" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=165" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=132" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=112" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=125" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
      <div class="friend">
        <div class="friend-info">
          <img src="https://picsum.photos/50/50?random=128" />
          <label>username</label>
        </div>
        <span class="online"></span>
      </div>
    </div>
  </div>
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
.friends {
  padding: 1rem;
  margin-top: 1rem;
}

.friends-title {
  margin-bottom: 1rem;
}

.friend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5em;
  margin-bottom: 1em;
}

.friend img {
  width: 35px;
  border-radius: 30%;
}

.friend label {
  margin-left: 1em;
  font-size: 0.85em;
  font-weight: 500;
}

.online {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: var(--green);
  margin-left: 1em;
}
</style>

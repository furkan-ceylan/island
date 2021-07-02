<template>
  <header>
    <div class="header">
      <div class="header__left">
        <img class="header__logo" src="../assets/logo.png" />
        <i class="material-icons">home</i>
      </div>
      <div class="header__main">
        <h2 class="header__main-text">{{ $route.name }}</h2>
        <div class="header__main-right">
          <div class="header__main-right-search">
            <input type="text" placeholder="Search" />
            <i class="material-icons">search</i>
          </div>
          <button class="btn btn-add">Add a Post</button>
        </div>
      </div>
      <div class="header__user">
        <label class="header__user-username">username</label>
        <img
          class="header__user-image"
          src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        />
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  position: fixed;
  z-index: 9999;
  width: 95%;
  height: 10%;
  background-color: var(--lightest);
}

.header__left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15%;
}

.header__logo {
  width: 120px;
}

.header__left i {
  margin-left: auto;
  right: 0;
  border-bottom: 2px solid var(--pink);
}

.header__main {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__main-text {
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 2.3rem;
}

.header__main-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__main-right-search {
  background-color: white;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__main-right input {
  height: 30px;
  border-radius: 5px;
  padding-left: 5px;
}

.header__main-right i {
  height: 30px;
  border-radius: 7px;
}

.header__main-right button {
  width: 120px;
  font-weight: 600;
  font-size: 0.75em;
  margin-top: 0.7rem;
}

.header__user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
}

.header__user-username {
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 0.5em;
}

.header__user-image {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.btn-add {
  transform: translate(0, 3px);
  transition: 0.4s;
}

.btn-add:hover {
  background-color: #e64e49;
  transition: 0.4s;
  box-shadow: 0px 15px 15px -5px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}
</style>

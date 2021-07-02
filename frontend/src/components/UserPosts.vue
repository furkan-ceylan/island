<template>
  <div class="user-posts">
    <div class="user-posts__text-post">
      <img
        src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
      />
      <div class="text-post__user-post">
        <a>username</a>
        <p class="text-post__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
          accusantium architecto iure soluta quod quam commodi unde sunt
          perspiciatis officiis illum laboriosam voluptate quia nisi atque,
          assumenda eos, maxime accusamus.
        </p>
      </div>
    </div>
    <div class="user-posts__image-post">
      <img
        src="https://png.clipart.me/istock/previews/7063/70633839-person-avatar.jpg"
        class="image-post__avatar"
      />
      <div class="image-post__user-post">
        <a>username</a>
        <img
          class="image-post__img"
          src="http://seattlemag.com/sites/default/files/field/image/views%20lead%20780%20x%20505.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPosts',
}
</script>

<style scoped>
.user-posts {
  width: 100%;
  height: 100%;
}

.user-posts__text-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.user-posts__text-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
}

.user-posts__text-post img {
  width: 54px;
  height: 54px;
  border-radius: 35%;
  margin-right: 1rem;
}

.text-post__user-post a {
  font-weight: bold;
  font-size: 0.9rem;
}

.text-post__content {
  font-size: 0.75rem;
}

.user-posts__image-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.user-posts__image-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
}

.image-post__user-post {
  display: flex;
  flex-direction: column;
}

.image-post__user-post a {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.image-post__avatar {
  width: 54px;
  height: 54px;
  border-radius: 35%;
  margin-right: 1rem;
}

.image-post__user-post img {
  width: 100%;
  height: 100%;
  margin-right: 1rem;
  border-radius: 7px;
  max-height: 350px;
}
</style>

<template>
  <div class="post-detail">
    <div class="timeline__text-post">
      <div class="main-post">
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
      <div class="comments">
        <div class="comment">
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
        <div class="comment">
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
        <div class="comment">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
}
</script>

<style scoped>
.timeline__text-post {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transform: translate(0, 3px);
  transition: 0.4s;
}

.timeline__text-post:hover {
  transition: 0.4s;
  box-shadow: rgb(233, 191, 191) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  transform: translate(0, -3px);
  cursor: pointer;
}

.timeline__text-post img {
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

.comments {
  margin-top: 1rem;
  margin-left: 1.5rem;
}

.comment {
  margin-top: 0.5rem;
}
</style>

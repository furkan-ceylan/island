<template>
  <article class="login">
    <div class="card card--accent">
      <img class="card__logo" src="../../assets/logo.png" />
      <h2 class="card__text">
        Log In to Island Social Platform
      </h2>
      <label class="input">
        <input
          class="input__field"
          type="text"
          placeholder=" "
          v-model="email"
        />
        <span class="input__label">E-mail</span>
      </label>
      <label class="input">
        <input
          class="input__field"
          type="password"
          placeholder=" "
          v-model="password"
        />
        <span class="input__label">Password</span>
      </label>
      <div class="button-group">
        <div class="button-group-left">
          <button @click="login">Login</button>
          <button type="reset">Forgot Password?</button>
        </div>
        <div class="button-group-right">
          <router-link to="/signup"> <button>Sign Up</button></router-link>
        </div>
      </div>
      <p class="warn" v-if="error">
        Please check your email and password
      </p>
    </div>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: false,
    }
  },
  methods: {
    async login() {
      axios.defaults.withCredentials = true

      if (this.email === '' || this.password === '') {
        this.fillError = true
      } else {
        const data = {
          email: this.email,
          password: this.password,
        }
        try {
          const response = await axios.post('auth/login', data)
          if (response.status === 200) {
            this.error = false
            localStorage.setItem('token', response.data.token)
            await this.$router.push('/')
          }
        } catch (err) {
          this.error = true
          this.password = ''
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  background: var(--white);
  padding: calc(4 * var(--size-bezel));
  border-radius: var(--size-radius);
  border: 3px solid var(--color-shadow, currentColor);
  box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);

  &--inverted {
    --color-background: var(--color-dark);
    color: var(--color-light);
    --color-shadow: var(--color-accent);
  }

  &--accent {
    --color-background: var(--color-signal);
    --color-accent: var(--color-light);
    color: var(--color-dark);
  }

  &__logo {
    width: 150px;
    margin-bottom: 1rem;
  }

  *:first-child {
    margin-top: 0;
  }

  &__text {
    margin-bottom: 1rem;
  }
}

.login {
  max-width: 40rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.input {
  position: relative;

  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * 0.5);
    margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * 0.5);
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }
  &__field {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 3px solid currentColor;
    padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
    color: currentColor;
    background: transparent;
    border-radius: var(--size-radius);
    margin-bottom: 1rem;

    &:focus,
    &:not(:placeholder-shown) {
      & + .input__label {
        transform: translate(0.25rem, -65%) scale(0.8);
        color: var(--pink);
      }
    }
  }
}

.button-group {
  margin-top: calc(var(--size-bezel) * 2.5);
  display: flex;
  justify-content: space-between;
}

button {
  color: currentColor;
  padding: var(--size-bezel) calc(var(--size-bezel) * 2);
  background: var(--light);
  border: none;
  border-radius: var(--size-radius);
  font-weight: 900;
}

button + button {
  margin-left: calc(var(--size-bezel) * 2);
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
}

.hidden {
  display: none;
}

.warn {
  color: var(--red);
  margin-top: 1rem;
}
</style>

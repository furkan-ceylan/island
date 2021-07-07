<template>
  <article class="signup">
    <div class="card card--accent">
      <img class="card__logo" src="../../assets/logo.png" />
      <h2 class="card__text">
        Sign Up to Island Social Platform
      </h2>
      <label class="input">
        <input
          class="input__field"
          type="email"
          placeholder=" "
          v-model="email"
          @blur="validateEmail"
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
      <label class="input">
        <input
          class="input__field"
          type="text"
          placeholder=" "
          v-model="displayName"
        />
        <span class="input__label">Display Name</span>
      </label>
      <label class="input">
        <input
          class="input__field"
          type="date"
          placeholder=" "
          v-model="birthDate"
        />
        <span class="input__label">Birth Date</span>
      </label>
      <label class="input">
        <textarea
          class="input__field"
          type="text"
          placeholder=" "
          v-model="description"
        />
        <span class="input__label">About You</span>
      </label>
      <label class="input">
        <input
          class="input__field"
          type="text"
          placeholder=" "
          v-model="hobbies"
        />
        <span class="input__label">Hobbies</span>
      </label>
      <label class="input">
        <input
          class="input__field"
          type="file"
          accept="image/*"
          placeholder=" "
        />
        <span class="input__label">Upload a Profile Picture</span>
      </label>
      <p class="warn" v-if="fillError">
        Please fill in all fields
      </p>
      <p class="warn" v-if="!emailError">
        Please enter a valid email address
      </p>
      <div class="button-group">
        <button @click="signUp" v-if="emailError">Sign Up</button>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      user: [],
      email: '',
      password: '',
      description: '',
      img: '',
      displayName: '',
      birthDate: '',
      hobbies: '',
      fillError: false,
      emailError: false,
    }
  },
  methods: {
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailError = true
      } else {
        this.emailError = false
      }
    },
    async signUp() {
      if (
        this.email === '' ||
        this.password === '' ||
        this.description === '' ||
        this.displayName === '' ||
        this.birthDate === '' ||
        this.hobbies === '' ||
        this.emailError === true
      ) {
        this.fillError = true
      } else {
        this.fillError = false

        const response = await axios.post(
          'http://localhost:3000/api/auth/register',
          {
            email: this.email,
            password: this.password,
            description: this.description,
            displayName: this.displayName,
            birthDate: this.birthDate,
            hobbies: this.hobbies,
          }
        )
        this.user.push(response.data)
        this.email = ''
        this.password = ''
        this.description = ''
        this.displayName = ''
        this.birthDate = ''
        this.hobbies = ''
        await this.$router.push('/login')
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

.signup {
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
}
</style>

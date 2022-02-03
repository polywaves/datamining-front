<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Авторизация</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Пароль</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Еще нет аккаунта? <nuxt-link to="/register">Зарегистрироваться</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification,
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('jwt', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        await this.$router.push('/')
      } catch (e) {
        if (e.response.data.message) {
          this.error = e.response.data.message
        } else {
          this.error = ''

          for (const index in e.response.data) {
            const item = e.response.data[index]

            this.error += item + "\r\n"
          }
        }
      }
    }
  }
}
</script>

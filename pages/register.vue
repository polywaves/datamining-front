<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Регистрация</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">ФИО</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="name"
                  v-model="name"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Наименование клиники</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="clinic"
                  v-model="clinic"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
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
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Зарегистрироваться</button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Уже есть аккаунт? <nuxt-link to="/login">Войти</nuxt-link>
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
      name: '',
      clinic: '',
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('/api/auth/registration', {
          name: this.name,
          clinic: this.clinic,
          email: this.email,
          password: this.password
        })

        await this.$auth.loginWith('jwt', {
          data: {
            email: this.email,
            password: this.password
          },
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

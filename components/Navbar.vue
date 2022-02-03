<template>
  <nav class="navbar is-dark">
    <div class="container is-widescreen">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Калькулятор</nuxt-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
            <nuxt-link class="navbar-link" to="/profile">{{ loggedInUser.email }}</nuxt-link>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logout">Выйти</a>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">Регистрация</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Вход</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  }
}
</script>

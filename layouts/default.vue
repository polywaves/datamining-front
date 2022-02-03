<template>
  <div>
    <Navbar />

    <div class="container is-widescreen">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar
  },
  data () {
    return {
    }
  }
}
</script>

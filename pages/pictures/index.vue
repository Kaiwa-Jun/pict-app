<template>
  <v-app>
      <pictures />
      <v-footer
      :absolute="fixed"
      app
    >
      <div class="bottom-navigation">
        <div class="nav-item">
          <nuxt-link to="/pictures"><img src="/images/home2.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/pictures/create"><img src="/images/plus-square.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link :to="`/users/${currentUser.uid}`"><img src="/images/user.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/users"><img src="/images/users.svg" class="h-6 mt-4"></nuxt-link>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppFooter from '~/components/Footer.vue'
import Pictures from '~/components/Posts.vue'

export default {
  // middleware: 'authenticated',
 components: {
   Pictures
 },
 computed: {
   user () {
     return this.$store.getters['user']
   },
   currentUser () {
      return this.$store.state.user
    },
   isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
 },
 methods: {
   ...mapActions(['signOut'])
 }
}
</script>

<style scoped>
.bottom-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.nav-item {
  width: calc(100% / 4 );
  text-align: center;
}

</style>
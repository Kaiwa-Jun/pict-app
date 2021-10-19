<template>
 <div class="page">
   <Login />
   <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
 </div>
</template>

<script>
import Login from '~/components/Login.vue'
import { mapActions } from 'vuex'

export default {
  // middleware: 'authenticated',
 components: {
   Login: Login,
 },
 computed: {
   user () {
     return this.$store.getters['user']
   },
 },
 methods: {
   ...mapActions(['signOut'])
 }
}
</script>

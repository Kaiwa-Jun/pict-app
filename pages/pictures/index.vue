<template>
  <v-app>
      <pictures />
    <v-footer>
      <app-footer/>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppFooter from '~/components/Footer.vue'
import Pictures from '~/components/Posts.vue'

export default {
 components: {
   AppFooter,
   Pictures
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

<style>

</style>

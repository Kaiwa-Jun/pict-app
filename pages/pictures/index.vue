<template>
  <v-app>
    <v-toolbar>一覧画面</v-toolbar>

<!-- ログイン後にログアウトボタン -->
    <!-- <p v-if="user.login" class="text" >
     <v-btn text @click="signOut">ログアウト</v-btn>
    </p>
   -->
   <app-footer/>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppFooter from '~/components/Footer.vue'

export default {
 components: {
   AppFooter
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

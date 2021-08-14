<template>
  <v-app>
    <v-toolbar>一覧画面</v-toolbar>

<!-- ログイン後にログアウトボタン -->
    <!-- <p v-if="user.login" class="text" >
     <v-btn text @click="signOut">ログアウト</v-btn>
    </p>
   -->
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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

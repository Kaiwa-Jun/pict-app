<template>
 <div class="page">
   <Login />
   <v-footer app>
    <v-row align="center">
      <v-col align="center" class="pr-0 mr-0"><v-btn plain to="/terms">利用規約</v-btn></v-col>
      <v-col align="center"><v-btn plain to="/privacy">プライバシーポリシー</v-btn></v-col>
      <!-- <v-col align="center"><v-btn plain to="/inquirles">お問い合わせ</v-btn></v-col> -->
      <v-col align="center"><span>&copy; {{ new Date().getFullYear() }} PICTREAL</span></v-col>
    </v-row>
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

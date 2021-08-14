<template>
 <div class="page">
   <Login />
   <p v-if="user.login" class="text" >
     ログインに成功！
     <v-btn text @click="signOut">ログアウト</v-btn>
   </p>
 </div>
</template>

<script>
import Login from '~/components/Login.vue'
import { mapActions } from 'vuex'

export default {
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

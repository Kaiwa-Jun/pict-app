<template>
 <div class="register">
   <h1 class="text">
     アカウント登録
   </h1>
   <form class="form" @submit.prevent>
     <label class="label">
       <span class="label">
         email
       </span>
       <input
         class="input"
         type="text"
         v-model="email"
       >
     </label>
     <label class="label">
       <span class="label">
         password
       </span>
       <input
         class="input"
         type="password"
         v-model="password"
       >
     </label>
     <v-btn
       class="button"
       type="submit"
       @click="register"
     >
       Register
     </v-btn>
   </form>
   <v-btn color="primary" to="/">
      ログインはこちら
   </v-btn>
 </div>
</template>

<script>
export default {
 computed: {
   user () {
     return this.$store.getters['user']
   },
 },
 data () {
   return {
     email: '',
     password: '',
   }
 },
 methods: {
   register () {
     this.$store.dispatch('register', {email: this.email, password: this.password})
     this.$router.push('/')
   }
 },
}
</script>

<style>
.input{
  border: solid 1px black;
}
</style>
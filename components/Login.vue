<template>
 <div class="login">
   <p
     v-if="user.login"
     class="text"
   >
     {{ user }}
   </p>
   <form
     v-else
     class="form"
     @submit.prevent
   >
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
       @click="login"
     >
       Login
     </v-btn>

     <v-btn
       class="button"
       type="submit"
       @click="loginGoogle"
    >
       googleでログイン
    </v-btn>
    <v-btn color="primary" to="/register">
      新規登録はこちら
    </v-btn>
   </form>
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
 methods : {
   login (email, password) {
     this.$store.dispatch('login', {email: this.email, password: this.password})
     this.$router.push('/pictures')
   },
   loginGoogle () {
     this.$store.dispatch('loginGoogle')
     this.$router.push('/pictures')
   },

 }
}
</script>

<style>
.input{
  border: solid 1px black;
}
</style>
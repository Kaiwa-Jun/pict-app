<template>
  <div>
  <h1>デモログイン</h1>
    <v-row justify="center">
      <v-col sm="5" md="5">
      <v-card flat>
       <v-card-text class="pa-0">
         <v-form
          ref="login_form"
          v-model="login_valid"
          lazy-validation
         >
           <v-text-field
            v-model="email"
            label="メールアドレス"
            lazy-validation
           />
           <v-text-field
            v-model="password"
            label="パスワード"
            required
            :append-icon="
              show_loginpassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
            "
            :type="
              show_loginpassword
                ? 'text'
                : 'password'
            "
            @click:append="
              show_loginpassword = !show_loginpassword
            "
           />
           <v-row>
             <v-col sm='4'>
                <v-btn
                 :disabled="!login_valid"
                 color="blue darken-3"
                 class="my-4 white--text"
                 @click="login"
                >
                 ログイン
                </v-btn>
             </v-col>
           </v-row>
         </v-form>
       </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data () {
   return {
     email: 'demo@mail.com',
     password: 'abcd1234',
     login_valid: true,
     show_loginpassword:false,
   }
  },
  methods : {
    login (email, password) {
      this.$store.dispatch('login', {email: this.email, password: this.password})
     //  this.$router.push('/pictures') 
    },
  }
}
</script>

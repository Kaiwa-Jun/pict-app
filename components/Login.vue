<template>
 <div class="login">
     
   <v-container>
     <v-row justify="center">
       <v-col sm="5" md="5">
          <v-row class="justify-center">
            <v-btn 
              class="my-15 white--text"
              color="blue darken-3"
              outlined
              block
              @click="toDemo"
            >
              デモログインはこちら
            </v-btn>
          </v-row>

         <h2 class="text-center subtitle-1 font-weight-bold mb-2">
           メールアドレスでログイン
         </h2>
         <v-row>
           <v-col>
             <v-tabs
              v-model="tab"
              background-color="transparent"
              color="blue accent-2"
              grow
              class="mb-3"
              >
               <v-tab to="/login">ログイン</v-tab>
               <v-tab to="/register">アカウント登録</v-tab>
             </v-tabs>

             <v-row>
               <v-col sm="12">
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
                       <v-col sm='8' class="pt-0 pr-0">
                          <v-btn
                           class=""
                           text
                           color="primary"
                           @click="sendPasswordResetEmail"
                          >
                           パスワードの変更はこちら
                          </v-btn>
                       </v-col>
                     </v-row>

                     
                   </v-form>
                 </v-card-text>
               </v-card>
               </v-col>
             </v-row>
             <v-divider class="my-8"/>
               <v-row>
                 <v-col sm="12">
                   <h2 class="text-center subtitle-1 font-weight-bold mb-2">
                     その他のアカウントでログイン
                   </h2>
                 </v-col>
               </v-row>
               <v-alert
                v-if="socialLoginErrorMsg"
                dense
                text
                type="error"
                dismissible
               >
                {{ socialLoginErrorMsg }} 
               </v-alert>
               <SocialLogin />
           </v-col>
         </v-row>
       </v-col>
     </v-row>
  <!-- <p>uid: {{ user.uid }}</p>
  <p>email: {{ user.email }}</p>
  <p>login: {{ user.login }}</p>  
  <p>user.name: {{ user.name }}</p>  
  <p>ユーザーネーム: {{ user.displayName }}</p>   -->
   </v-container>


 </div>
</template>

<script>
import SocialLogin from '~/components/SocialLogin.vue'
import firebase from '~/plugins/firebase'

export default {
components: {
  SocialLogin
},
computed: {
  user () {
    return this.$store.getters['user']
  },
 },
 data () {
   return {
     email: '',
     password: '',
     updateName: '',
     tab: null,
     login_valid: true,
     show_loginpassword:false,
     loginErrorMsg: '',
     socialLoginErrorMsg: '',
   }
 },
 methods : {
   login (email, password) {
     this.$store.dispatch('login', {email: this.email, password: this.password})
    //  this.$router.push('/pictures') 
   },
   loginGoogle () {
     this.$store.dispatch('loginGoogle')
    //  this.$router.push('/pictures') 
   },
   update (){
     this.$store.dispatch('update', this.updateName)
   },
   async sendPasswordResetEmail({ email }) {
    const actionCodeSettings = {
      url: 'http://' + window.location.host
    }
    firebase
      .auth()
      .sendPasswordResetEmail(this.user.email, actionCodeSettings)
      .then(() => {
        // Email sent.
      })
      .catch(() => {
        // An error happened.
      })
   },
   toDemo () {
      this.$router.push('/login/demoLogin')
    },
  //  setPersistence() {
  //    return new Promise((resolve, reject) => {
  //      firebase
  //        .auth()
  //        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //        .then(result => {
  //          resolve();
  //        });
  //    });
  //  },
 }
}
</script>

<style>
.input{
  border: solid 1px black;
}
.updateform {
  border: solid 1px black;
}

</style>

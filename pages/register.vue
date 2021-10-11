<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="5">
        <h2 class="text-center subtitle-1 font-weight-bold mb-2">
          メールアドレスで登録
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
              <v-tab to="/">ログイン</v-tab>
              <v-tab to="/register">アカウント登録</v-tab>
            </v-tabs>

            <v-row>
              <v-col sm="12">
                <v-card flat>
                  <v-card-text class="pa-0">
                    <v-form
                      ref="register_form"
                      v-model="register_valid"
                      lazy-validation  
                    >
                      <v-text-field
                        v-model="email"
                        label="メールアドレス"
                        :rules="emailRules"
                        required
                        validate-on-blur
                      />
                      <v-text-field
                        ref="register_password"
                        v-model="password"
                        label="パスワード"
                        required
                        :append-icon="
                            show_registerPassword
                                ? 'mdi-eye'
                                : 'mdi-eye-off'
                        "
                        :type="
                            show_registerPassword
                                ? 'text'
                                : 'password'
                        "
                        validate-on-blur
                        :rules="register_passwordAgainRules"
                        @click:append="show_registerPassword = !show_registerPassword"
                        >
                        <!-- <template v-slot:progress>
                          <v-progress-linear
                            :value="score.value"
                            :color="score.color"
                            absolute
                            height="2"
                          />
                        </template> -->
                      </v-text-field>
                      <v-text-field
                        v-model="passwordAgain"
                        label="パスワード（確認）"
                        required
                        :append-icon="
                            show_registerPassword
                                ? 'mdi-eye'
                                : 'mdi-eye-off'
                        "
                        :type="
                            show_registerPassword
                                ? 'text'
                                : 'password'
                        "
                        validate-on-blur
                        :rules="register_passwordAgainRules"
                        @click:append="show_registerPassword = !show_registerPassword"
                      />
                      <v-alert>

                      </v-alert>

                      <v-btn
                        :disabled="!register_valid"
                        color="blue darken-3"
                        class="mr-4 white--text"
                        @click="register"
                      >
                        登録
                      </v-btn>
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
            <SocialLogin />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SocialLogin from '~/components/SocialLogin.vue'

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
      passwordAgain: '',
      tab: null,
      register_valid: true,
      registerErrorMsg:'',
      emailRules: [
        (v) => {
          if (v) {
            return (
             /.+@.+\..+/.test(v) ||
             '有効なメールアドレスを入力してください'
            )
          }else{
            return true
          }
        }
      ],
     //  register_passwordRules: [
     //     (v) => !!v || 'パスワードを入力してください',
     //     (v) =>
     //         zxcvbn(v).score >= 3 ||
     //         '大文字・小文字・数字・記号を混ぜた強いパスワードにしてください'
     //  ],
      register_passwordAgainRules: [
         (v) => {
           if (v) {
             return (
                 this.$refs.register_password.value === v ||
                 'パスワードと一致しません'
             )
           }else{
             return true
           }
         }
      ],
      show_registerPassword: false
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {email: this.email, password: this.password})
      this.$router.push('/') //ログイン後は/picturesに飛ばす？
    }
  },
}
</script>

<style>
.input{
  border: solid 1px black;
}
</style>
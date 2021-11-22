<template>
 <div class="toppage">

   <v-carousel
    cycle
    interval="6000"
    style="width:100%; max-height:400px"
   >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

  <!-- <v-sheet>
    <v-slide-group   show-arrows>
      <v-slide-item 
        v-for="(item,i) in items"
        :key="i"
        
      >
        <v-card style="margin: 0 20px 0 0; width: 320px; height: 240px;">
          <v-img :src="item.src"></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet> -->

   <v-container>
     <v-row justify="center">
       <v-col>
        <h1 class="text-center">
          PICTREAL
        </h1>
        <h4 class="text-center">
          初心者フォトグラファーのための写真投稿サイト
          <br>
          初心者がつまずきやすいカメラの設定。
          このサイトでは写真に加えて設定値をシェアできます。
        </h4>

        <div class="text-center">
          <v-btn 
            to="/login"
            class="mb-3 mt-10 white--text"
            color="blue darken-3"
          >
            ログイン/アカウント登録
          </v-btn>
        </div>

        <v-row class="justify-center">
          <v-btn 
            class="my-15 white--text"
            color="red darken-3"
            @click="toDemo"
          >
            デモログインはこちら
          </v-btn>
        </v-row>

       </v-col>
     </v-row>
   </v-container>

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
import { mapActions } from 'vuex'

export default {
  data () {
      return {
        clipped: false,
        items: [
          {
            src: '/images/img1.jpg',
          },
          {
            src: '/images/homeImage1.jpg',
          },
          {
            src: '/images/homeImage3.jpg',
          },
          {
            src: '/images/homeImage2.jpg',
          },
        ],
      }
    },
 computed: {
   user () {
     return this.$store.getters['user']
   },
 },
 methods: {
   ...mapActions(['signOut']),
   toDemo () {
      this.$router.push('/login/demoLogin')
    },
 }
}
</script>

<style scoped>

/* .footer {
  text-align: center;
}
.footer-item {
  text-align: center;
}

.copy {
  display: block;
  text-align: center;
} */
</style>

<template>
  <div>
    <h1>お問い合わせフォーム</h1>

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
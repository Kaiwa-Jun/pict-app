<template>
  <v-app>
    <header>
      <h1>新規投稿</h1>
    </header>
    <div class="modal">
      <div class="actions">
        <div class="back-btn">
          <img src="/images/back.svg">
        </div>
        <div class="post-btn" @click="post">
          post
        </div>
      </div>
      <div class="modal_content">
        <div class="post-image">
          <img :src="imageUrl" class="uploaded-image">
        </div>
        <el-upload
          v-if="!imageUrl"
          actions=""
          :show-file-list="false"
          :http-request="uploadFile"
          >
          <el-button size="small" type="primary">click to upload</el-button>
        </el-upload>
        <el-input
          type="textarea"
          :rows="8"
          aria-placeholder="設定値の入力"
          class="mt-8"
          v-model="text"
        >
        </el-input>
      </div>
    </div>
    <!-- <div class="text-center">
      <v-file-input
        accept="image/*"
        label="File input"
      ></v-file-input>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            設定値の入力をダイアログで出す
          </v-card-title>

          <v-card-text>
            IOS F値 シャッタースピード...
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              設定
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
    </div> -->
  </v-app>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'

export default {
  data () {
    return {
      dialog: false,
      imageUrl: null,
      text: null,
    }
  },
  methods: {
    async post() {
      await db.collection('posts').add({
        text: this.text,
        image: this.imageUrl,
        createdAt: new Date().getTime()
      })
      window.alert('保存されました')
    },
    async uploadFile(data){
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`posts/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL()
      this.imageUrl = url
    }
  }
}
</script>

<style scoped>
.modal_content {
  text-align: center;
}

.post-btn {
  cursor: pointer;
}

.post-image img {
  width: 70%;
  height: auto;
}
</style>
<template>
  <v-app>
    <header>
      <h1>新規投稿</h1>
    </header>
    <div v-if="modalVisible" class="modal">

      <v-card class="ImagePost">
        <v-container class="imageUpload">
          <div v-if="imageUrl">
            <img :src="imageUrl">
          </div>
          <el-upload
            v-if="!imageUrl"
            action=""
            :show-file-list="false"
            :http-request="uploadFile"
          >
            <el-button class="custom-icon" type="primary" icon="el-icon-picture"></el-button>
          </el-upload>
        </v-container>

        <v-card-text>
          <v-container fluid class="setting">
            <v-textarea
              v-model="text"
              type="textarea"
              placeholder="キャプションを書く"
              clearable
              clear-icon="mdi-close-circle"
            ></v-textarea>

            <v-row>
              <v-col cols="6">
                <v-subheader>
                  F値
                </v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="e1"
                  :items="fnumber"
                  menu-props="auto"
                  label="F値"
                  hide-details
                  single-line
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-subheader>
                  シャッタースピード
                </v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="e2"
                  :items="shutterSpeed"
                  menu-props="auto"
                  label="シャッタースピード"
                  hide-details
                  single-line
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-subheader>
                  ISO
                </v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="e3"
                  :items="iso"
                  menu-props="auto"
                  label="ISO"
                  hide-details
                  single-line
                ></v-select>
              </v-col>

            </v-row>
            <v-btn @click="post" class="mt-15">
              POST
            </v-btn>
          </v-container>
        </v-card-text>
      </v-card>

      <v-footer app>
      <div class="bottom-navigation">
        <div class="nav-item">
          <nuxt-link to="/pictures"><img src="/images/home.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/pictures/create"><img src="/images/plus-square2.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link :to="`/users/${currentUser.uid}`"><img src="/images/user.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/users"><img src="/images/users.svg" class="h-6 mt-4"></nuxt-link>
        </div>
      </div>
    </v-footer>
    </div>
  </v-app>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'

export default {
  // middleware: 'authenticated',
  data () {
    return {
      dialog: false,
      imageUrl: null,
      text: null,
      modalVisible: true,
      e1: '8.0',
      e2: '/3',
      e3: '500',
      items: [
        { text: 'State 1'},
        { text: 'State 2'},
        { text: 'State 3'},
        { text: 'State 4'},
        { text: 'State 5'},
        { text: 'State 6'},
        { text: 'State 7'},
      ],
      fnumber: [
        '4', '4.5', '5.0', '5.6', '6.3', '7.1', '8.0', '9.0',
         '10', '11', '13', '14', '16', '18', '20', '22'
      ],
      shutterSpeed: [
        'BULB', '30', '25', '20', '15', '13', '10', '8', '6', '5', '4','3.2', '2.5', 
        '2', '1.6', '1.3', '1.0', '0.8', '0.6','0.5', '0.4',
         '/3', '/4', '/5', '/6', '/8', '/10', '/13', '/15','/20', '/25', '/30', '/40',
         '/50', '/60', '/80', '/100', '/125', '/160', '/200', '/250','/320', '/400', '/500',
         '/640', '/800', '/1000', '/1250', '/1600', '/2000', '/2500', '/3200',
         '/4000', '/5000', '/6400', '/8000', 
      ],
      iso: [
        '50', '64', '80', '100', '125', '160', '200', '250', '320', '400', '500', '640',
        '800', '1000', '1250', '1600', '2000', '2500', '3200', '4000', '5000', '6400', 
        '8000', '10000', '12800', '16000', '20000', '25600', '32000', '40000', '51200',
        '64000', '80000', '102400', '128000', '160000', '204800',     
      ]
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    async post() {
      await db.collection('posts').add({
        text: this.text,
        image: this.imageUrl,
        createdAt: new Date().getTime(),
        userId: this.currentUser.uid,
        fnumber: this.e1,
        shutterSpeed: this.e2,
        iso: this.e3,
      })
      this.modalVisible = false
      this.text = null
      this.imageUrl = null
      this.fnumber = null
      this.shutterSpeed = null
      this.iso = null
      window.alert('保存されました')
      this.$router.push('/pictures')
    },
    async uploadFile(data){
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`posts/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL() //画像のURLの取得
      this.imageUrl = url
    }
  }
}
</script>

<style scoped>
.ImagePost {
  width: 600px;
  margin: auto;
  text-align: center;
}

.imageUpload {
  border-bottom: 1px solid;
}

.custom-icon {
  font-size: 2rem;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.setting {
  padding-top: 20px;
  padding-bottom: 50px;
}

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

.bottom-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.nav-item {
  width: calc(100% / 4 );
  text-align: center;
}
</style>
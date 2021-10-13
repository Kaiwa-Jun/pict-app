<template>
  <v-app>
    <header>
      <h1>投稿編集画面</h1>
    </header>

      <v-card class="ImagePost">
       <div class="post-image">
         <img :src="post.image" alt="">
       </div>


        <v-card-text>
          <v-container fluid class="setting">
          <!-- テキスト入力 -->
            <v-textarea
              v-model="post.text"
              type="textarea"
              placeholder="キャプションを書く"
              clearable
              clear-icon="mdi-close-circle"
            >
            </v-textarea>

          <!-- 設定値入力 -->
            <v-row>
              <v-col cols="6">
                <v-subheader>
                  F値
                </v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="post.fnumber"
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
                  v-model="post.shutterSpeed"
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
                  v-model="post.iso"
                  :items="iso"
                  menu-props="auto"
                  label="ISO"
                  hide-details
                  single-line
                ></v-select>
              </v-col>

            </v-row>
            <v-btn @click="updatePost" class="mt-15">
              update
            </v-btn>
          </v-container>
        </v-card-text>
      </v-card>
  </v-app>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'

export default {
  data () {
    return {
      imageUrl: null,
      text: null,
      post: {
        text: '',
      },
      e1: '',
      e2: '',
      e3: '',
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
    }
  },
    async mounted() {
      const postId = this.$route.params.id
       console.log(postId)
     const doc = await db.collection('posts').doc(postId).get()
     this.post = doc.data()
    //  snapshot.forEach((doc) => {
    //    this.posts.push({ id: doc.id, ...doc.data() })
    //  })
   },
  methods: {
    async updatePost() {
      const postId = this.$route.params.id
      await db.collection('posts').doc(postId).set({
        "text": this.post.text,
        "fnumber":this.post.fnumber,
        "shutterSpeed":this.post.shutterSpeed,
        "iso":this.post.iso
      },{merge: true})
      window.alert('保存されました')
      this.$router.push(`/pictures`)
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
.post-image  {
  border-bottom: 1px solid;
}
</style>
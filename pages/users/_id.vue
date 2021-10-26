<template>
  <div>
    <v-card>
      <v-container>
        <v-row class="px-15 pt-5 pb-0">
          <v-col cols="3" class="text-center">
            <div class="flex">
              <!-- アイコン -->
              <div v-if="!user.photoURL" class="user-avatar-sample">
                <v-avatar color="light-blue accent-3" size="40">
                  <img src="/images/profile.svg">
                </v-avatar>
              </div>
              <div v-else class="user-avatar">
                <v-avatar size="40">
                  <img :src="user.photoURL">
                </v-avatar>
              </div>

              <!-- ユーザネーム -->
              <v-card-text v-if="!user.photoURL" class="pt-3 pb-0">
                sample-userName
              </v-card-text>
              <v-card-text v-else class="pt-3 pb-0">
                {{ user.displayName }}
              </v-card-text>
            </div>
          </v-col>

          <v-col cols="3" class="text-center">
            投稿
             <br>
            <span class="text-xs">{{ posts.length }}</span>
          </v-col>
          
          <v-col cols="3" class="text-center">
            フォロー中
            <br>
            <span class="text-xs">{{ followingCount }}</span>
          </v-col>

          <v-col cols="3" class="text-center">
            フォロワー
            <br>
            <span class="text-xs">{{ followerCount }}</span>          
          </v-col>
        </v-row>

        <v-row class="px-15 py-0">
          <v-col cols="6" class="text-left pl-12 py-0">
            <v-card-text class="width=60% py-0">
            {{ user.selfIntro }}
            </v-card-text>
          </v-col>
        </v-row>
          <br>

<!-- プロフィール編集 -->
        <div class="text-center">
          <v-dialog
            v-if="isCurrentUser"
            v-model="dialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mb-10"
                outlined
                width="360"
                v-bind="attrs"
                v-on="on"
              >
                プロフィールを編集
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h7">プロフィールを編集</span>
              </v-card-title>
                <div class="flex text-center my-2">
                  <div v-if="!user.photoURL" class="modal-avatar-sample">
                    <v-avatar color="light-blue accent-3" size="70" class="">
                      <img src="/images/profile.svg">
                    </v-avatar>
                  </div>
                  <div v-else class="user-avatar">
                    <v-avatar color="primary" size="70" class="">
                      <img :src="user.photoURL">
                    </v-avatar>
                  </div>
                  <v-card-text class="py-3">
                    <el-upload
                      action=""
                      :show-file-list="false"
                      :http-request="uploadFile"
                    >
                      <el-button class="editImage" type="primary">プロフィール写真を変更</el-button>
                    </el-upload>
                  </v-card-text>
                </div>
                <v-row>
                  <v-col cols="4">
                    <v-subheader>ユーザーネーム</v-subheader>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="user.displayName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col cols="4">
                    <v-subheader>自己紹介</v-subheader>
                  </v-col>
                  <v-col cols="7">
                    <v-textarea
                      rows="2"
                      v-model="user.selfIntro"
                    ></v-textarea>
                  </v-col>
                </v-row> -->
              <v-card-text>
                <v-container>

                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="dialog = false"
                >
                  キャンセル
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  @click="updateUser"
                >
                  完了
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div> 
        <post v-for="post in posts" :key="post.id" :post="post" :mode="'profile'" />
      </v-container>
    </v-card> 
        
    <v-footer app>
      <div class="bottom-navigation">
        <div class="nav-item">
          <nuxt-link to="/pictures"><img src="/images/home.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/pictures/create"><img src="/images/plus-square.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link :to="`/users/${currentUser.uid}`"><img src="/images/user2.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/users"><img src="/images/users.svg" class="h-6 mt-4"></nuxt-link>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db, firebase } from '~/plugins/firebase'
import Post from '~/components/Post.vue'

export default {
  data () {
    return {
      dialog: false,
      followingCount: '0',
      followerCount: '0',
      user: {
        displayName: '',
        photoURL: '',
      },
      posts: [],
    }
  },
  components: {
    Post
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isCurrentUser () {
      if (this.currentUser) {
        return this.currentUser.uid == this.$route.params.id
      }
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  async mounted() {
     const userId = this.$route.params.id
     const doc = await db.collection('users').doc(userId).get()
     this.user = doc.data()

     const snapshot = await db.collection('posts').where('userId', '==', userId).get()
     snapshot.forEach((doc) => {
     this.posts.push({ id: doc.id, ...doc.data() })
     })
     this.fetchFollowingCount()
     this.fetchFollowerCount()
   },
  methods: {
    ...mapActions(['signOut']),
    async fetchFollowingCount () {
      const userId = this.$route.params.id
      const snap = await db.collection('users').doc(userId).collection('followings').get()
      this.followingCount = snap.size
    },
    async fetchFollowerCount () {
      const userId = this.$route.params.id
      const snap = await db.collection('users').doc(userId).collection('followers').get()
      this.followerCount = snap.size
    },
    async updateUser() {
      const userId = this.$route.params.id
      await db.collection('users').doc(userId).set({
         "displayName": this.user.displayName,
         "photoURL": this.user.photoURL,
       })
       .then(()=> {
         window.alert('保存されました')
         dialog = false
       })
       .catch((error)=> {
         console.log(error)
       })
    },
    async uploadFile(data){
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`posts/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL() //画像のURLの取得
      this.user.photoURL = url
    }
  },
  }  
</script>

<style scoped>
.user-name {
  margin-top: 2px;
}

.user-avatar-sample img{
  width: 18px;
}
.user-avatar img{
  width: 70px;
}
.modal-avatar-sample img{
  width: 25px;
}
.editImage {
  color: rgb(0, 153, 255);
  background-color: white;
  border: none;
  transition: all 0.3s ease 0s;
}
.editImage:hover {
  background-color: rgb(223, 222, 222);
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
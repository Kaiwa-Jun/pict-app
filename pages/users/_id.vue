<template>
  <div>
    <v-btn v-if="isCurrentUser" text @click="signOut" class="text-sm">ログアウト</v-btn>
    <v-card>
      <v-container>
        <v-row class="px-15 pt-5 pb-0">
          <v-col cols="3" class="text-center">
            <div class="flex">
              <!-- アイコン -->
              <div v-if="!user.photoURL" class="user-avatar-sample">
                <v-avatar color="light-blue accent-3" size="40" class="">
                  <img src="/images/profile.svg">
                </v-avatar>
              </div>
              <div v-else class="user-avatar">
                <v-avatar color="primary" size="40" class="">
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

        <!-- <div class="text-center">
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
                    <v-btn
                      color="blue darken-1"
                      text  
                    >
                    プロフィール写真を変更  
                    </v-btn>
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
                <v-row>
                  <v-col cols="4">
                    <v-subheader>自己紹介</v-subheader>
                  </v-col>
                  <v-col cols="7">
                    <v-textarea
                      rows="2"

                    ></v-textarea>
                  </v-col>
                </v-row>
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
                  @click="update"
                >
                  完了
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div> -->
        <post v-for="post in posts" :key="post.id" :post="post" :mode="'profile'" />
      </v-container>
    </v-card> 
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '~/plugins/firebase'
import Post from '~/components/Post.vue'

export default {
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
    }
  },
  data () {
    return {
      update: true,
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
  // async mounted() {
  //    const userId = this.$route.params.id
  //      console.log(userId)
  //    const doc = await db.collection('users').doc(userId).get()
  //    this.user = doc.data()
  //  },
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
  //  async update() {
  //    const userId = this.$route.params.id
  //    await db.collection('users').doc(userId).update({
  //       "displayName": this.user.displayName,
  //       // "photoURL": this.user.photoURL
  //     },{merge: true})
  //     window.alert('保存されました')
  //     dialog = false
  //   },
  //  update () {
  //    this.$store.dispatch('update', {displayName: this.user.displayName} )
  //  },
  //  async update() {
  //     await db.collection('users').add({
  //       selfIntro: this.user.selfIntro,
  //     }).then(() => {
  //       console.log('自己紹介を追加しました')
  //     }).catch((error) => {
  //       console.log('Error!')
  //     })
      
  //   },
  }  
</script>

<style scoped>
.user-name {
  margin-top: 2px;
}

.user-avatar img{
  width: 70px;
}
.user-avatar-sample img{
  width: 18px;
}
.modal-avatar-sample img{
  width: 25px;
}


</style>
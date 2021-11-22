<template>
  <v-container>
   <div class="posts">
     <div class="post">
  
       <!-- <div class="user" align-content="center" v-if="!isProfileMode">
         <div v-if="!user.photoURL" class="avatar-sample">
           <v-avatar color="light-blue accent-3" size="40">
             <nuxt-link :to="`/users/${user.id}`">
              <img src="/images/profile.svg">
             </nuxt-link>  
           </v-avatar>
         </div>
         <div v-else class="avatar">
           <v-avatar size="40">
             <nuxt-link :to="`/users/${user.id}`">
              <img :src="user.photoURL" alt="">
             </nuxt-link>  
           </v-avatar>
         </div>
           
         <div v-if="!user.displayName" class="user-name">
           <p>sampleName</p>
         </div>
         <div v-else class="user-name">
           <p>{{ user.displayName }}</p>
         </div>
       </div> -->

<!-- アイコンとユーザーネーム -->
       <v-container fluid class="userIconandName" v-if="!isProfileMode">
         <v-row justify="center">
           <!-- ~600 -->
           <v-row align="center" class="pb-2" v-if="$vuetify.breakpoint.xs">
             <v-col cols="3">
               <v-avatar>
                 <nuxt-link :to="`/users/${user.id}`">
                 <img 
                  v-if="user.photoURL"
                  :src="user.photoURL" alt="Avatar"
                  class="avatar-img"
                 >
                 <img 
                  v-else
                  src="/images/profile.svg" alt="Avatar">
                 </nuxt-link> 
               </v-avatar>
             </v-col>
             <v-col cols="6" class="left">
               <strong 
                v-if="user.displayName"
                v-html="user.displayName"
                class="avatar-img"
               >
               </strong>
               <strong
                v-else
               >
               sample name 
               </strong>
             </v-col>

             <v-col
              cols="2"
              class="text-no-wrap"
             >
             </v-col>
           </v-row>
           <!-- 600~960 -->
           <v-row align="center" class="pb-2" v-if="$vuetify.breakpoint.sm">
             <v-col cols="2" class="pl-5" align="right">
               <v-avatar>
                 <nuxt-link :to="`/users/${user.id}`">
                 <img 
                  v-if="user.photoURL"
                  :src="user.photoURL" alt="Avatar"
                  class="avatar-img"
                 >
                 <img 
                  v-else
                  src="/images/profile.svg" alt="Avatar"
                >
                 </nuxt-link> 
               </v-avatar>
             </v-col>

             <v-col cols="4" class="pl-0" align="left">
               <strong 
                v-if="user.displayName"
                v-html="user.displayName"
                
               >
               </strong>
               <strong
                v-else
                class=""
               >
               sample name 
               </strong>
             </v-col>

             <v-col
              cols="6"
              class="text-no-wrap"
             >
             </v-col>
           </v-row>
           <!-- 960~1264 -->
           <v-row align="center" class="pb-2" v-if="$vuetify.breakpoint.md">
             <v-col cols="2" class="pl-0" align="right">
               <v-avatar>
                 <nuxt-link :to="`/users/${user.id}`">
                 <img 
                  v-if="user.photoURL"
                  :src="user.photoURL" alt="Avatar"
                  class="avatar-img"
                 >
                 <img 
                  v-else
                  src="/images/profile.svg" alt="Avatar">
                 </nuxt-link> 
               </v-avatar>
             </v-col>

             <v-col cols="3" class="pl-0" align="left">
               <strong 
                v-if="user.displayName"
                v-html="user.displayName"
                class="pr-16"
               >
               </strong>
               <strong
                v-else
               
               >
               sample name 
               </strong>
             </v-col>

             <v-col
              cols="7"
              class="text-no-wrap"
             >
             </v-col>
           </v-row>
           <!-- 1264~1904 -->
           <v-row align="center" class="pb-2" v-if="$vuetify.breakpoint.lg">
             <v-col cols="1" class="pl-3" align="right">
               <v-avatar>
                 <nuxt-link :to="`/users/${user.id}`">
                 <img 
                  v-if="user.photoURL"
                  :src="user.photoURL" alt="Avatar"
                  class="avatar-img"
                 >
                 <img 
                  v-else
                  src="/images/profile.svg" alt="Avatar">
                 </nuxt-link> 
               </v-avatar>
             </v-col>

             <v-col cols="3" class="pl-0 pr-16" align="left">
               <strong 
                v-if="user.displayName"
                v-html="user.displayName"
                class="pr-16"
               >
               </strong>
               <strong
                v-else
               
               >
               sample name 
               </strong>
             </v-col>

             <v-col
              cols="8"
              class="text-no-wrap"
             >
             </v-col>
           </v-row>
           <!-- 1904~ -->
           <v-row align="center" class="pb-2" v-if="$vuetify.breakpoint.xl">
             <v-col cols="1" class="pl-3" align="right">
               <v-avatar>
                 <nuxt-link :to="`/users/${user.id}`">
                 <img 
                  v-if="user.photoURL"
                  :src="user.photoURL" alt="Avatar"
                  class="avatar-img"
                 >
                 <img 
                  v-else
                  src="/images/profile.svg" alt="Avatar">
                 </nuxt-link> 
               </v-avatar>
             </v-col>

             <v-col cols="3" class="pl-0 pr-16" align="left">
               <strong 
                v-if="user.displayName"
                v-html="user.displayName"
                class="pr-16"
               >
               </strong>
               <strong
                v-else
               
               >
               sample name 
               </strong>
             </v-col>

             <v-col
              cols="8"
              class="text-no-wrap"
             >
             </v-col>
           </v-row>
         </v-row>
       </v-container>

       <div class="post-image">
         <img :src="post.image" alt="">
       </div>

<!-- いいね 編集-->
        <div class="input-context">
          <v-card v-if="post" class="pa-5" flat>
            <v-row justify="center">
              <v-row align="center" v-if="$vuetify.breakpoint.xs">
                <v-col cols="2" class="pr-0 pl-5">
                  <v-img 
                    v-if="beLiked" 
                    @click="unlike" 
                    src='/images/heart_active.svg'
                    max-width="30"

                  ></v-img>
                  <v-img 
                    v-else 
                    @click="like" 
                    src='/images/heart.svg' 
                    max-width="30"
                  ></v-img>
                </v-col>

                <v-col cols="1">
                  <v-card-text class="pl-0">
                    {{ likeCount }}
                  </v-card-text>
                </v-col>
                <v-col
                 cols="7"
                 class="text-no-wrap"
                >
                </v-col>

                <v-col cols="1">
                  <v-menu
                    v-if="currentUser && currentUser.uid == user.id"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                        fab
                        x-small
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        @click="toEdit"
                      >
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-list>
                      <v-list-item
                        @click="deletePost"
                      >
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </v-col>

              </v-row>
              <!-- 600~960 -->
              <v-row align="center" v-if="$vuetify.breakpoint.sm">
                <v-col cols="2" class="pr-0 pl-8">
                  <v-img 
                    v-if="beLiked" 
                    @click="unlike" 
                    src='/images/heart_active.svg'
                    max-width="30"

                  ></v-img>
                  <v-img 
                    v-else 
                    @click="like" 
                    src='/images/heart.svg' 
                    max-width="30"
                  ></v-img>
                </v-col>

                <v-col cols="1" class="pl-2">
                  <v-card-text class="pl-0 pr-16 ">
                    {{ likeCount }}
                  </v-card-text>
                </v-col>

                <v-col
                 cols="7"
                 class="text-no-wrap"
                >
                </v-col>
                <v-col cols="2">
                  <v-menu
                    v-if="currentUser && currentUser.uid == user.id"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                        fab
                        x-small
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        @click="toEdit"
                      >
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-list>
                      <v-list-item
                        @click="deletePost"
                      >
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </v-col>

              </v-row>
              <!-- 960~1264 -->
              <v-row align="center" v-if="$vuetify.breakpoint.md">
                <v-col cols="1" class="pr-0 pl-5">
                  <v-img 
                    v-if="beLiked" 
                    @click="unlike" 
                    src='/images/heart_active.svg'
                    max-width="30"

                  ></v-img>
                  <v-img 
                    v-else 
                    @click="like" 
                    src='/images/heart.svg' 
                    max-width="30"
                  ></v-img>
                </v-col>

                <v-col cols="2" class="pl-0">
                  <v-card-text class="pl-0 pr-16 ">
                    {{ likeCount }}
                  </v-card-text>
                </v-col>

                <v-col
                 cols="7"
                 class="text-no-wrap"
                >
                </v-col>
                <v-col cols="2">
                  <v-menu
                    v-if="currentUser && currentUser.uid == user.id"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                        fab
                        x-small
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        @click="toEdit"
                      >
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-list>
                      <v-list-item
                        @click="deletePost"
                      >
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </v-col>

              </v-row>
              <!-- 1264~1904 -->
              <v-row align="center" v-if="$vuetify.breakpoint.lg">
                <v-col cols="1" class="pr-0 pl-13">
                  <v-img 
                    v-if="beLiked" 
                    @click="unlike" 
                    src='/images/heart_active.svg'
                    max-width="30"
                    
                  ></v-img>
                  <v-img 
                    v-else 
                    @click="like" 
                    src='/images/heart.svg' 
                    max-width="30"
                  ></v-img>
                </v-col>

                <v-col cols="2" class="pl-0 pr-10">
                  <v-card-text class="pl-0 pr-16 ">
                    {{ likeCount }}
                  </v-card-text>
                </v-col>

                <v-col
                 cols="7"
                 class="text-no-wrap"
                >
                </v-col>
                <v-col cols="2">
                  <v-menu
                    v-if="currentUser && currentUser.uid == user.id"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                        fab
                        x-small
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        @click="toEdit"
                      >
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-list>
                      <v-list-item
                        @click="deletePost"
                      >
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </v-col>

              </v-row>
              <!-- 1904~      -->
              <v-row align="center" v-if="$vuetify.breakpoint.xl">
                <v-col cols="1" class="pr-0 pl-13">
                  <v-img 
                    v-if="beLiked" 
                    @click="unlike" 
                    src='/images/heart_active.svg'
                    max-width="30"
                    
                  ></v-img>
                  <v-img 
                    v-else 
                    @click="like" 
                    src='/images/heart.svg' 
                    max-width="30"
                  ></v-img>
                </v-col>

                <v-col cols="1" class="pl-0 pr-10">
                  <v-card-text class="pl-0 pr-16 ">
                    {{ likeCount }}
                  </v-card-text>
                </v-col>

                <v-col
                 cols="8"
                 class="text-no-wrap"
                >
                </v-col>
                <v-col cols="2">
                  <v-menu
                    v-if="currentUser && currentUser.uid == user.id"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                        fab
                        x-small
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        @click="toEdit"
                      >
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-list>
                      <v-list-item
                        @click="deletePost"
                      >
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </v-col>

              </v-row>     
            </v-row>
         
<!-- テキストとか -->
          <v-card-title align="left" class="pl-0">
            <v-card-text class="pl-0 py-0">
              {{ post.text }}
            </v-card-text>

            <v-card-text class="pb-0 pl-0">
              F値 : {{ post.fnumber }}
            </v-card-text>
            <v-card-text class="py-0 pl-0">
              シャッタースピード : {{ post.shutterSpeed }}
            </v-card-text>
            <v-card-text class="py-0 pl-0">
              ISO : {{ post.iso }}
            </v-card-text>
<!-- コメント機能 -->
            <!-- <v-card-text class="pt-2 pb-0 pl-0">
              <v-btn
                text
                class="grey--text"
                @click="toMessages"
              >
                コメントを全てを表示
              </v-btn>
            </v-card-text>
            <v-card-text class="py-0 pl-0">
              <v-dialog
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
                    コメントを追加
                  </v-btn>
                </template>
                <v-card>
                  <v-row align="center" justify="center">
                    <v-col cols="2">
                      <div class="flex text-center my-2">
                        <div v-if="!user.photoURL" class="modal-avatar-sample">
                          <v-avatar color="light-blue accent-3" size="50" class="">
                            <img src="/images/profile.svg">
                          </v-avatar>
                        </div>
                        <div v-else class="user-avatar">
                          <v-avatar color="primary" size="50" class="">
                            <img :src="user.photoURL">
                          </v-avatar>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        v-model="message"
                        placeholder="コメントを書く"
                        :append-outer-icon="'mdi-send'"
                        clear-icon="mdi-close-circle"
                        clearable
                        type="text"
                        @click:append-outer="sendMessage"
                        @click:clear="clearMessage"
                        class="mt-7 mr-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-dialog>
            </v-card-text>  -->

            <v-card-text class="pl-0 grey--text">
              {{ createdAt | datetime }}
            </v-card-text>
          </v-card-title>
          </v-card>
        </div>

     

     </div>
   </div>
 </v-container>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'

export default {
  props: ['post', 'mode'],
  data() {
    return {
      items: [
         {
           title: '編集',
           to: "/pictures/${this.$route.params.post.id}/edit",
         },
         {
           title: '削除',
           to: '/',
         },
       ],
      createdAt: new Date(),
      user: {
        id: '',
        displayName: '',
        photoURL: '',
        icon: 'mdi-account-multiple'
      },
      likeCount: 0,
      beLiked: false,

      dialog: false,
      password: 'Password',
      show: true,
      message: null,
      icons: [
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue',
      ],
    }
  },
  async mounted() {
    this.likeRef = db.collection('posts').doc(this.post.id).collection('likes')
    this.checkLikeStatus()

    this.fetchUser()

    this.likeRef.onSnapshot((snap) => {
      this.likeCount = snap.size
    })
  },
  methods: {
    toEdit () {
      this.$router.push(`/pictures/${this.post.id}/edit`)
    },
    toMessages () {
      this.$router.push(`/pictures/${this.post.id}/messages`)
    },
    async deletePost () {
        await db.collection('posts').doc(this.post.id).delete()
        this.$router.push('/pictures')
        location.reload();
    },
    async fetchUser () {
      const userId = this.post.userId
      const doc = await db.collection('users').doc(userId).get()
      this.user = { ...doc.data(), id: userId }
    },
    async like () {
      await this.likeRef.doc(this.currentUser.uid).set({ uid: this.currentUser.uid})
      this.beLiked = true
    },
    async unlike () {
      await this.likeRef.doc(this.currentUser.uid).delete()
      this.beLiked = false
    },
    async checkLikeStatus () {
      const doc = await this.likeRef.doc(this.currentUser.uid).get()
      this.beLiked = doc.exists
    },
    sendMessage () {
      firebase.firestore().collection('posts').doc(this.post.id).collection('messages').add({
        // uid: this.currentUser.uid,
        message: this.message
      })
      this.message = null,
      // this.clearMessage()
      window.alert('コメントは保存されました')
    },
    clearMessage () {
      this.message = ''
    },
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isProfileMode () {
      return this.mode === 'profile'
    },
    icon () {
      return this.icons[this.iconIndex]
    },
  },
  filters: {
    datetime(date) {
      const day = date.getDate()
      const monthIndex = date.getMonth()
      const year = date.getFullYear()

      return `${year}/${monthIndex + 1}/${day}`
    }
  }
  
}  
</script>

<style lang="scss" scoped>
.user {
  margin-top: 20px;
  width: 60%;
  
}
.avatar {
  float: left;
  width: 5%;
  margin-left: 130px;
  margin-top: 10px;
}

.avatar-sample {
  float: left;
  width: 5%;
  margin-left: 130px;
  margin-top: 10px;
  padding-top: 10px;
}
.avatar-sample img{
  width: 20px;
  margin-top: 3px;
}
.avatar-img{
  width: 55px;
  margin-top: 3px;
} 

.user-name {
  width: 15%;
  padding-top: 17px;
  margin-left: 130px;
}

.userIconandName{
  width: 100%;
}

.left{
  text-align: left;
  padding-left: 0;
  margin-left: 5px;
}


.post {
  text-align: center;
  width: 80%;
    margin-right: auto;
  margin-left: auto;
}
.post-image img {
  width: 100%;
  height: auto;
}



.input-context {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10px;
}

.message {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.message img {
  width: 3%;
  height: auto;
}

// @media screen and (max-width: 540px) {
//   // ::v-deep .v-avatar img {
//   //   width: 40px;
//   // }
  
//   .avatar img{
//   width: 40px;
// } 
// }

</style>
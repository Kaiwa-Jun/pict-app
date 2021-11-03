<template>
  <div>
   <div class="posts">
     <div class="post">
       <div class="user" align-content="center" v-if="!isProfileMode">
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
       </div>

       <div class="post-image">
         <img :src="post.image" alt="">
       </div>

        <div class="input-context">
          <v-card v-if="post" class="pa-5" flat>
          <v-row>
            <v-col cols="1" class="pr-0">
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

            <v-col cols="1" class="pa-0">
              <v-card-text class="pl-0">
                {{ likeCount }}
              </v-card-text>
            </v-col>

            <v-col cols="1" class="pl-0">
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

            <v-card-text class="pl-0 grey--text">
              {{ createdAt | datetime }}
            </v-card-text>
          </v-card-title>
          </v-card>
        </div>

     

     </div>
   </div>
 </div>
</template>

<script>
import { db } from '~/plugins/firebase'

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
        photoURL: ''
      },
      likeCount: 0,
      beLiked: false,
      
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
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isProfileMode () {
      return this.mode === 'profile'
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

<style scoped>
.user {
  margin-top: 20px;
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
}

.avatar-sample img{
  width: 20px;
  margin-top: 3px;
}
.avatar img{
  width: 55px;
  margin-top: 3px;
}

.user-name {
  width: 15%;
  padding-top: 17px;
  margin-left: 130px;
}


.post {
  text-align: center;
}
.post-image img {
  width: 60%;
  height: auto;
}



.input-context {
  width: 70%;
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
</style>
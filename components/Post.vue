<template>
  <div>
   <div class="posts">
     <div class="post">
       <div class="user" align-content="center" v-if="!isProfileMode">
         <div class="avatar">
           <v-avatar color="primary" size="35">
             <nuxt-link :to="`/users/${user.id}`">
              <img :src="user.photoURL" alt="">
             </nuxt-link>
             <!-- <span class="white--text">i</span> -->
           </v-avatar>
           <!-- <a><img src="/images/post1.jpg" class="w-8 h-8 rounded-full" alt=""></a> -->
         </div>
         <div class="user-name">
           <p v-if="user">{{ user.displayName }}</p>
         </div>
       </div>

       <div class="post-image">
         <img :src="post.image" alt="">
       </div>
         <v-toolbar v-if="post" prominent width="70%" ><!-- flat入れる -->
           <div class="actions">
              <img v-if="beLiked" @click="unlike" src='/images/heart_active.svg' class="w-6 mr-3 ">
              <img v-else @click="like" src='/images/heart.svg' class="w-6 mr-3 ">
              <p>{{ likeCount }}</p>
           </div>
           <div class="message"> 
              <p class="mt-10">{{ post.text }}</p>
              <!-- 設定値をSlidersで -->
              <p class="mt-10">{{ createdAt | datetime }}</p>
           </div>
         </v-toolbar>
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
      createdAt: new Date(),
      user: {
        id: '',
        displayName: '',
        photoURL: ''
      },
      likeCount: 0,
      beLiked: false
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
.user-name {
  width: 15%;
  padding-top: 17px;
  margin-left: 130px;
}


.post {
  text-align: center;
}
.post-image img {
  width: 70%;
  height: auto;
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
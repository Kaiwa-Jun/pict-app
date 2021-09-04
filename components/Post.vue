<template>
  <div>
   <div class="posts">
     <div class="post">
       <div class="user" align-content="center">
         <div class="avatar">
           <v-avatar color="primary" size="35">
             <span class="white--text">i</span>
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
         <v-toolbar v-if="post" prominent width="70%">
           <div class="actions my-2 ml-4 flex">
              <img v-if="beLiked" src='/images/heart_active.svg' class="w-6 mr-3 ">
              <img v-else src='/images/heart.svg' class="w-6 mr-3 ">
              <p>0</p>
           </div>
           <div class="message">
              <p class="mt-10">{{ post.text }}</p>
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
  props: ['post'],
  data() {
    return {
      createdAt: new Date(),
      user: {
        displayName: 'kaiwa7124'
      },
      beLiked: false
    }
  },
  // methods: {
  //   async like () {
  //     const likeRef = db.collection('posts').doc(this.post.id).collection('likes')
  //     await likeRef.doc(this.currentUser.uid).set({ uid: this.currentUser.uid})
  //     this.beLiked = true
  //   }
  // },
  computed: {
    currentUser () {
      return this.$store.state.user
    }
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
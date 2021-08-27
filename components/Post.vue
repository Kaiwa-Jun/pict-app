<template>
  <div>
   <div class="posts">
     <div class="post">
       <div class="user" align-content="center">
         <div class="avatar">
           <v-avatar color="primary" size="40">
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
       <!-- <div class="actions my-2 ml-4 flex">
         <img src='/images/heart.svg' class="w-6 mr-3">
         <p>0</p>
       </div> -->
       <div class="message">
         <v-toolbar v-if="post">
           {{ post.text }}
           <br>
           {{ createdAt | datetime }}
         </v-toolbar>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      createdAt: new Date(),
      user: {
        displayName: 'kaiwa7124'
      }
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
/* .user {
  float: left;
  width: 40%;
} */
.avatar {
  float: left;
  width: 5%;
  
}
.user-name {
  width: 15%;
  padding-top: 10px;
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
</style>
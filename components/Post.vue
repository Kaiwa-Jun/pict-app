<template>
  <div>
   <div class="posts">
     <div class="post">
       <v-row class="user" align-content="center">
         <v-col class="avatar">
           <v-avatar color="primary" size="40">
             <span class="white--text">i</span>
           </v-avatar>
           <!-- <a><img src="/images/post1.jpg" class="w-8 h-8 rounded-full" alt=""></a> -->
         </v-col>
         <v-col class="user-name">
           <p v-if="user">{{ user.displayName }}</p>
         </v-col>
       </v-row>

       <div class="post-image">
         <img src="/images/img1.jpg" alt="">
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

.post {
  text-align: center;
}
.post-image img {
  width: 70%;
  height: auto;
}
.message {
  width: 70%;
  
}
</style>
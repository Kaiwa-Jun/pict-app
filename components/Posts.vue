<template>
  <div>
    <div class="posts">
      <post v-for="(post, index) in posts" :post="post" :key=index />
    </div>
  </div>
</template>

<script>
import Post from "~/components/Post.vue"
import { db } from "~/plugins/firebase"

export default {
  components: {
    Post
  },
   data () {
     return {
       posts: [

       ]
      //  posts: [
      //    {
      //      user: {
      //        displayName: 'kaiwa7124'
      //      },
      //      content: {
      //        text: '設定値:F値'
      //      },
      //    },
      //    {
      //      user: {
      //        displayName: 'Jun7124'
      //      },
      //      content: {
      //        text: '設定値:iOS'
      //      },
      //    }
      //  ]
     }
  },
  mounted (){
    db.collection('posts').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        if (change.type === 'added') {
          this.posts.unshift({ id: doc.id, ...doc.data() })
        }
      })
    })
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
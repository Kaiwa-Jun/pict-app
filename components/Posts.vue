<template>
  <div>
    <div class="posts">
      <post v-for="(post, index) in posts" :post="post" :key=index />
    <!-- </div>
    <div class="modal">
      <div class="actions">
        <div class="back-btn">
          <img src="/images/back.svg">
        </div>
        <div class="post-btn">
        </div>
      </div>
      <div class="moda_content">
        <el-upload
          actions=""
          :show-file-list="false"
          :http-request="uploadFile"
          >
          <el-button size="small" type="primary">click to upload</el-button>
        </el-upload>
      </div> -->
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
       posts: []
     }
  },
  mounted (){
    db.collection('posts').orderBy('createdAt').onSnapshot((snapshot) => {
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
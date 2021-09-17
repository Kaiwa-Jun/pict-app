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
import { mapActions } from 'vuex'

export default {
  components: {
    Post
  },
   data () {
     return {
       posts: []
     }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
  },
  mounted () {
    if (this.currentUser) {
      this.watchPostsChange()
    }
  },
  watch: {
    currentUser (user) {
      if (user) {
        this.watchPostsChange()
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async watchPostsChange () {
      const snapshot = await db.collection('users').doc(this.currentUser.uid).collection('followings').get()
      const followings = [this.currentUser.uid]
      snapshot.forEach((doc) => {
        followings.push(doc.id)
      })
      db.collection('posts').where('userId', 'in', followings).orderBy('createdAt').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc
          if (change.type === 'added') {
            this.posts.unshift({ id: doc.id, ...doc.data() })
          }
        })
      })
    }
  },
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
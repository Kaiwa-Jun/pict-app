<template>
  <div>
    <div class="user flex justify-between px-8 py-8">
      <div class="flex">
        <div class="user-avatar mr-4">
          <v-avatar color="primary" size="40" class="user-avatar mr-4">
            <img :src="user.photoURL">
          </v-avatar>
        </div>
        <div class="user-name vertical-middle">
          <p>{{ user.displayName }}</p>
        </div>
      </div>
      <v-btn v-if="isCurrentUser" text @click="signOut" class="text-sm">ログアウト</v-btn>
    </div>
    <div class="tab flex justify-around">
     <div class="post-count text-center">
       Post
        <br>
       <span class="text-xs">{{ posts.length }}</span>
     </div>
     <div class="text-center">
       Following
       <br>
       <span class="text-xs">{{ followingCount }}</span>
     </div>
     <div class="text-center">
       Follower
       <br>
       <span class="text-xs">{{ followerCount }}</span>
     </div>
   </div>
   <post v-for="post in posts" :key="post.id" :post="post" :mode="'profile'" />
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
      followingCount: '0',
      followerCount: '0',
      user: {
        displayName: '',
        photoURL: '',
      },
      posts: [],
    }
  },
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
   }
  }  
</script>
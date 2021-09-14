<template>
  <div>
    <v-row class="user-info">
      <v-col class="avatar">
        <v-avatar color="primary" size="40">
          <!-- <span class="white--text">i</span> -->
          <nuxt-link :to="`/users/${user.uid}`">
            <img :src="user.photoURL">
          </nuxt-link>
        </v-avatar>
      </v-col>
      <v-col class="displayName">
        <p>{{ user.displayName }}</p>
      </v-col>
    </v-row>
    <div class="follow-btn" v-if="!isCurrentUser">
      <v-btn v-if="!followed" @click="follow" style="text-transform: none">Follow</v-btn>
      <v-btn v-else @click="unfollow" style="text-transform: none">Unfollow</v-btn>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  data () {
    return {
      followed: false
    }
  },
  props: ['user'],
  computed: {
    currentUser (){
      return this.$store.state.user
    },
    isCurrentUser () {
      return this.currentUser.uid === this.user.id
    }
  },
  async mounted () {
    this.followingRef = db.collection('users').doc(this.currentUser.uid).collection('followings').doc(this.user.id)
    this.followerRef = db.collection('users').doc(this.user.id).collection('followers').doc(this.currentUser.uid)
    const doc = await this.followingRef.get()
    this.followed = doc.exists
  },
  methods: {
    async follow () {
      await this.followingRef.set({ user:this.user.id})
      await this.followerRef.set({ user: this.currentUser.uid})
      this.followed = true
    },
    async unfollow () {
      await this.followingRef.delete()
      await this.followerRef.delete()
      this.followed = false
    },

  }
}
</script>

<style scoped>

</style>
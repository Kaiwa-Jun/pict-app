<template>
  <div>
    <v-card>
      <v-container>

      <v-row class="user-info" >

        <v-col class="mt-2" cols="3">
          <div v-if="!user.photoURL" class="avatar-sample">
           <v-avatar color="light-blue accent-3" size="40">
             <nuxt-link :to="`/users/${user.id}`">
              <img src="/images/profile.svg">
             </nuxt-link>  
           </v-avatar>
         </div>
         <div v-else class="avatar">
           <v-avatar color="primary" size="40">
             <nuxt-link :to="`/users/${user.id}`">
              <img :src="user.photoURL" alt="">
             </nuxt-link>  
           </v-avatar>
         </div>
        </v-col>

        <v-col class="" cols="3">
          <div v-if="!user.displayName" class="user-name">
           <p>sample-userName</p>
         </div>
         <div v-else class="user-name">
           <p>{{ user.displayName }}</p>
         </div>
          <!-- <v-card-text>
          {{ user.displayName }}
          </v-card-text> -->
        </v-col>

        <v-col class="mt-2" cols="6">
          <div class="follow-btn" v-if="!isCurrentUser">
            <v-btn v-if="!followed" @click="follow" style="text-transform: none">フォローする</v-btn>
            <v-btn v-else @click="unfollow" style="text-transform: none">フォロー中</v-btn>
          </div>
        </v-col>    
      </v-row>
      </v-container>
    </v-card>
    <v-footer
      :absolute="fixed"
      app
    >
      <div class="bottom-navigation">
        <div class="nav-item">
          <nuxt-link to="/pictures"><img src="/images/home.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/pictures/create"><img src="/images/plus-square.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link :to="`/users/${currentUser.uid}`"><img src="/images/user.svg" class="h-6 my-3"></nuxt-link>
        </div>
        <div class="nav-item" v-if="isAuthenticated">
          <nuxt-link to="/users"><img src="/images/users2.svg" class="h-6 mt-4"></nuxt-link>
        </div>
      </div>
    </v-footer>
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
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
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
.user-info {
  text-align: center;
}
.avatar-sample img{
  width: 20px;
}
.avatar img{
  width: 40px;
}
.user-name {
  margin-top: 15px;
}
.bottom-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.nav-item {
  width: calc(100% / 4 );
  text-align: center;
}

</style>
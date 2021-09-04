<template>
  <div>
    <div class="user flex justify-between px-8 py-8">
      <div class="flex">
        <div class="user-avatar mr-4">
          <v-avatar color="primary" size="40" class="user-avatar mr-4">
            <span class="white--text w-12 h-12 rounded-full">i</span>
          </v-avatar>
        </div>
        <div class="user-name vertical-middle">
          <p>kaiwajun</p>
        </div>
      </div>
      <v-btn text @click="signOut" class="text-sm">ログアウト</v-btn>
    </div>
    <div class="tab flex justify-around">
     <div class="post-count text-center">
       Post
        <br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Following
       <br>
       <span class="text-xs">0</span>
     </div>
     <div class="text-center">
       Follower
       <br>
       <span class="text-xs">0</span>
     </div>
   </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
methods: {
   ...mapActions(['signOut']),
  },
}
</script>
<template>
  <div>
    <div class="user">
      <div class="flex">
        <div class="user-avatar">
          <v-avatar color="primary" size="40">
            <span class="white--text">i</span>
          </v-avatar>
        </div>
        <div class="user-name">
          <p>kaiwajun</p>
        </div>
      </div>
      <v-btn>ログアウト</v-btn>
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
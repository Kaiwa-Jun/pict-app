<template>
   <ul>
     <div class="nav-item w-1/3 flex justify-center">
       <nuxt-link to="/"><img src="/images/home.svg" class="nav-item"></nuxt-link>
     </div>
     <div v-if="isAuthenticated" class="nav-item w-1/3 flex justify-center">
       <nuxt-link to="users"><img src="/images/follow.svg" class="nav-item"></nuxt-link>
       <!-- <img src="/images/follow.svg" @click="toCreate" class="nav-item"> -->
     </div>
     <div v-if="isAuthenticated" class="nav-item w-1/3 flex justify-center">
       <nuxt-link to="/users/111"><img src="/images/profile.svg" class="nav-item"></nuxt-link>
       <!-- <img src="/images/profile.svg" @click="toMypage" class="nav-item"> -->
     </div>
   </ul>
</template>

<script>
export default {
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>
ul {
     overflow: hidden;
     letter-spacing: -.5em;
}
li {
     display: inline-block;
     width: 20%;
     vertical-align: middle;
     letter-spacing: 0;
     text-align: center;
}

 li img {
     margin: -4em 0;
     padding: 5em 1em;
     display :block;
}
 li img:hover {
     background: #68abcd;
}

</style>
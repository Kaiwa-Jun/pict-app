<template>
  <div class="bottom-navigation">
    <div class="nav-item">
      <nuxt-link to="/"><img src="/images/home.svg" class="h-6 my-3"></nuxt-link>
    </div>
    <div class="nav-item" v-if="isAuthenticated">
      <nuxt-link to="/users"><img src="/images/follow.svg" class="h-6 my-3"></nuxt-link>
    </div>
    <div class="nav-item" v-if="isAuthenticated">
      <nuxt-link :to="`/users/${currentUser.uid}`"><img src="/images/profile.svg" class="h-6 my-3"></nuxt-link>
    </div>
  </div>
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
.bottom-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.nav-item {
  width: calc(100% / 3 );
  text-align: center;
}


</style>
<template>
   <div>
     <div class="nav-item">
       <a><img src="/images/home.svg" @click="toHome" class="h-6 my-3"></a>
     </div>
     <div>
       <a><img src="/images/follow.svg" @click="toCreate" class="h-6 my-3"></a>
     </div>
     <div>
       <a><img src="/images/profile.svg" @click="toMypage" class="h-6 my-3"></a>
     </div>
   </div>
</template>

<script>
export default {
  methods: {
   toHome () {
     this.$router.push('/')
   },
   toCreate () {
     this.$router.push('/pictures/create')
   },
   toMypage () {
     this.$router.push('/mypage')
   },
  },
}
</script>

<style scoped>
.nav-item {
  justify-content: center;
}
</style>
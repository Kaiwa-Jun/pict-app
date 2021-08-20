<template>
   <ul>
     <li class="nav">
       <nuxt-link to="/"><img src="/images/home.svg" class="nav-item"></nuxt-link>
     </li>
     <li>
       <nuxt-link to="users"><img src="/images/follow.svg" class="nav-item"></nuxt-link>
       <!-- <img src="/images/follow.svg" @click="toCreate" class="nav-item"> -->
     </li>
     <li>
       <nuxt-link to="/users/111"><img src="/images/profile.svg" class="nav-item"></nuxt-link>
       <!-- <img src="/images/profile.svg" @click="toMypage" class="nav-item"> -->
     </li>
   </ul>
</template>

<script>
export default {
  methods: {
  //  toHome () {
  //    this.$router.push('/')
  //  },
  //  toCreate () {
  //    this.$router.push('/pictures/create')
  //  },
  //  toMypage () {
  //    this.$router.push('/users')
  //  },
  },
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
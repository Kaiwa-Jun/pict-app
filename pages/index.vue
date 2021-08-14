<template>
 <div class="page">
   <Login />
 </div>
</template>

<script>
import Login from '~/components/Login.vue'
import { mapActions } from 'vuex'

export default {
 components: {
   Login: Login,
 },
 computed: {
   user () {
     return this.$store.getters['user']
   },
 },
 methods: {
   ...mapActions(['signOut'])
 }
}
</script>

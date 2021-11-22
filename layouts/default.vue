<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" /> <!--Vuetifyの文字部分-->
      <v-spacer />


      <!-- アイコン部分 -->
      <div v-if="user.login">
        <div v-if="!user.photoURL" class="avatar-sample">
          <v-avatar size="35">
            <!-- <nuxt-link :to="`/users/${user.id}`"> -->
             <img src="/images/profile.svg">
            <!-- </nuxt-link>   -->
          </v-avatar>
        </div>
        <div v-else class="avatar">
          <v-avatar color="primary" size="35">
            <!-- <nuxt-link :to="`/users/${user.id}`"> -->
             <img :src="user.photoURL" alt="">
            <!-- </nuxt-link>   -->
          </v-avatar>
        </div>
      </div>

       <p v-if="user.login" class="text" >
         <v-btn 
          text 
          @click="signOut"
          class="mt-4"
         >
          <img src="/images/log-out.svg" class="h-6 ">
         </v-btn>
       </p>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import AppFooter from '~/components/Footer.vue'
import { mapActions } from 'vuex'

export default {
  computed: {
    user () {
      return this.$store.getters['user']
    },
    currentUser () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
   ...mapActions(['signOut','checkLogin']),
   toCreate () {
     this.$router.push('/pictures/create')
   },
  },
  components: {
    AppFooter
  },
  mounted (){
     this.$store.dispatch('checkLogin')
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-login-variant',
          title: 'ログイン・アカウント作成',
          to: '/login'
        },
        {
          icon: 'mdi-timeline-outline',
          title: 'タイムライン',
          to: '/pictures'
        },
        {
          icon: 'mdi-plus-box-outline',
          title: '新規投稿',
          to: '/pictures/create'
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'ユーザ一覧',
          to: '/users'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'お問い合わせ',
        //   to: '/inquirles'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PICTREAL'
    }
  }
}
</script>

<style scoped>
.avatar-sample img{
  width: 15px;
  padding-top: 2px;
}
.avatar img{
  width: 35px;
}
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
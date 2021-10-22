import firebase from '~/plugins/firebase'
import { db } from '~/plugins/firebase'

export const state = () => ({
  user: {
    uid: '',
    email: '',
    name: '',
    login: false,
  },
})

export const getters = {
  user: state => {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  }
}

export const actions = {
  setUser (context, user) {
    context.commit('setUser', user)
  },
  login({ dispatch }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        this.$router.push('/pictures')
          console.log('成功！')
          dispatch('checkLogin')
        }).catch((error) => {
          window.alert(error)
        })
  },
  loginGoogle ({ dispatch }) {
   const provider = new firebase.auth.GoogleAuthProvider()
   firebase.auth().signInWithPopup(provider)
   .then((result) => {
    this.$router.push('/pictures')
     dispatch('checkLogin')
   }).catch((error) => {
     window.alert(error)
   })
  },
  loginTwitter ({ dispatch }) {
    var provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      this.$router.push('/pictures')
      dispatch('checkLogin')
    }).catch(function (error) {
      console.log(error)
    })
   },
  checkLogin ({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { uid: user.uid, email: user.email, name: user.displayName })
        commit('switchLogin')
        db.collection('users').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      }
    })
  },
  // update ({ commit }, name) {
  //  firebase.auth().currentUser.updateProfile({
  //    displayName: name,
  //  })
  //    .then(()=> {
  //      console.log('Update successful')
  //    })
  //    .catch((error)=> {
  //      console.log(error)
  //    })
  // },
  // update () {
  //   const user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: this.displayName,
  //   }).then((user) => {
  //     console.log('update success!')
  //   }).catch((error) => {
  //     console.log('update not success')
  //   })
  // },
  signOut() {
   firebase.auth().onAuthStateChanged(user => {
     firebase.auth().signOut()
       .then(() => {
         location.replace('/');
         window.alert('ログアウトしました');
       })
       .catch((error) => {
         console.log(`ログアウト時にエラーが発生しました (${error})`);
       });
   });
  },
  register ({ dispatch, commit }, payload) {
   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
   .then(user => {
     console.log(user)
     dispatch('checkLogin')
     dispatch('sendEmail')
   }).catch(function (error) {
     console.log({'code':error.code, 'message':error.message})
   })
  },
  sendEmail(){
    const actionCodeSettings = {
      url: "http://" + location.host + "/",
    };
    firebase.auth().languageCode = "ja";
    const user = firebase.auth().currentUser;
    user
      .sendEmailVerification(actionCodeSettings)
      .then(() => 
        alert("認証メールを送りました!",
        this.$router.push('/')
      )).catch((e) => console.log(e));
  },
}

export const mutations = {
  getData (state, payload) {
    state.user.uid = payload.uid
    state.user.email = payload.email
  },
  switchLogin (state) {
    state.user.login = true
  },
  setUser (state, user) {
    state.user = user
  }
}


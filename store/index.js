import firebase from '~/plugins/firebase'

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
 }
}

export const actions = {
 login({ dispatch }, payload) {
   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
     .then(user => {
         console.log('成功！')
         dispatch('checkLogin')
       }).catch((error) => {
         alert(error)
       })
 },
 loginGoogle ({ dispatch }) {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function (result) {
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
     }
   })
 },
 update ({ context }, name) {
  firebase.auth().currentUser.updateProfile({
    displayName: name
  })
    .then(()=> {
      console.log('Update successful')
    })
    .catch((error)=> {
      console.log(error)
    })
 },
 signOut() {
  firebase.auth().onAuthStateChanged(user => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('ログアウトしました');
        location.reload();
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
  }).catch(function (error) {
    console.log({'code':error.code, 'message':error.message})
  })
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
}


<template>
  <div>
    <h1>コメント一覧</h1>
    <p>{{ messages }}</p>
    <p></p>
  </div>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'

export default {
  data() {
    return {
      messages: [],
    }
  },
  async mounted() {
    const postId = this.$route.params.id
    const doc = await db.collection('posts').doc(postId).collection('messages')
      .get()
      // .then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.data());
      //   })
      // })
      console.log(doc)
      doc.docs.forEach((doc) => {
        this.messages.push(doc.data())
      })
    
    // this.post = doc.data()
    //   console.log(this.post)

    // const messageId = db.collection('posts').doc(postId).collection('messages').doc().id
    // this.messageRef = db.collection('posts').doc(postId).collection('messages').doc(messageId).get()
    // this.message = doc.data()
    //   console.log(messageId)
  },
  methods: {
    async fetchMessages () {
      this.messages = []
      const snapshot = await db.collection('posts').doc(postId).collection('messages')
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data())
            this.messages.push(doc.data());
          })
        })

      // console.log(this.message.id)
      // .then((snapshot)=>{
      //   snapshot.forEach((doc)=>{
      //     this.messages.push(doc.data());
      //   });
      // });
    }
  },
}
</script>
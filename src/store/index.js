import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase connection
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)

})

const store = new Vuex.Store ({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val){
      state.posts =  val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } =  await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      //fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      //set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create   user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      dispatch('fetchUserProfile', user)
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear user profile and redirect to login
      commit('setUserProfiile', {})
      router.push('/login')
    },
    async createPost({ state, commit }, post ) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userID: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments:0,
        likes: 0
      })
    }
  },
  modules: {
  }
})

export default store

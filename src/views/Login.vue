<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <CompleteSignup v-if="toggleCompleteSignup" @close="toggleCompleteSignup()"></CompleteSignup>
    <section>
      <div class="col1">
        <h1>Polyrise</h1>
        <p>Sup home skillet</p>
      </div>
      <div class="col2">
        <button @click="googleSignIn">
          Sign In with Google
        </button>
        
        <button @click="emailSignIn">
          Sign In with Email
        </button>
        

        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="emailLogin()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="showSignup()">Create an Account</a>
          </div>
        </form>
        <form v-if="showSignupForm" @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Awesome person" id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="email" placeholder="you@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="showLoginOptions()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
import CompleteSignup from '@/components/CompleteSignup'
import firebase from "firebase";

export default {
  components: {
    PasswordReset,
    CompleteSignup
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: false,
      showSignupForm: false,
      showPasswordReset: false,
      toggleCompleteSignup: false,
    }
  },
  methods: {
    googleSignIn (){
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
            console.log(token) // Token
            console.log(user) // User that was authenticated
            this.toggleCompleteSignup = !this.toggleCompleteSignup
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
   },
    emailLogin() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        name: this.signupForm.name,
        title: this.signupForm.title,
        email: this.signupForm.email,
        password: this.signupForm.password,
      })
    },
    emailSignIn() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    showSignup() {
      this.showSignupForm = !this.showSignupForm
      this.showLoginForm = !this.showLoginForm
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
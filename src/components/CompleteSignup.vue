<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')" class="close">close</div>
      <h3>Complete Signup</h3>
      <div>
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <div>
            <label for="name2">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Awesome person" id="name2" />
          </div>
          <div>
            <label for="title2">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title2" />
          </div>
          <button @click="completeSignup()" class="button">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

export default {
  data() {
    return {
      signupForm: {
        name: '',
        title: '',
      },
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    completeSignup() { 
      this.store.dispatch('completeSignup', {
        name: this.signupForm.name,
        title: this.signupForm.title,
      })
    },
  }
}
</script>
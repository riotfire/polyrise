<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>Create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.content }}</h5>
            <span>{{ post.createdOn }}</span>
            <p>{{ post.userName }}</p>
            <ul>
              <li><a>comments {{ post.comments }}</a></li>
              <li><a>likes {{ post.likes }}</a></li>
              <li><a>view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      post: {
        content:'',
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    createPost(){
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
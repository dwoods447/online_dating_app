<template>
  <div>
      <div v-if="users.length > 0">
       <paginate name="userResults" :list="userResults" :per="6">
        <ProfilePreview v-for="user in paginated('userResults')" :profile="user" :key="user._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
       </paginate>
       </div>
         <div class="flex-container">
              <paginate-links for="users" :async="true" :classes="{'ul':'pagination', 'li':'page-item', 'a':'page-link'}"></paginate-links>
         </div>
  </div>
</template>

<script>
import eventBus from '../../middleware/eventBus/index'
import ProfilePreview from '../../components/profile/preview/ProfilePreview'
  export default {
    components: { ProfilePreview },
    created(){
       eventBus.$on('search-results', (data) => {
            this.users = [];
            this.users = data.results;
       })
    },
    data(){
      return {
            users: [],
            paginate:['userResults']
      }
    },
    computed: {
      userResults(){
        return this.users;
      }
    }
  }
</script>

<style scoped>

</style>

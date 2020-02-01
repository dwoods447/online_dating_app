<template>
  <div>
        <ProfilePreview v-for="user in users" :profile="user" :key="user._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
  </div>
</template>

<script>
import eventBus from '../../middleware/eventBus/index'
import ProfilePreview from '../../components/profile/preview/ProfilePreview'
  export default {
    components: { ProfilePreview },
    created(){
       eventBus.$on('search-results', (data) => {
            this.users = data.results;
       })
    },
    data(){
      return {
            users: [],
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>

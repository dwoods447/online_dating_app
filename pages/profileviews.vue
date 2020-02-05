<template>
  <div>
    <h2>Profile Views</h2>
    <section>
      <ProfilePreview v-for="view in views" :profile="view.userId" :key="view._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
    </section>
  </div>
</template>

<script>
  import UserProfileService from '../middleware/services/UserProfileService'
  import ProfilePreview from '../components/profile/preview/ProfilePreview'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    components: {ProfilePreview},
    created(){
        this.getUserProfileViews();
    },
    data(){
      return {
        views: [],
      }
    },
    methods: {
      async getUserProfileViews(){
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const userViews = (await UserProfileService.getUserProfileViews()).data
        //console.log(`Profile Views Response: ${JSON.stringify(userViews)}`)
        if(userViews.views){
          this.views = userViews.views.profileViews.views;
         console.log(`Profile Views Response: ${JSON.stringify(this.views, null ,2)}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

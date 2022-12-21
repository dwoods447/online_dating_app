<template>
  <div>

    <section style="max-width: 1200px; margin: 0 auto;">
       <h2>Profile Views</h2>
      <ProfilePreview v-for="view in views" :profile="view.userId" :key="view._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
    </section>
  </div>
</template>

<script>
  import UserProfileService from '../middleware/services/UserProfileService'
  import ProfilePreview from '../components/profile/preview/ProfilePreview'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile', 'checkPremium'],
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
        if(userViews.views){
          // this.views = userViews.views.profileViews.views;
          userViews.views.profileViews.views.forEach((view)=>{
             if(view !== null){
               this.views.push(view);
             }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

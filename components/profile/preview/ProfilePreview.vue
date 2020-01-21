<template>
  <div>
        <div>
          <div class="">
            <a @click="goToProfileDetail(profile._id, profile)" href="#"><img src="http://placehold.it/150x150" alt=""><br/>{{ profile.username }}</a>
          </div>
        </div>
  </div>
</template>

<script>
  export default {
    props: ['profile'],
    data(){
      return {

      }
    },
    methods: {
        goToProfileDetail(id, profile){
          console.log(`Profile: ${JSON.stringify(profile)}`);
          this.$router.push({path: '/profile/'+ id, params: {id: id, userProfile: profile}});
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>

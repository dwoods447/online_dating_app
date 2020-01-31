<template>
  <div>
          <button class="btn btn-primary" @click="addUserUToBlockList()">Block this User</button>
          <!-- <input type="hidden" name="userId" :value="this.userId"> -->
  </div>
</template>

<script>
  export default {
    props: ['userId'],
    data(){
      return {

      }
    },
    methods: {
      async addUserUToBlockList(){
        console.log(`Blocking user with an Id if ${this.userId}`);
        const message = await this.$store.dispatch('addUserUToBlockListAction', {userToBlockId: this.userId});
        if(message ){
          console.log(`Message returned in addUserUToBlockList button component: ${message}`);
          setTimeout(()=>{
            this.$router.push({name: 'basicsearch'});
          }, 8000);

        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

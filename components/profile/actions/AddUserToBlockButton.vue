<template>
  <div>
          <button class="btn btn-primary" @click="addUserUToBlockList()"><i class="fas fa-ban"></i> &nbsp;Block this User</button>
          <!-- <input type="hidden" name="userId" :value="this.userId"> -->
  </div>
</template>

<script>
import eventBus from '../../../middleware/eventBus/index'
  export default {
    props: ['userId'],
    data(){
      return {

      }
    },
    methods: {
      async addUserUToBlockList(){
        const message = await this.$store.dispatch('addUserUToBlockListAction', {userToBlockId: this.userId});
        if(message.message === 'User added to your block list'){
          setTimeout(()=>{
           eventBus.$emit('setActiveLink', 'isShowSearch');
            eventBus.$emit('button-response-recieved', message.message);
            this.$router.push({name: 'basicsearch'});
          }, 8000);

        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

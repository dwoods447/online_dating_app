<template>
  <div>
      Inbox Page



         <InboxNavBox></InboxNavBox>
          <div v-if="showUserInbox">
             <MessageInbox></MessageInbox>
          </div>
          <div v-if="showUserSentMessages">
            <SentMessages></SentMessages>
          </div>


  </div>
</template>

<script>
 import MessageInbox from '../../components/profile/inbox/MessageInbox'
 import InboxNavBox from '../../components/profile/inbox/InboxNavTab'
 import SentMessages from '../../components/profile/inbox/SentMessages'
import eventBus from '../../middleware/eventBus/index'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    components: { MessageInbox, InboxNavBox, SentMessages },
    created(){
        eventBus.$on('showUserInbox',()=>{
          console.log('Showing user inbox');
          this.showUserInbox = true;
          this.showUserSentMessages = false;
      })
        eventBus.$on('showUserSentMessages',()=>{
            console.log('Showing user sent messages');
            this.showUserInbox = false;
            this.showUserSentMessages = true;
        })
    },
    data(){
      return {
        showUserInbox: true,
        showUserSentMessages: false,
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

</style>

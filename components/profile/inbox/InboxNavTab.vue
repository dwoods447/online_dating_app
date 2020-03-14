<template>
  <div>
       <nav class="nav nav-tabs" >
          <a href="#" @click="showUserInbox" :class="[{active: isInboxActive},'nav-item', 'nav-link']">
              <i class="fas fa-envelope"></i>&nbsp;&nbsp;User Inbox Messages
          </a>
          <a href="#" @click="showUserSentMessages" :class="[{active: isSentMessagesActive}, 'nav-item', 'nav-link']">
              <i class="fas fa-share-square"></i>&nbsp;&nbsp;Sent Messages
          </a>
      </nav>
  </div>
</template>

<script>
  import eventBus from '../../../middleware/eventBus/index'
  export default {
    data(){
      return {
        isInboxActive: true,
        isSentMessagesActive: false,
      }
    },
    methods: {
        showUserInbox(){
           this.isInboxActive = true;
           this.isSentMessagesActive = false;
           eventBus.$emit('showUserInbox');
        },
        showUserSentMessages(){
           this.isInboxActive = false;
           this.isSentMessagesActive = true;
            eventBus.$emit('showUserSentMessages');
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>

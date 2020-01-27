<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
             <div v-if="messages.length <= 0">You have No messages</div>
              <div v-for="sender in messages" style="width: 90%; margin: 0 auto;">
                <a href="#">
                  <div  style="width: 900px; display: block; border: 2px solid #000;  box-shadow: 2px 3px #000; padding: 2em; margin: 10px;">
                      <div> From: {{ sender.from }} </div>
                       <div v-for="(message, i) in sender.inbox.messages">
                      <div v-if="i == 0">{{message.content}}   <span v-if="sender.inbox.messages.length > 1">({{ sender.inbox.messages.length }})</span></div>
                    </div>
                  </div>
                </a>
             </div>

             <div >

                    <br/>


             </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
import MessageInboxPreview from './MessageInboxPreview'
  export default {
    components :{ MessageInboxPreview },
    created(){
        this.getUserMessages();
    },
    data(){
      return {
        messages: [],
      }
    },

    methods: {
        async getUserMessages(){
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const messageData = await UserProfileService.getUserMessages()
            console.log(`Message data returned ${JSON.stringify(messageData.data.messageInbox, null, 2)}`)
            if(messageData.data.messageInbox.length > 0 ){
                this.messages = messageData.data.messageInbox;
            } else {
              return this.messages = [];
            }
        },

        showUserMessage(messageThread){
              this.$router.push('/message/', {params: {thread: messageThread}});
        },
    },
  }
</script>

<style lang="scss" scoped>

</style>

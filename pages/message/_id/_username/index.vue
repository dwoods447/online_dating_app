<template>
  <div>
      Username
      {{this.$route.params}}
          <ul>
            <li v-for="message in senderMessages">{{message.username }}: {{message.content}}</li>
          </ul>
           <SendMessage :userId="this.$route.params.id" >Send Message</SendMessage>
  </div>
</template>

<script>
import UserProfileService from '../../../../middleware/services/UserProfileService'
import SendMessage from '../../../../components/profile/message/SendMessage'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    components: {
      SendMessage,
    },
    created(){
        this.getUserMessages();
        this.getSendersMessages();
    },
    data(){
      return {
        messages: [],
        senderMessages: [],
      }
    },
    methods:{
       async getUserMessages(){
            let messageToFilter;
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const messageData = await UserProfileService.getUserMessages()
            if(messageData.data.messages.length > 0 ){
               messageToFilter = messageData.data.messages;
               messageToFilter =  messageToFilter.filter(message =>{
                 return message._id.from === this.$route.params.id;
               })

              this.messages  =  messageToFilter;
              console.log(`Message thread returned for user ${this.messages}`);
            }
        },

        async getSendersMessages(){
           const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
           const messageData = await UserProfileService.getSenderMessages(this.$route.params.id);
           if(messageData.data.messages.length > 0){
              this.senderMessages = messageData.data.messages;
           }
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>

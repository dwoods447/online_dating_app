<template>
  <div>
      Username
      {{this.$route.params}}
          <ul>
            <li v-for="msg in messages">{{ msg.content }}</li>
          </ul>
           <SendMessage :userId="this.$route.params.id" >Send Message</SendMessage>
  </div>
</template>

<script>
import UserProfileService from '../../../../middleware/services/UserProfileService'
import SendMessage from '../../../../components/profile/message/SendMessage'
  export default {
    components: {
      SendMessage,
    },
    created(){
        this.getUserMessages();
    },
    data(){
      return {
        messages: [],
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

              this.messages  =  messageToFilter[0].messageContent;
            }
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <section>
      <div style="width: 40%; margin: 0 auto;">
          <h3>Messages thread from:  {{this.$route.params.username}}</h3>

            <ul>
              <li v-for="message in senderMessages">
              <div v-if="message.recipient.id !== $store.state.userId._id" style="display: inline-block;">
                  <p><strong> You:</strong></p>
              </div>
               <div v-if="message.recipient.id == $store.state.userId._id" style="display: inline-block;">
                  <p><strong> {{$route.params.username}}:</strong></p>
              </div>
               <!-- <div v-if="message.recipient.id === $store.state.userId._id" style="display: inline-block;">
                <div v-if="message.recipient.username">
                   <strong>You:</strong>&nbsp;&nbsp;
                </div>
              </div> -->
              {{message.content}}
              </li>
          </ul>

      </div>
      <SendMessage :userId="this.$route.params.id" >Send Message</SendMessage>
    </section>

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

              messageToFilter =  messageToFilter.sort((a, b)=>{
                if(b.date < a.date){
                  return 1;
                }
                if(a.date > b.date){
                  return -1;
                }
                return 0;
              })
              this.messages  =  messageToFilter;
             // console.log(`Message thread returned for user ${JSON.stringify(this.messages)}`);
            }
        },

        async getSendersMessages(){
           const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
           const messageData = await UserProfileService.getSenderMessages(this.$route.params.id);
           if(messageData.data.messages.length > 0){
              this.senderMessages = messageData.data.messages;
               console.log(`Message thread returned for user ${JSON.stringify(this.senderMessages, null ,2)}`);
           }
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>

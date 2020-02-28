<template>
  <div>
    <section>
      <div style="width: 40%; margin: 0 auto;">
          <!-- <h3>Messages thread from:  {{this.$route.params.username}}</h3> -->

            <ul>
              <li v-for="(message, i) in usersMessages" :key="message.recipient.id+'-'+i">

               <!-- <div v-if="message.sender.id == $store.state.userId._id" style="display: inline-block;">
                  <p><strong> You:</strong></p>
              </div>
               <div v-if="message.recipient.id == $route.params.id" style="display: inline-block;">
                  <p><strong> {{$route.params.username}}:</strong></p>
               </div> -->
              <strong>{{message.sender.username}}:</strong>
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
import eventBus from '../../../../middleware/eventBus/index'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    components: {
      SendMessage,
    },
    created(){
        eventBus.$on('message-sent', ()=>{
          this.getSendersMessages();
        })
        this.getUserMessages();
        this.getSendersMessages();
    },
    data(){
      return {
        messages: [],
        senderMessages: [],
      }
    },
    computed: {
       usersMessages(){
         return this.senderMessages;
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
           }
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>

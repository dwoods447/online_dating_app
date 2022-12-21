<template>
  <div>
    <section style="max-width: 1200px; margin: 0 auto;">
      <div  class="message-thread-container" style="width: 100%; margin: 15px auto; max-height: 550px; overflow: auto;">
          <!-- <h3>Messages thread from:  {{this.$route.params.username}}</h3> -->

            <div>
              <div v-for="(message, i) in usersMessages" :key="message.recipient.id+'-'+i" :class="[{ 'darker': i % 2 !== 0}, 'message-thread']">
              <div>
                <div  v-if="message.sender.random === 'true'">
                  <div v-if="message.sender.gender === 'male'">
                     <img :src="message.sender.imageSrc|maleImageSrcFilter" alt="" :class="[{ 'right': i % 2 !== 0}]"/>
                     <a :href="'./../../profile/'+message.sender.id" target="_blank"><p :class="[{ 'align-right': i % 2 !== 0}]"><strong>{{ message.sender.username }}</strong></p></a>
                  </div>
                  <div v-if="message.sender.gender === 'female'">
                     <img :src="message.sender.imageSrc|femaleImageSrcFilter" alt="" :class="[{ 'right': i % 2 !== 0}]"/>
                      <a :href="'./../../profile/'+message.sender.id" target="_blank"><p :class="[{ 'align-right': i % 2 !== 0}]"><strong>{{ message.sender.username }}</strong></p></a>
                  </div>
                  <div v-if="message.sender.gender === 'trans-male'">
                     <img :src="message.sender.imageSrc|transMaleImageSrcFilter" alt="" :class="[{ 'right': i % 2 !== 0}]"/>
                      <a :href="'./../../profile/'+message.sender.id" target="_blank"><p :class="[{ 'align-right': i % 2 !== 0}]"><strong>{{ message.sender.username }}</strong></p></a>
                  </div>
                   <div v-if="message.sender.gender === 'trans-female'">
                      <img :src="message.sender.imageSrc|transFemaleImageSrcFilter" alt="" :class="[{ 'right': i % 2 !== 0}]"/>
                       <a :href="'./../../profile/'+message.sender.id" target="_blank"><p :class="[{ 'align-right': i % 2 !== 0}]"><strong>{{ message.sender.username }}</strong></p></a>
                  </div>
                </div>
                <div  v-if="message.sender.random === 'false'">
                   <img :src="message.sender.imageSrc|imageSrcFilter" alt="" :class="[{ 'right': i % 2 !== 0}]"/>
                    <a :href="'./../../profile/'+message.sender.id" target="_blank"><p :class="[{ 'align-right': i % 2 !== 0}]"><strong>{{ message.sender.username }}</strong></p></a>
                </div>
                <p></p>
                </div>
              <p :class="[{ 'align-right': i % 2 !== 0}]">{{message.content}}</p>
              </div>
           </div>

      </div>
         <SendMessage :userId="this.$route.params.id">Send Message</SendMessage>

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
    mounted(){
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
     filters:{
        imageSrcFilter(src){
          return '../../uploads/'+src;
        },
        maleImageSrcFilter(src){
          return '../../random-users/men/'+ src;
        },
        femaleImageSrcFilter(src){
          return '../../random-users/women/'+ src;
        },
        transMaleImageSrcFilter(src){
          return '../../random-users/men/'+ src;
        },
        transFemaleImageSrcFilter(src){
          return '../../random-users/women/'+ src;
        },
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
            }
        },

        async getSendersMessages(){
           const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
           const messageData = await UserProfileService.getSenderMessages(this.$route.params.id);
           if(messageData.data.deletedAccount === true){
             this.$router.push({name: `deletedprofile`});
             return;
           }
           if(messageData.data.deletedAccount === false && messageData.data.messages.length > 0){
              this.senderMessages = messageData.data.messages;

           }

        }
    }
  }
</script>

<style scoped>
  .message-thread{
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  }

  .darker {
  border-color: #ccc;
  background-color: #ddd;
  }
  .message-thread::after {
  content: "";
  clear: both;
  display: table;
}

.message-thread img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.message-thread img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

.align-right{
  text-align: right;
}


.message-thread-container::-webkit-scrollbar {
    width: 1em;
}

.message-thread-container::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.message-thread-container::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

</style>

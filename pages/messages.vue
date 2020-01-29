<template>
  <div>
        <!-- Route Params: {{ $route.params }}<br/> -->
           <!-- {{ this.$route.params.routeParams.thread }}<br/> -->
              <ul>
                <li v-for="message in messages">{{message.content}}  -------- {{message.date}}</li>
              </ul>
        <Message></Message>
  </div>
</template>

<script>
import Message from '../components/profile/inbox/Message'
  export default {
    components: { Message },
    props: {

    },
    data(){
      return {
        messages: this.$route.params.routeParams.thread
      }
    },

    methods: {
      getSenderDetails(){

      },

      changeMessageToRead(){

      }

    }
  }
</script>

<style lang="scss" scoped>

</style>

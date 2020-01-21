<template>
  <div>
       <form @submit.prevent="sendUserMessage(userId)" style="max-width: 20%; margin: 0 auto;">
       <textarea name="message" id="message" cols="30" rows="10">Send Them a message!</textarea>
       <button>Send</button>
      </form>

  </div>
</template>

<script>
  export default {
    props: {
      userId: {
        type: String,
        required : true
      }
    },
    mounted(){
      console.log(`Id is send message: ${this.userId}`)
    },
    data(){
      return {

      }
    },
    methods: {
       async sendUserMessage(recieverId){
          console.log(`Sending user a messagew with id: ${recieverId}`);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
        <div class="row">
          <div class="col-lg-12">
             <div class="row">
               <div class="col-lg-2">
                  <img src="http://placehold.it/100x100" alt="">
               </div>
                <div class="col-lg-9">
                  <h3>{{ message.sender }}, {{ message.sender.age }}</h3>
                  <p></p>
                </div>
               <div class="col-lg-1">
                 <p>{{ message.sender }}, {{ message.sender.age }}</p>
               </div>
             </div>
          </div>
        </div>
  </div>
</template>

<script>
import Message from './Message'
  export default {
    props: ['message'],
    data(){
      return {
        sender: '',
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

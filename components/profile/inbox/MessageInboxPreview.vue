<template>
  <div>
        <div class="row">
          <div class="col-lg-12">
             <div class="row">
               <div class="col-lg-2">
                  imagePath: {{ imagePath }}
               </div>
                <div class="col-lg-9">
                  <h3>Message: {{ message }}</h3>
                  <p></p>
                </div>
               <div class="col-lg-1">
                  Date: {{ date}}
               </div>
             </div>
          </div>
        </div>
  </div>
</template>

<script>
import Message from './Message'
  export default {
    props: ['message', 'imagePath', 'date'],
    created(){
      console.log(`Message in preview: ${JSON.stringify(this.message)}`)
    },
    data(){
      return {
        sender: '',
      }
    },
    methods :{

    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <div class="col-lg-12">
        <p>Upload your image:</p>
        <form @submit.prevent="onUpload" method="post" enctype="multipart/form-data">
            <div class="form-group">
              <input type="file" name="image"  @change="onFileSelect" class="form-control">
            </div>
            <div class="form-group">
              <button @click="onUpload"  class="btn btn-primary">Upload</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
 import UserProfileService from '../../../middleware/services/UserProfileService'
  export default {
    components:{},
    data(){
      return {
        selectedFile: null,
      }
    },
    methods: {
        onFileSelect(e){
         this.selectedFile = e.target.files[0]
          if (this.selectedFile) {
            // File is selected
            console.log(`File selected ${JSON.stringify(this.selectedFile)}`)
             console.log(`File NAME ${JSON.stringify(this.selectedFile.name)}`)
          }
        },
        async onUpload(){
          try{
            console.log(`Sending img: ${JSON.stringify(this.selectedFile)}`);
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const uploadImg = await UserProfileService.uploadImg(this.selectedFile);
          } catch(err){
              console.log(`Error uploading file: ${err}`)
          }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

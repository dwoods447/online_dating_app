<template>
  <div>
    <div class="col-lg-12">
        <p>Upload your image:</p>
        <form @submit.prevent="onUpload" enctype="multipart/form-data">
            <div class="form-group">
              <input type="file" name="image" ref="image" @change="onFileSelect" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn btn-primary">Upload</button>
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
        onSelectFile: null,
      }
    },
    methods: {
        onFileSelect(e){
         this.selectedFile = e.target.files[0];
         this.onSelectFile = this.$refs.image.files[0];

          if (this.selectedFile) {
            // File is selected
            console.log(`File selected ${JSON.stringify(this.selectedFile)}`)
             console.log(`File NAME ${JSON.stringify(this.selectedFile.name)}`)

              console.log(`OnSelectFile selected ${JSON.stringify(this.onSelectFile )}`)
             console.log(`OnSelectFile NAME ${JSON.stringify(this.onSelectFile.name)}`)
          }
        },
        async onUpload(){
          let formData = {}
          try{
            if(this.onSelectFile){
            formData.image = this.onSelectFile;
            console.log(`Sending img: ${JSON.stringify(formData)}`);
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const uploadImg = await UserProfileService.uploadImg(formData);
            }

          } catch(err){
              console.log(`Error uploading file: ${err}`)
          }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

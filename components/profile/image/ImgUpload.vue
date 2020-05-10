<template>
  <div>
    <div class="col-lg-12" v-if="showImageUpload">
        <p>Upload your image:</p>
        <div >
          <img :src="imgPreview" alt=""><span @click="removeSelectedFile" v-if="imgPreview">X</span>
        </div>
        <p v-if="message">{{ message }}</p>
        <form @submit.prevent="onUpload" enctype="multipart/form-data" >
            <div class="form-group">
              <input type="file" name="image" ref="image" @change="onFileSelect" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn btn-primary">Upload</button>
            </div>
        </form>
        <div><small><em>Maxium file size is 4MB</em></small></div>
    </div>
  </div>
</template>

<script>
 import UserProfileService from '../../../middleware/services/UserProfileService'
 import eventBus from '../../../middleware/eventBus/index'
  export default {
    components:{},
    data(){
      return {
        selectedFile: null,
        onSelectFile: null,
        previewSrc: '',
        message: '',
      }
    },
    computed: {
       imgPreview(){
         return this.previewSrc;
       }
    },
    methods: {
          showImageUpload(){
          if(this.$store.state.userId.images.imagePaths.length < 1){
            return false;
          }
          if(this.$store.state.userId.images.imagePaths.length == 1){
            return true;
          }
          if(this.$store.state.userId.images.imagePaths.length == 2){
            return true;
          }
          if(this.$store.state.userId.images.imagePaths.length == 3){
            return true;
          }
          if(this.$store.state.userId.images.imagePaths.length == 4){
            return true;
          }
        },
        onFileSelect(e){
         this.selectedFile = e.target.files[0];
         this.onSelectFile = this.$refs.image.files[0];
        const reader = new FileReader();
          if (this.selectedFile) {
            // File is selected
            const reader = new FileReader();
            reader.onload = e =>  this.previewSrc = e.target.result;
            reader.readAsDataURL(this.selectedFile);
          }
        },
        removeSelectedFile(){
           this.onSelectFile = null;
           this.selectedFile = null;
           this.$refs.image.value = null;
           this.previewSrc = '';
        },
        async onUpload(){
          let formData = {}
          try{
            if(this.onSelectFile){
            formData.image = this.onSelectFile;
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const uploadImg = await UserProfileService.uploadImg(formData);
              if(uploadImg.data.user){
                  this.$store.dispatch('setLoggedInUserIdAction', uploadImg.data.user);
                  this.message =  uploadImg.data.message;
                  eventBus.$emit('image-uploaded');
                  setTimeout(()=>{
                    this.removeSelectedFile();
                   this.previewSrc = uploadImg.data.user.images.imagePaths[0];
                  }, 3000)

              }
            }

          } catch(err){
              console.log(`Error uploading file: ${err}`)
          }
      },
    }
  }
</script>

<style scoped>

</style>

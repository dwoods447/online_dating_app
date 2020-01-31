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
          console.log(`current Img array length: ${this.$store.state.userId.images.imagePaths.length}`)
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
            console.log(`File selected ${JSON.stringify(this.selectedFile)}`)
             console.log(`File NAME ${JSON.stringify(this.selectedFile.name)}`)

              console.log(`OnSelectFile selected ${JSON.stringify(this.onSelectFile )}`)
             console.log(`OnSelectFile NAME ${JSON.stringify(this.onSelectFile.name)}`)
          }
        },
        removeSelectedFile(){
           this.onSelectFile = null;
           this.selectedFile = null;
           this.$refs.image.value = null;
           this.previewSrc = '';
           console.log(`file ref ${this.$refs.image}`);
           console.log(`file ref ${this.$refs.image}`);
        },
        async onUpload(){
          let formData = {}
          try{
            if(this.onSelectFile){
            formData.image = this.onSelectFile;
            console.log(`Sending img: ${JSON.stringify(formData)}`);
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const uploadImg = await UserProfileService.uploadImg(formData);
              if(uploadImg.data.user){
                  this.$store.dispatch('setLoggedInUserIdAction', uploadImg.data.user);
                  this.message =  uploadImg.data.message;
                  setTimeout(()=>{
                    this.removeSelectedFile();
                   this.previewSrc = user.images.imagePaths[0];
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

<style lang="scss" scoped>

</style>

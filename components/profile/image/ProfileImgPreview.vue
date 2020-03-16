<template>
  <div>
        <div v-if="random === 'true'">
           <div v-if="gender === 'male'">
             <div class="img-thumbnail-preview-container"><img :src="images[imageIndex].path|maleImageSrcFilter" class="img-thumbnail-preview"></div>
           </div>
             <div v-if="gender === 'female'">
              <div class="img-thumbnail-preview-container"><img :src="images[imageIndex].path|femaleImageSrcFilter" class="img-thumbnail-preview"> </div>
             </div>
             <div v-if="gender === 'trans-female'">
             <div class="img-thumbnail-preview-container"><img :src="images[imageIndex].path|transFemaleImageSrcFilter" class="img-thumbnail-preview"></div>
            </div>
             <div v-if="gender === 'trans-male'">
                  <div class="img-thumbnail-preview-container"><img :src="images[imageIndex].path|transMaleImageSrcFilter" class="img-thumbnail-preview"></div>
              </div>
           </div>
           <div v-if="random === 'false'">
               <div class="img-thumbnail-preview-container"><img :src="images[imageIndex].path|imageSrcFilter" alt="" class="img-thumbnail-preview"></div>
        </div>
  </div>
</template>

<script>
  export default {
    props: {
      gender: {
        type: String,
        required: true,
      },
      random: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
      },
      imageIndex: {
        type: Number
      }

    },
    data(){
      return {

      }
    },
    filters: {
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
    }
  }
</script>

<style scoped>
.img-thumbnail-preview-container{
  max-width: 90px;
  max-height: 90px;
  margin: 5px;
}
  .img-thumbnail-preview{
    width: 100%;
  }
</style>

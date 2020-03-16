<template>
  <div>
        <div v-if="random === 'true'">
           <div v-if="gender === 'male'">
             <div style="width: 100%; display: block;"><img :src="images[imageIndex].path|maleImageSrcFilter" style="width: 100%;"></div>
           </div>
             <div v-if="gender === 'female'">
              <div style="width: 100%; display: block;"><img :src="images[imageIndex].path|femaleImageSrcFilter" style="width: 100%;"> </div>
             </div>
             <div v-if="gender === 'trans-female'">
             <div style="width: 100%; display: block;"><img :src="images[imageIndex].path|transFemaleImageSrcFilter" style="width: 100%;"></div>
            </div>
             <div v-if="gender === 'trans-male'">
                  <div sstyle="width: 100%; display: block;"><img :src="images[imageIndex].path|transMaleImageSrcFilter" style="width: 100%;"></div>
              </div>
           </div>
           <div v-if="random === 'false'">
               <div style="max-width: 127px; max-height: 127px;"><img :src="images[imageIndex].path|imageSrcFilter" alt=""></div>
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

</style>

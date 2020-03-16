<template>
  <div>
    <div>
        <div v-if="randomType === 'true'" style="width: 500px; height: 500px;">
              <div v-if="genderType === 'male'">
                <img :src="myImagePath|maleImageSrcFilter" alt="" style="width: 100%; display: block;">
              </div>
              <div v-if="genderType === 'female'">
                <img :src="myImagePath|femaleImageSrcFilter" alt="" style="width: 100%; display: block;">
              </div>
              <div v-if="genderType === 'trans-male'">
                <img :src="myImagePath|transMaleImageSrcFilter" alt="" style="width: 100%; display: block;">
              </div>
              <div v-if="genderType === 'trans-female'">
                <img :src="myImagePath|transFemaleImageSrcFilter" alt="" style="width: 100%; display: block;">
              </div>
          </div>
          <div v-if="randomType === 'false'" style="width: 500px; height: 500px;">
            <img :src="myImagePath|imageSrcFilter" alt="" style="width: 100%; display: block;">
        </div>
    </div>


  </div>
</template>

<script>

  export default {
     props: {
        imageSrc: {
          type: String
        },
        genderType: {
          type: String
        },
        randomType: {
          type: String
        }
    },
    mounted(){
      console.log(`Main Image Rendered....`);
      console.log(`imageSrc: ${this.imageSrc}`);
      console.log(`Gender: ${this.genderType}`);
      console.log(`Random: ${this.randomType}`);
    },
    data(){
      return {

      }
    },
    computed: {
      myImagePath(){
        return this.imageSrc;
      }
    },
    filters: {
      imageSrcFilter(src){
         console.log(`imageFilter src ${src}`);
         if(src){
            return '../../uploads/'+src;
         } else {
           return 'http://placehold.it/500x500';
         }

      },
      maleImageSrcFilter(src){
         console.log(`maleImageSrcFilter src ${src}`);
           if(src){
             return '../../random-users/men/'+ src;
           }else {
             return 'http://placehold.it/500x500';
           }

      },
      femaleImageSrcFilter(src){
         console.log(`femaleImageSrcFilter src ${src}`);
          if(src){
           return '../../random-users/women/'+ src;
          }else {
            return 'http://placehold.it/500x500';
          }
      },
      transMaleImageSrcFilter(src){
         console.log(`transMaleImageSrcFilter src ${src}`);
          if(src){
            return '../../random-users/men/'+ src;
          } else {
            return 'http://placehold.it/500x500';
          }
      },
      transFemaleImageSrcFilter(src){
         console.log(`transFemaleImageSrcFiltersrc ${src}`);
          if(src){
             return '../../random-users/women/'+ src;
         } else {
            return 'http://placehold.it/500x500';
        }
      },
    }
  }
</script>

<style  scoped>

</style>

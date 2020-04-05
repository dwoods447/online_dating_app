<template>
  <div>
    <div>
        <div v-if="randomType === 'true'" >
              <div v-if="genderType === 'male'" style="" class="main-profile-container">
                <img :src="myImagePath|maleImageSrcFilter" alt="" style="" class="main-profile-image">
              </div>
              <div v-if="genderType === 'female'" class="main-profile-container">
                <img :src="myImagePath|femaleImageSrcFilter" alt="" style="width: 100%; display: block;" class="main-profile-image">
              </div>
              <div v-if="genderType === 'trans-male'" class="main-profile-container">
                <img :src="myImagePath|transMaleImageSrcFilter" alt="" style="width: 100%; display: block;" class="main-profile-image">
              </div>
              <div v-if="genderType === 'trans-female'" class="main-profile-container">
                <img :src="myImagePath|transFemaleImageSrcFilter" alt="" style="width: 100%; display: block;" class="main-profile-image">
              </div>
          </div>
          <div v-if="randomType === 'false'"  class="main-profile-container">
            <img :src="myImagePath|imageSrcFilter" alt="" style="width: 100%; display: block;" class="main-profile-image">
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

<style>
.main-profile-image{
  border: 1px solid #eee;
  width: 100%;
  display: block;
}

.main-profile-container{
width: 500px;
height: 500px;
}


</style>

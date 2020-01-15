<template>
  <div>
     <h2>Edit Your Profile</h2>
     <form @submit.prevent="updateExtentedUserProfile">
      <label class="typo__label">Single select / dropdown</label>
      <!-- <multiselect
        v-model="seekingGender"
        :options="seekingGenders">
        <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> </template>
      </multiselect> -->


       <div class="form-group">
        <label for="">Marital Status</label>
        <multiselect
        v-model="maritalStatus"
        :options="maritalStatuses">
         <template slot="singleLabel" slot-scope="{ status }"><strong>{{ status.name }}</strong></template>
        </multiselect>
      </div>

      <div class="form-group">
        <label for="">Your Height</label>
        <multiselect
        v-model="height"
        :options="heights">
         <template slot="singleLabel" slot-scope="{ size }"><strong>{{ size.name }}</strong></template>
      </multiselect>
      </div>
       <div class="form-group">
        <label for="">Your Hair color</label>
         <multiselect
        v-model="hairColor"
        :options="hairColors">
        <template slot="singleLabel" slot-scope="{ color }"><strong>{{ color.name }}</strong></template>
      </multiselect>
      </div>

        <div class="form-group">
        <label for="">Your eye color</label>
         <multiselect
        v-model="eyeColor"
        :options="eyeColors">
        <template slot="singleLabel" slot-scope="{ eyeColor }"><strong>{{ eyeColor.name }}</strong></template>
       </multiselect>
      </div>

       <div class="form-group">
        <label for="">Your religion</label>
          <multiselect
        v-model="religion"
        :options="religions">
        <template slot="singleLabel" slot-scope="{ religion }"><strong>{{ religion.name }}</strong></template>
       </multiselect>
      </div>


      <div class="form-group">
        <label for="">Your Profession</label>
        <input type="text" v-model="profession"  class="multiselect__input" style="border: 1px solid #000;">
      </div>


        <div class="form-group">
        <label for="">Your highest education</label>

       <multiselect
        v-model="highestEducation"
        :options="educations">
         <template slot="singleLabel" slot-scope="{ education }"><strong>{{ education.name }}</strong></template>
       </multiselect>
      </div>

      <div class="form-group">
        <label for="">Do you smoke?</label>
       <multiselect
        v-model="doesSmoke"
        :options="doesSmokeChoices">
         <template slot="singleLabel" slot-scope="{ choice }"><strong>{{ choice.name }}</strong></template>
       </multiselect>
      </div>




        <div class="form-group">
        <label for="">Do you drink?</label>
        <multiselect
        v-model="doesDrink"
        :options="doesDrinkChoices">
         <template slot="singleLabel" slot-scope="{ choice }"><strong>{{ choice.name }}</strong></template>
       </multiselect>
      </div>

       <div class="form-group">
        <label for="">Do you do drugs?</label>
          <multiselect
          v-model="doesDoDrugs"
          :options="doesDoDrugsChoices">
          <template slot="singleLabel" slot-scope="{ choice }"><strong>{{ choice.name }}</strong></template>
        </multiselect>
      </div>


      <div class="form-group">
        <label for="">Do you have children?</label>
        <multiselect
        v-model="doesHaveChildren"
        :options="doesHaveChildrenChoices">
         <template slot="singleLabel" slot-scope="{ choice }"><strong>{{ choice.name }}</strong></template>
       </multiselect>
      </div>


       <div class="form-group">
        <label for="">Second Language</label>
        <multiselect
        v-model="secondLanguage"
        :options="languages">
         <template slot="singleLabel" slot-scope="{ language }"><strong>{{ language.name }}</strong></template>
       </multiselect>
      </div>


      <div class="form-group">
        <label for=""></label>
      </div>
        <div class="form-group">
        <label for=""></label>
      </div>

       <div class="form-group">
        <label for=""></label>
      </div>


      <div class="form-group">
        <label for=""></label>
      </div>























       <h2>Preferences</h2>

      <!-----------------------------------------Prefrences ------------------------------------------------------------------->

        <div class="form-group">
        <label class="typo__label">Select a You are Seeking Gender</label>
        <multiselect v-model="genderSeeking" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select one" :options="seekingGenders" :searchable="false" :allow-empty="false" :multiple="true">
          <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
        </multiselect>
      </div>
      <div class="form-group">
        <label for="">Im interested in:</label>
         <multiselect
        v-model="datingIntent"
        :options="datingIntents">
        <template slot="singleLabel" slot-scope="{ intent }"><strong>{{ intent.name }}</strong></template>
      </multiselect>
      </div>






       <!-- <input type="hidden" name="userId" :value="this.userId"> -->

       <input type="text" v-model="city" class="multiselect__input" style="border: 1px solid #000;">
      <div class="form-group">
        <label for=""></label>
          <multiselect
        v-model="state"
        :options="states">
        <template slot="singleLabel" slot-scope="{ state }"><strong>{{ state.name }}</strong></template>
       </multiselect>
      </div>

       <input type="text" v-model="postalCode" class="multiselect__input" style="border: 1px solid #000;">

     </form>
  </div>
</template>

<script>
 import Multiselect from 'vue-multiselect'
 import states from '../../data/states'
  export default {
    props: ['userId'],
    components: { Multiselect },
    mounted(){
      console.log(`Editing user with an ID of : ${this.user}`);
    },
    data(){
      return {
         user: this.userId,
         states: [...states],
         state: '',
         seekingGenders: [
           {name: 'Male', value: 'male', key: 'male-0'},
           {name: 'Female', value: 'female', key: 'female-1'},
           {name: 'Trans-Male', value: 'trans-male', key: 'trans-male-2'},
           {name: 'Trans-Female', value: 'trans-female', key: 'trans-male-3'},
         ],
         genderSeeking: [],
         datingIntent: '',
         datingIntents: [
           {name: 'I am looking for Casual dating/No Commitment', value: 'I am looking for Casual dating/No Commitment', key: 'datingIntent-0'},
           {name: 'I want to date but nothing serious', value: 'I want to date but nothing serious', key: 'datingIntent-1'},
           {name: "I am putting in serious effort to find someone", value: "I am putting in serious effort to find someone", key: 'datingIntent-2'},
           {name: 'I am putting in serious effort to find someone', value: 'I am putting in serious effort to find someone', key: 'datingIntent-3'},
         ],
         maritalStatuses: [
           {name: 'single', value: 'single', key: 'single-0'},
           {name: 'married', value: 'married', key: 'married-1'},
           {name: 'widowed', value: 'widowed', key: 'widowed-2'},
           {name: 'divorced', value: 'divorced', key: 'divorced-3'},
         ],
         maritalStatus: '',
         heights: [
           {name: "4'5", value: "4'5", key: ""},
           {name: "4'6", value: "4'6", key: ""},
           {name: "4'7", value: "4'7", key: ""},
           {name: "4'8", value: "4'8", key: ""},
           {name: "4'9", value: "4'9", key: ""},
           {name: "4'10", value: "4'10", key: ""},
           {name: "4'11", value: "4'11", key: ""},
           {name: "5'0", value: "5'0", key: ""},
           {name: "5'1", value: "5'1", key: ""},
           {name: "5'2", value: "5'2", key: ""},
           {name: "5'3", value: "5'3", key: ""},
           {name: "5'4", value: "5'4", key: ""},
           {name: "5'5", value: "5'5", key: ""},
           {name: "5'6", value: "5'6", key: ""},
           {name: "5'7", value: "5'7", key: ""},
           {name: "5'8", value: "5'8", key: ""},
           {name: "5'9", value: "5'9", key: ""},
           {name: "5'10", value: "5'10", key: ""},
           {name: "5'11", value: "5'11", key: ""},
           {name: "6'0", value: "6'0", key: ""},
           {name: "6'1", value: "6'1", key: ""},
           {name: "6'2", value: "6'2", key: ""},
           {name: "6'3", value: "6'3", key: ""},
           {name: "6'4", value: "6'4", key: ""},
           {name: "6'5", value: "6'5", key: ""},
           {name: "6'6", value: "6'6", key: ""},
           {name: "6'7", value: "6'7", key: ""},
           {name: "6'8", value: "6'8", key: ""},
           {name: "6'9", value: "6'9", key: ""},
           {name: "7,0", value: "7'0", key: ""},
           {name: "7,1", value: "7,1", key: ""},
         ],
         height: "",
         hairColor: "",
         hairColors:[
           {name: 'black', value: 'black', key: 'hairColor-black-0'},
           {name: 'brown', value: 'brown', key: 'hairColor-brown-1'},
           {name: 'blonde', value: 'blonde', key: 'hairColor-blonde-2'},
           {name: 'red', value: 'red', key: 'hairColor-red-3'},
         ],
         religion: '',
         religions: [
           {name: 'Chrisitan - other', value: 'Chrisitan - other', key: ''},
           {name: 'New age', value: 'New age', key: ''},
           {name: 'Muslim', value: 'Muslim', key: ''},
           {name: 'Jewish', value: 'Jewish', key: ''},
           {name: 'Catholic', value: 'Catholic', key: ''},
           {name: 'Buddhist', value: 'Buddhist', key: ''},
           {name: 'Hindu', value: 'Hindu', key: ''},
           {name: 'Anglican', value: 'Anglican', key: ''},
           {name: 'Sikh', value: 'Sikh', key: ''},
           {name: 'Methodist', value: 'Methodist', key: ''},
           {name: 'Baptist', value: 'Baptist', key: ''},
           {name: 'Lutheran', value: 'Lutheran', key: ''},
           {name: 'Presbyterian', value: 'Presbyterian', key: ''},
           {name: 'Other', value: 'Other', key: ''}
         ],
         highestEducation: '',
         educations: [
           {name: 'High school', value: 'High school', key: 'High school-0'},
           {name: 'Some college', value: 'Some college', key: 'Some college-1'},
           {name: 'Some university', value: 'Some university', key: 'Some university-2'},
           {name: 'Associates degree', value: 'Associates degree', key: 'Associates degree-3'},
           {name: 'Bachelors', value: 'Bachelors', key: 'Bachelors-4'},
           {name: 'Masters', value: 'Masters', key: 'Masters-5'},
           {name: 'PhD/Post Doctoral', value: 'PhD/Post Doctoral', key: 'PhD/Post Doctoral-6'},
         ],
         eyeColor: '',
         eyeColors: [
           {name: 'brown', value: 'brown', key: 'brown-hair-0'},
           {name: 'blue', value: 'blue', key: 'blue-eyes-1'},
           {name: 'green', value: 'green', key: 'green-eyes-2'},
           {name: 'black', value: 'black', key: 'black-eyes-3'},
           {name: 'hazel', value: 'hazel', key: 'hazel-eyes-4'},
         ],
         doesSmoke: '',
         doesSmokeChoices: [
           {name: 'yes', value: 'yes', key: 'doesSmokeChoices-yes'},
           {name: 'no', value: 'no', key: 'doesSmokeChoices-no'},
         ],
         doesDrinkChoices: [
            {name: 'yes', value: 'yes', key: 'doesDrinkChoices-yes'},
           {name: 'no', value: 'no', key: 'doesDrinkChoices-no'},
         ],
         doesDrink: '',
         doesHaveChildrenChoices: [
           {name: 'yes', value: 'yes', key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: 'no', key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: '',
         doesDoDrugsChoices: [
          {name: 'yes', value: 'yes', key: 'doesDoDrugsChoices-yes'},
           {name: 'no', value: 'no', key: 'doesDoDrugsChoices-no'},
         ],
         doesDoDrugs :'',
         doesHaveChildrenChoices: [
          {name: 'yes', value: 'yes', key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: 'no', key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: '',
         postalCode: '',
         profession: '',
         city: '',
         secondLanguage: '',
         languages: [
           {name: 'Arabic', value: 'Arabic'},
           {name: 'Dutch', value: 'Dutch'},
           {name: 'Chinese', value: 'Chinese'},
           {name: 'English', value: 'English'},
           {name: 'French', value: 'French'},
           {name: 'German', value: 'German'},
           {name: 'Hebrew', value: 'Hebrew'},
           {name: 'Hindi', value: 'Hindi'},
           {name: 'Italian', value: 'Italian'},
           {name: 'Japanese', value: 'Japanese'},
           {name: 'Norwegian', value: 'Norwegian'},
           {name: 'Portguese', value: 'Portguese'},
           {name: 'Russian', value: 'Russian'},
           {name: 'Spanish', value: 'Spanish'},
           {name: 'Swedish', value: 'Swedish'},
           {name: 'Tagalog', value: 'Tagalog'},
           {name: 'Urdu', value: 'Urdu'},
           {name: 'Other', value: 'Other'},

         ],
         bodyType: '',
         bodyTypes: [
              {name: 'Prefer Not To Say', value: 'Prefer Not To Say'},
              {name: 'Thin', value: 'Thin'},
              {name: 'Athletic', value: 'Athletic'},
              {name: 'Average', value: 'Average'},
              {name: 'A Few Extra Pounds', value: 'A Few Extra Pounds'},
         ]

      }
    },

    methods: {
      updateExtentedUserProfile(){
         let formData = {};
          if(this.genderSeeking.length > 0) formData.seekingGender = this.genderSeeking;
          if(this.datingIntent) formData.datingIntent = this.datingIntent;
          if(this.height) formData.height = this.height;
          if(this.hairColor) formData.hairColor = this.hairColor;
          if(this.eyeColor) formData.eyeColor = this.eyeColor;
          if(this.highestEducation) formData.highestEducation = this.highestEducation;
          if(this.secondLanguage) formData.secondLanguage = this.secondLanguage;
          if(this.bodyType) formData.bodyType = this.bodyType;
          if(this.postalCode) formData.postalCode = this.postalCode;
          if(this.state) formData.state = this.state;
          if(this.martialStatus) formData.martialStatus = this.martialStatus;
          if(this.hasChildren) formData.hasChildren = true;
          if(this.doesSmoke ==='true') formData.doesSmoke = true;
            if(this.doesDoDrugs ==='true') formData.doesDoDrugs = true;
            if(this.doesDrink ==='true') formData.doesDrink = true;
            if(this.religion) formData.religion = this.religion;
            if(this.profession) formData.profession = profession;
            if(this.doesHavePets ==='true') formData.doesHavePets = true;
            if(this.personality) formData.personality = this.personality;
            if(this.ambitiousness) formData.ambitiousness = this.ambitiousness;
            if(this.longestRelationShip) formData.longestRelationShip = this.longestRelationShip;
            if(this.income) formData.income = this.income;
            if(this.doesDateInteracially) formData.doesDateInteracially = this.doesDateInteracially;
            if(this.interacialDatingPreferences.length > 0) formData.interacialDatingPreferences = this.interacialDatingPreferences;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
     <h2>Edit Your Profile</h2>
     <form action="">
      <label class="typo__label">Single select / dropdown</label>
      <!-- <multiselect
        v-model="seekingGender"
        :options="seekingGenders">
        <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> </template>
      </multiselect> -->
      <div>
        <label class="typo__label">Single select / dropdown</label>
        <multiselect v-model="seekingGender" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select one" :options="seekingGenders" :searchable="false" :allow-empty="false">
          <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
        </multiselect>

      </div>
       <multiselect
        v-model="datingIntent"
        :options="datingIntents">
        <template slot="singleLabel" slot-scope="{ intent }"><strong>{{ intent.name }}</strong></template>
      </multiselect>
       <multiselect
        v-model="maritalStatus"
        :options="maritalStatuses">
         <template slot="singleLabel" slot-scope="{ status }"><strong>{{ status.name }}</strong></template>
      </multiselect>
        <multiselect
        v-model="height"
        :options="heights">
         <template slot="singleLabel" slot-scope="{ size }"><strong>{{ size.name }}</strong></template>
      </multiselect>
        <multiselect
        v-model="hairColor"
        :options="hairColors">
        <template slot="singleLabel" slot-scope="{ color }"><strong>{{ color.name }}</strong></template>
      </multiselect>

        <multiselect
        v-model="religion"
        :options="religions">
       </multiselect>


       <multiselect
        v-model="religion"
        :options="religions">
       </multiselect>

       <multiselect
        v-model="education"
        :options="educations">
       </multiselect>

       <multiselect
        v-model="eyeColor"
        :options="eyeColors">
       </multiselect>

       <multiselect
        v-model="eyeColor"
        :options="eyeColors">
       </multiselect>

       <multiselect
        v-model="doesSmoke"
        :options="doesSmokeChoices">
       </multiselect>

        <multiselect
        v-model="doesDrink"
        :options="doesDrinkChoices">
       </multiselect>

        <multiselect
        v-model="doesDoDrugs"
        :options="doesDoDrugsChoices">
       </multiselect>

        <multiselect
        v-model="doesHaveChildren"
        :options="doesHaveChildrenChoices">
       </multiselect>
           <multiselect
        v-model="state"
        :options="states">
       </multiselect>


       <input type="text" v-model="city" class="multiselect__input" style="border: 1px solid #000;">

       <input type="text" v-model="postalCode" class="multiselect__input" style="border: 1px solid #000;">
       <input type="text" v-model="profession"  class="multiselect__input" style="border: 1px solid #000;">
     </form>
  </div>
</template>

<script>
 import Multiselect from 'vue-multiselect'
 import states from '../../data/states'
  export default {
    components: { Multiselect },
    data(){
      return {
         states: [...states],
         state: '',
         seekingGenders: [
           {name: 'Male', value: 'male', key: 'male-0'},
           {name: 'Female', value: 'female', key: 'female-1'},
           {name: 'Trans-Male', value: 'trans-male', key: 'trans-male-2'},
           {name: 'Trans-Female', value: 'trans-female', key: 'trans-male-3'},
         ],
         seekingGender: '',
         datingIntent: '',
         datingIntents: [
           {name: 'I am looking for Casual dating/No Commitment', value: '', key: 'datingIntent-0'},
           {name: 'I want to date but nothing serious', value: '', key: 'datingIntent-1'},
           {name: "I am putting in serious effort to find someone", value: "", key: 'datingIntent-2'},
           {name: 'I am putting in serious effort to find someone', value: '', key: 'datingIntent-3'},
         ],
         maritalStatuses: [
           {name: 'single', value: 'single', key: ''},
           {name: 'married', value: 'married', key: ''},
           {name: 'widowed', value: 'widowed', key: ''},
           {name: 'divorced', value: 'divorced', key: ''},
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
           {name: 'black', value: '', key: ''},
           {name: 'brown', value: '', key: ''},
           {name: 'blonde', value: '', key: ''},
           {name: 'red', value: '', key: ''},
         ],
         religion: '',
         religions: [
           {name: 'Chrisitan - other', value: '', key: ''},
           {name: 'New age', value: '', key: ''},
           {name: 'Muslim', value: '', key: ''},
           {name: 'Jewish', value: '', key: ''},
           {name: 'Catholic', value: '', key: ''},
           {name: 'Buddhist', value: '', key: ''},
           {name: 'Hindu', value: '', key: ''},
           {name: 'Anglican', value: '', key: ''},
           {name: 'Sikh', value: '', key: ''},
           {name: 'Methodist', value: '', key: ''},
           {name: 'Baptist', value: '', key: ''},
           {name: 'Lutheran', value: '', key: ''},
           {name: 'Presbyterian', value: '', key: ''},
           {name: 'Other', value: '', key: ''}
         ],
         education: '',
         educations: [
           {name: 'High school', value: '', key: ''},
           {name: 'Some college', value: '', key: ''},
           {name: 'Some university', value: '', key: ''},
           {name: 'Associates degree', value: '', key: ''},
           {name: 'Bachelors', value: '', key: ''},
           {name: 'Masters', value: '', key: ''},
           {name: 'PhD/Post Doctoral ', value: '', key: ''},
         ],
         eyeColor: '',
         eyeColors: [
           {name: 'brown', value: 'brown', key: 'brown-hair'},
           {name: 'blue', value: 'blue', key: 'blue-eyes'},
           {name: 'green', value: 'green', key: 'green-eyes'},
           {name: 'black', value: 'black', key: 'black-eyes'},
           {name: 'hazel', value: 'hazel', key: 'hazel-eyes'},
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
         c: [
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

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

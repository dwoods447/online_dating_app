import Vue from 'vue'
import Vuex from 'vuex'

export const state = ()=>({
  height: '',
  hairColor: '',
  eyeColor: '',
  maritalStatus:'',
  religion: '',
  profession: '',
  highestEducation: '',
  doesSmoke: '',
  doesDrink: '',
  doesDoDrugs: '',
  doesHavePets: '',
  hasChildren: '',
  secondLanguage: '',
  city: '',
  usState: '',
  postalCode: '',
  bodyType: '',
  doesDateInteracially: '',
  raceDatingPreferences: [],
  interacialDatingPreferences: [],
  seekingGenders: [],
  selectedMaritalStatuses: [],
  geekInterests: [],
  description: '',
  datingIntent: '',
  personality: '',
})

export const mutations = {
  setBodyTypeMutation(state, bodyType){
    state.bodyType = bodyType;
  },
  setHeightMutation(state, height){
    state.height = height;
  },
  setHairColorMutation(state, hairColor){
    state.hairColor = hairColor;
  },
  setEyeColorMutation(state, eyeColor){
    state.eyeColor = eyeColor;
  },
  setMaritalStatusMutation(state, maritalStatus){
    state.maritalStatus = maritalStatus;
  },
  setReligionMutation(state, religion){
    state.religion = religion;
  },
  setProfessionMutation(state, profession){
    state.profession = profession;
  },
  setEducationMutation(state, education){
    state.highestEducation = education;
  },
  setDoesDrinkMutation(state, doesDrink){
    if(doesDrink === 'yes'){
      state.doesDrink = true;
    } else if(doesDrink === 'no'){
      state.doesDrink = false;
    } else {
      state.doesDrink = '';
    }

  },
  setDoesSmokeMutation(state, doesSmoke){
    if(doesSmoke === 'yes'){
      state.doesSmoke = true;
    }else if(doesSmoke === 'no') {
      state.doesSmoke = false;
    } else {
      state.doesSmoke = '';
    }
  },
  setDoesHavePetsMutation(state, doesHavePets){
    if(doesHavePets === 'yes'){
      state.doesHavePets = true;
    } else if(doesHavePets === 'no'){
      state.doesHavePets = false;
    } else {
      state.doesHavePets = '';
    }
  },
  setDoesHaveChildrenMutation(state, doesHaveChildren){

    if(doesHaveChildren === 'yes'){
      state.hasChildren = true;
    }else if(doesHaveChildren === 'no'){
      state.hasChildren = false;
    }else {
      state.hasChildren = '';
    }
  },
  setSecondLanguageMutation(state, secondLanguage){
    state.secondLanguage = secondLanguage;
  },
  setCityMutation(state, city){
    state.city = city;
  },
  setUsStateMutation(state, usState){
    state.usState = usState;
  },
  setPostalCodeMutation(state, postalCode){
    state.postalCode = postalCode;
  },
  setDoesDateInteraciallyMutation(state, doesDateInteracially){
    if(doesDateInteracially === 'yes'){
      state.doesDateInteracially = true;
    } else if(doesDateInteracially === 'no') {
      state.doesDateInteracially = false;
    } else {
      state.doesDateInteracially = '';
    }
    
  },
  setRaceDatingPreferencesMutation(state, raceDatingPreferences){
      state.raceDatingPreferences = raceDatingPreferences;
  },
  setInteracialDatingPreferencesMutation(state, interacialDatingPreferences){
    state.interacialDatingPreferences = interacialDatingPreferences;
  },
  setSelectedGendersMutation(state, selectedGender){
    state.seekingGenders = selectedGender;
  },
  setSelectedMaritalStatusesMutation(state, maritalStatus){
    state.selectedMaritalStatuses = maritalStatus;
  },
  setGeekInterestsMutation(state, interest){
    state.geekInterests.push(interest);
  },
  removeGeekInterestsMutation(state, interest){
    let localInterest = state.geekInterests.interests.slice();
    console.log(`Interest to remove: ${interest.interest}`);
    if(localInterest.indexOf(interest.interest) >= 0){
      console.log(`Index at which to remove: ${interest.index}`);
      localInterest.splice(localInterest.indexOf(interest.interest), 1);
      console.log(`Removing index in localInterest Array : ${JSON.stringify(localInterest)}`);
      state.geekInterests.interests = localInterest;
    }

    
  },

  setProfileDescriptionMutation(state, description){
      state.description = description;
  },

  setDoesDoDrugsMutation(state, doesDoDrugs){
    if(doesDoDrugs === 'yes'){
      state.doesDoDrugs = true;
    } else if(doesDoDrugs === 'no'){
      state.doesDoDrugs = false;
    } else {
      state.doesDoDrugs = '';
    }
  },

  setDatingIntentMutation(state, datingIntent){
    state.datingIntent = datingIntent;
  },
  

  setPersonlityMutation(state, personality){
    state.personality = personality;
  }

}









export const actions = {
  setBodyTypeAction(context, bodyType){
    context.commit('setBodyTypeMutation', bodyType);
  },
  setHeightAction(context, height){
    context.commit('setHeightMutation', height);
  },
  setHairColorAction(context, hairColor){
    context.commit('setHairColorMutation', hairColor);
  },
  setEyeColorAction(context, eyeColor){
    context.commit('setEyeColorMutation', eyeColor);
  },
  setMaritalStatusAction(context, maritalStatus){
    context.commit('setMaritalStatusMutation', maritalStatus);
  },
  setReligionAction(context, religion){
    context.commit('setReligionMutation', religion);
  },
  setProfessionAction(context, profession){
    context.commit('setProfessionMutation', profession);
  },
  setEducationAction(context, education){
    context.commit('setEducationMutation', education);
  },
  setDoesDrinkAction(context, doesDrink){
    context.commit('setDoesDrinkMutation', doesDrink);
  },
  setDoesSmokeAction(context, doesSmoke){
    context.commit('setDoesSmokeMutation', doesSmoke);
  },
  setDoesDoDrugsAction(context, doesDoDrugs){
    context.commit('setDoesDoDrugsMutation', doesDoDrugs);
  },
  setDoesHaveChildrenAction(context, doesHaveChildren){
    context.commit('setDoesHaveChildrenMutation', doesHaveChildren);
  },
  setSecondLanguageAction(context, secondLanguage){
    context.commit('setSecondLanguageMutation', secondLanguage);
  },
  setCityAction(context, city){
    context.commit('setCityMutation', city);
  },
  setUsStateAction(context, usState){
    context.commit('setUsStateMutation', usState);
  },
  setPostalCodeAction(context, postalCode){
    context.commit('setPostalCodeMutation', postalCode);
  },
  setDoesDateInteraciallyAction(context, doesDateInteracially){
    context.commit('setDoesDateInteraciallyMutation', doesDateInteracially);
  },
  setRaceDatingPreferencesAction(context, raceDatingPreferences){
      context.commit('setRaceDatingPreferencesMutation', raceDatingPreferences);
  },
  setInteracialDatingPreferencesAction(context, interacialDatingPreferences){
    context.commit('setInteracialDatingPreferencesMutation', interacialDatingPreferences);
  },
  setSelectedGendersAction(context, selectedGender){
    context.commit('setSelectedGendersMutation', selectedGender);
  },
  setSelectedMaritalStatusesAction(context, maritalStatus){
    context.commit('setSelectedMaritalStatusesMutation', maritalStatus);
  },
  setGeekInterestsAction(context, interest){
    context.commit('setGeekInterestsMutation', interest);
  },
  removeGeekInterestsAction(context, interest){
    context.commit('removeGeekInterestsMutation', {interest: interest.interest, index: interest.index});
  },

  setProfileDescriptionAction(context, description){
    context.commit('setProfileDescriptionMutation', description);
  },

  setDoesHavePetsAction(context, doesHavePets){
      context.commit('setDoesHavePetsMutation', doesHavePets);
  },
  setDatingIntentAction(context, datingIntent){
    context.commit('setDatingIntentMutation', datingIntent)
  },
  setPersonalityAction(context, personality){
    context.commit('setPersonlityMutation', personality)
  }


}

export const getters = {

}


Vue.use(Vuex)

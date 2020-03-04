import Vue from 'vue'
import Vuex from 'vuex'

export const state = ()=>({
  height: '',
  hairColor: '',
  eyeColor: '',
  maritalStatus :'',
  religion: '',
  profession: '',
  education: '',
  doesSmoke: false,
  doesDrink: false,
  doesHaveChildren: false,
  secondLanguage: '',
  city: '',
  usState: '',
  postalCode: '',
  doesDateInteracially: false,
  raceDatingPreferences: [],
  interacialDatingPreferences: [],
  selectedGenders: [],

})

export const mutations = {
  setHeightMutation(state, height){
    state.height = height;
  },
  setHairColorMutation(state, hairColor){
    state.hairColor = hairColor;
  },
  setEyeColorMutation(state, eyeColor){
    state.eyeColor = eyeColor
  },
  setMaritalStatusMutation(state, maritalStatus){
    state.maritalStatus = maritalStatus
  },
  setReligionMutation(state, religion){
    state.religion = religion;
  },
  setProfessionMutation(state, profession){
    state.profession = profession;
  },
  setEducationMutation(state, education){
    state.education = education;
  },
  setDoesDrinkMutation(state, doesDrink){
    state.doesDrink = doesDrink;
  },
  setDoesSmokeMutation(state, doesSmoke){
    state.doesSmoke = doesSmoke;
  },
  setDoesHaveChildrenMutation(state, doesHaveChildren){
    state.doesHaveChildren = doesHaveChildren;
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
    state.doesDateInteracially = doesDateInteracially;
  },
  setRaceDatingPreferencesMutation(state, raceDatingPreference){
    if(state.raceDatingPreferences.indexOf(raceDatingPreference) === -1){
      state.raceDatingPreferences.push(raceDatingPreference)
    }
  },
  setInteracialDatingPreferencesMutation(state, interacialDatingPreference){
    if(state.interacialDatingPreferences.indexOf(interacialDatingPreference) === -1){
      state.interacialDatingPreferences.push(interacialDatingPreference)
    }
  },
  setSelectedGendersMutation(state, selectedGender){
    if(state.selectedGenders.indexOf(selectedGender) === -1){
      state.selectedGenders.push(selectedGender);
    }
  },

  async submitProfileUpdateMutation(state){
    let profile = {};
    if(state.height) profile.height = state.height;
    if(state.eyeColor) profile.eyeColor = state.eyeColor
    if(state.hairColor) profile.hairColor = state.maritalStatus
    if(state.maritalStatus) profile.maritalStatus = state.maritalStatus;
    if(state.religion) profile.religion = state.religion;
    if(state.profession) profile.profession = state.profession;
    if(state.education)  profile.education = state.education;
    if(state.doesSmoke) profile.doesSmoke  = state.doesSmoke;
    if(state.doesDrink) profile.doesDrink  = state.doesDrink
    if(state.doesHaveChildren) profile.doesHaveChildren = state.doesHaveChildren
    if(state.secondLanguage) profile.secondLanguage = state.secondLanguage;
    if(state.city) profile.city = state.city;
    if(state.usState) profile.state = state.usState;
    if(state.postalCode) profile.postalCode = state.postalCode;
    if(state.doesDateInteracially) profile.doesDateInteracially = state.doesDateInteracially;
    if(state.selectedGenders) profile.selectedGenders = state.selectedGenders;
    console.log(`Profile Store Edit submit ${JSON.stringify(profile, null, 2)}`);
  }

}

export const actions = {
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
  setRaceDatingPreferencesAction(context, raceDatingPreference){
      context.commit('setRaceDatingPreferencesMutation', raceDatingPreference);
  },
  setInteracialDatingPreferencesAction(context, interacialDatingPreference){
    context.commit('setInteracialDatingPreferencesMutation', interacialDatingPreference);
  },
  setSelectedGendersAction(context, selectedGender){
    context.commit('setSelectedGendersMutation', selectedGender);
  },

  submitProfileUpdateAction(context){
    context.commit('submitProfileUpdateMutation');
  }

}

export const getters = {

}


Vue.use(Vuex)

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

  async submitProfileUpdateAction(context){
    let profile = {};
    if(context.store.state.height) profile.height = context.store.state.height;
    if(context.store.state.eyeColor) profile.eyeColor = context.store.state.eyeColor
    if(context.store.state.hairColor) profile.hairColor = context.store.state.maritalStatus
    if(context.store.state.maritalStatus) profile.maritalStatus = context.store.state.maritalStatus;
    if(context.store.state.religion) profile.religion = context.store.state.religion;
    if(context.store.state.profession) profile.profession = context.store.state.profession;
    if(context.store.state.education)  profile.education = context.store.state.education;
    if(context.store.state.doesSmoke) profile.doesSmoke  = context.store.state.doesSmoke;
    if(context.store.state.doesDrink) profile.doesDrink  = context.store.state.doesDrink
    if(context.store.state.doesHaveChildren) profile.doesHaveChildren = context.store.state.doesHaveChildren
    if(context.store.state.secondLanguage) profile.secondLanguage = context.store.state.secondLanguage;
    if(context.store.state.city) profile.city = context.store.state.city;
    if(context.store.state.usState) profile.state = context.store.state.usState;
    if(context.store.state.postalCode) profile.postalCode = context.store.state.postalCode;
    if(context.store.state.doesDateInteracially) profile.doesDateInteracially = context.store.state.doesDateInteracially;
    if(context.store.state.selectedGenders) profile.selectedGenders = context.store.state.selectedGenders;

    console.log(`Profile Store Edit submit ${JSON.stringify(profile, null, 2)}`);
  }

}

export const getters = {

}


Vue.use(Vuex)

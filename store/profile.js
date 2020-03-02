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
    let profile = {
      height: context.store.state.height,
      eyeColor: context.store.state.eyeColor,
      hairColor: context.store.state.hairColor
    }

  }

}

export const getters = {

}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () =>{
    return new Vuex.Store({
      state: {
        token:  null,
      },
      mutations: {
        setAuthTokenMutation(state, token){
          state.token = token
        }
      },
      getters :{

      },
      actions :{
          setAuthTokenAction(context, token){
            context.commit('setAuthTokenMutation', token);
          }
      }
    })

};


export default createStore;

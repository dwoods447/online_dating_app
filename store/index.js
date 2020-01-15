import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
Vue.use(Vuex)

const createStore = () =>{
    return new Vuex.Store({
      state: {
        token:  null,
      },
      mutations: {
        setAuthTokenMutation(state, token){
          state.token = token;
          localStorage.setItem('token', token);

        },
        clearToken (state){
          state.token = null;
        }
      },
      getters :{
          isAutheticated(state){
            return state.token !== null;
          }
      },
      actions :{
          setAuthTokenAction(context, token){

            context.commit('setAuthTokenMutation', token);
          },
          setLogOutTimerAction(context, duration){
             setTimeout(()=>{
                context.commit('clearToken')
             }, duration)
          },
          initAuthAction(context, req){
            let token;
            let expiresDate;
            if(req){
              if(!req.headers.cookie){
                return;
              }
              const jwtCookie = req.headers.cookie.split(';').find(c =>c.trim().startWith("jwt="));
              if(!jwtCookie){
                 return;
              }
               token  = jwtCookie.split("=")[1];
               expiresDate = req.headers.cookie.split(';').find(c =>c.trim().startWith("expiresDate=")).split("=")[1];
            } else {
               token = localStorage.getItem("token");
               expiresDate = localStorage.getItem("tokenExpiration");
            }

            if(new Date().getTime() > +expiresDate || !token){
              context.commit(' clearToken');
            }
           context.commit('setLogOutTimerAction', +expiresDate  - new Date().getTime())
           context.commit('setAuthTokenMutation', token)
          },

          setLogOutAction(context){
            context.commit('clearToken');
            Cookie.remove('jwt');
            Cookie.remove('expiresDate');
            if(process.client){
              localStorage.removeItem('token');
              localStorage.removeItem('tokenExpiration');
            }

          }
      }
    })

};


export default createStore;

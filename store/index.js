import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
Vue.use(Vuex)

const createStore = () =>{
    return new Vuex.Store({
      state: {
        token:  null,
        userId: null,
      },
      mutations: {
        setAuthTokenMutation(state, token){
          state.token = token;
          localStorage.setItem('token', token);

        },
        clearToken (state){
          console.log(`Clearing Token...`);
          state.token = null;
          state.userId = null;
        },
        setLoggedInUserIdMutation(state, userId){
          state.userId = userId;
        },
      },
      getters :{
          isAutheticated(state){
            return state.token !== null;
          },

          getLoggedInUser(state){
            return state.userId !== null;
          }
      },
      actions :{
          setAuthTokenAction(context, token){
            context.commit('setAuthTokenMutation', token);
          },
          setLoggedInUserIdAction(context, userId){
            context.commit('setLoggedInUserIdMutation', userId);
          },
          setLogOutTimerAction(context, duration){
            console.log(`Duration re'vd: ${duration}`);
             setTimeout(()=>{
                console.log(`Timer expired`);
                context.commit('clearToken');

             }, duration)
          },
          initAuthAction(context, req){
            let token;
            let expiresDate;
            console.log(`Re quest object value ${req}`)
            if(req){
              if(!req.headers.cookie){
                console.log(`Req.headers.cookies is not set`);
                return;
              }
              const jwtCookie = req.headers.cookie.split(';').find(c =>c.trim().startsWith("jwt="));
              if(!jwtCookie){
                 console.log(`JWT Cookie not found!`);
                 return;
              }
               token  = jwtCookie.split("=")[1];
               expiresDate = req.headers.cookie.split(';').find(c =>c.trim().startsWith("expiresDate=")).split("=")[1];
            } else {
               console.log(`Getting the token and expiration date`);
               token = localStorage.getItem("token");
               expiresDate = localStorage.getItem("tokenExpiration");

            }

            if(new Date().getTime() > +expiresDate || !token){
              console.log(`Token has expired or doesnt exist`);
              console.log(`Token Exp value: ${new Date().getTime() > +expiresDate}`);
              console.log(`Token value: ${token}`);
              console.log(`Clearing token.....`);
              context.commit('clearToken');
              return;
            }

           console.log(`Resetting Token: ${token}`);
           console.log(`Resetting Exp: ${+expiresDate  - new Date().getTime()}`);
          //  context.dispatch('setLogOutTimerAction', +expiresDate  - new Date().getTime())
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

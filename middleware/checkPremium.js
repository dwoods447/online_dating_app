export default function(context){


    if(context.store.getters.isAutheticated && !context.store.getters.isPremiumUser){
      context.redirect('/');
    }
  }
  
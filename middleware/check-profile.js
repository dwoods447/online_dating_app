export default function(context){


  if(context.store.getters.isAutheticated && !context.store.getters.isProfileCompleted){
    context.redirect('/edituserprofile');

  }
}

export default function(context){

  console.log('IsAuthenticated: '+ context.store.getters.isAutheticated );
  console.log('isProfileCompleted ' + context.store.getters.isProfileCompleted);
  if(context.store.getters.isAutheticated && !context.store.getters.isProfileCompleted){
     console.log('profile not updated');
    context.redirect('/edituserprofile');
  }
}

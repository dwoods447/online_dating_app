export default  function(context) {
      if(!context.store.getters.isAutheticated){
        //console.log(`Running Auth - isAuthenticated: ${JSON.stringify(context.store.getters.isAutheticated)}`);
        context.redirect('/login')
      }
}

export default  function(context) {

    if(process.client){
      console.log(`Running on client`);
      console.log(`Running Check Auth - context.req ${context.req}`);
      context.store.dispatch("initAuthAction", context.req);
    }

}

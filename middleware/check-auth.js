export default  function(context) {
  if(process.client){
    context.store.dispatch("initAuthAction", null);
  } else {
    context.store.dispatch("initAuthAction", context.req);
  }
}

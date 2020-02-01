export default  function(context) {
      context.store.dispatch("initAuthAction", context.req);
}

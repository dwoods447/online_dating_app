export default  function(context) {
      console.log(`check-auth.js running`);
      context.store.dispatch("initAuthAction", context.req);
}

export default  function(context) {
  console.log(`Checking Search Results in middlware`)
  context.store.dispatch("basicsearch/setSearchResultsAction", context.req);
}

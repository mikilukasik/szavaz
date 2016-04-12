app.factory('errorService', function($http) {
  return {
    dealWithError: function(err) {
      console.log('silentError:', err)
    }
  }
})
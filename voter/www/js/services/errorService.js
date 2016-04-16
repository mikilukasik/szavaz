app.factory('errorService', function($rootScope, $http) {
  return {
    dealWithError: function(err) {
      $rootScope.toConsole('silentError:', err)
    }
  }
})
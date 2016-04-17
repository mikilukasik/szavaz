app.factory('errorService', function($rootScope, $http) {
  return {
    dealWithError: function(err, showToastr) {

      $rootScope.toConsole('silentError:', err)

      if(showToastr) $rootScope.toastr(
      	showToastr.type ? showToastr.type : 'error',
      	showToastr.text ? showToastr.text : 'error: ' + err.data,
      	showToastr.text ? false : true						//noTranslate
      );

    }
  }
})
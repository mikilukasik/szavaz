app.controller('votablesCtrl', function($rootScope, $scope, $http, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getVotableQuestions()
  });
  $scope.getVotableQuestions = function() {
    $rootScope.spinIt = true;
    apiService.getVotables().then(function(res) {
      $rootScope.spinIt = false;
      $scope.votables = res;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  }
})
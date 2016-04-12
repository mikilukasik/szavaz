app.controller('votablesCtrl', function($rootScope, $scope, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getVotableQuestions()
  });
  $scope.getVotableQuestions = function() {
    $rootScope.spinIt = true;
    $http.get('/api/questions/votables').then(function(res) {
      $rootScope.spinIt = false;
      $scope.votables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  }
})
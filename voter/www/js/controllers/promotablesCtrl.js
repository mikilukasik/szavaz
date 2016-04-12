app.controller('promotablesCtrl', function($rootScope, $scope, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getPromotableQuestions()
  });
  $scope.getPromotableQuestions = function() {
    $rootScope.spinIt = true;
    $http.get('/api/questions/promotables').then(function(res) {
      $rootScope.spinIt = false;
      $scope.promotables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  }
})
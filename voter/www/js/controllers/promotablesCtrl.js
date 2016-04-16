app.controller('promotablesCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getPromotableQuestions()
  });
  $scope.getPromotableQuestions = function() {
    $rootScope.spinIt = true;
    apiService.getPromotables().then(function(res) {
      $rootScope.spinIt = false;
      $scope.promotables = res;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  }
})
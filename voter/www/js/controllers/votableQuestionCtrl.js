app.controller('votableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.votableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.votableId);
  $rootScope.spinIt = true;
  apiService.getQuestion($scope.questionId).then(function(question) {
    $rootScope.spinIt = false;
    $rootScope.toConsole('question received', question)
    $scope.question = question;
  }, function(err) {
    $rootScope.spinIt = false;
    errorService.dealWithError(err);
  })
  $scope.vote = {
    up: function(question) {
      $rootScope.spinIt = true;
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: true
      }).then(function(res) {
        $rootScope.spinIt = false;
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    down: function(question) {
      $rootScope.spinIt = true;
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: false
      }).then(function(res) {
        $rootScope.spinIt = false;
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    }
  }
})
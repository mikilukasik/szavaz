app.controller('promotableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.promotableId;
  $rootScope.toConsole('$scope.questionId', $stateParams.promotableId);
  $rootScope.spinIt = true;
  apiService.getQuestion($scope.questionId).then(function(question) {
    $rootScope.spinIt = false;
    $rootScope.toConsole('question received', question)
    $scope.question = question;
  }, function(err) {
    errorService.dealWithError(err);
    $rootScope.spinIt = false;
  })
  $scope.promote = {
    up: function(question) {
      $rootScope.spinIt = true;
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: true
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
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: false
      }).then(function(res) {
        $rootScope.spinIt = false;
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    escalate: function(question) {
      $rootScope.spinIt = true;
      apiService.escalateQuestion(question._id).then(function(res) {
        $rootScope.spinIt = false;
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    }
  }
})
app.controller('addQuestionCtrl', function($rootScope, $scope, $filter, toastr, apiService, errorService) {
  $scope.addQuestionObj = {
    questionInput: ''
  }
  $scope.addQuestion = function() {
    $scope.question = $scope.addQuestionObj.questionInput;
    $rootScope.spinIt = true;
    apiService.postQuestion($scope.addQuestionObj.questionInput).then(function(res) {
        $rootScope.spinIt = false;
        console.log('Question added, response:', res);
        toastr.success($filter('translate')('Question added successfully.', 'toasts', $rootScope.language));
        $scope.addQuestionObj.questionInput = ''; //clears input in view
      },
      function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
  }
});
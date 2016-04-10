var app = angular.module('starter.controllers', []);



app.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, toastr) {

  $rootScope.language = 'en'

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

  // Form data for the login modal
  //$scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('promotablesCtrl', function($scope, $http) {

  $scope.$on('$ionicView.enter', function(e) {
    $scope.getPromotableQuestions()
  });


  $scope.getPromotableQuestions = function (){
    $http.get('/api/questions/promotables').then(function(res){
      $scope.promotables = res.data;
    });
  }
    
})


.controller('votablesCtrl', function($scope, $http) {

  $scope.$on('$ionicView.enter', function(e) {
    $scope.getVotableQuestions()
  });

  $scope.getVotableQuestions = function (){
    $http.get('/api/questions/votables').then(function(res){
      $scope.votables = res.data;
    });
  }
    
})

.controller('promotableQuestionCtrl', function($scope, $stateParams) {
  var questionId = $stateParams.promotableId;
  console.log('questionId',questionId);
})

.controller('votableQuestionCtrl', function($scope, $stateParams) {
  var questionId = $stateParams.votableId;
  console.log('questionId',questionId);
})

.controller('addQuestionCtrl', function($rootScope, $scope, $filter, toastr, apiService, errorService) {
  $scope.addQuestionObj = {
    questionInput : ''
  }
  $scope.addQuestion = function (question){
    var question = $scope.addQuestionObj.questionInput;

    apiService.postQuestion(question).then(function(res){
      console.log('Question added, response:',res);
      toastr.success($filter('translate')('Question added successfully.','toasts',$rootScope.language));
      $scope.addQuestionObj.questionInput = '';   //clears input in view
    },
    function(err){
      errorService.dealWithError(err)
    })

    
  }
});


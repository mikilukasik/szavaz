var app = angular.module('starter.controllers', []);



app.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, apiService, toastr, errorService) {

  

  $rootScope.language = 'en';
  var hardWareId = 'tempId';

  var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  $rootScope.clientMongoId = getCookie("clientId");

  $scope.setClientMongoID = function(clientMongoId) {
    
  }

  if($rootScope.clientMongoId === ''){
    console.log('no clientMongoId, requesting...');
    apiService.getClientMongoId(hardWareId).then(function(res){
      setCookie("clientId", res.clientMongoId, 365);
      $rootScope.clientMongoId = res.clientMongoId;
      console.log('clientMongoId received',$rootScope.clientMongoId);
    },function(err){
      errorService.dealWithError(err);
    })
  } else {
    console.log('clientMongoId from cookie, checking',$rootScope.clientMongoId);
    apiService.postClientMongoId($rootScope.clientMongoId).then(function(res){
      // setCookie("clientMongoId", res.clientMongoId, 365);
      // $rootScope.clientMongoId = res.clientMongoId;
      // console.log('clientMongoId received',$rootScope.clientMongoId);
    },function(err){
      errorService.dealWithError(err);
    })
  }



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

.controller('promotableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.promotableId;
  console.log('$scope.questionId',$stateParams.promotableId);

  apiService.getQuestion($scope.questionId).then(function(question){
    console.log('question received',question)
    $scope.question = question;
  },function(err){
    errorService.dealWithError(err);
  })

  $scope.promote = {
    up: function (question) {
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: true
      }).then(function(res){
        console.log(res)
      },function(err){
        errorService.dealWithError(err);
      })
    },
    down: function (question) {
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: false
      }).then(function(res){
        console.log(res)
      },function(err){
        errorService.dealWithError(err);
      })
    },
    escalate: function (question) {
      apiService.escalateQuestion(question._id).then(function(res){
        console.log(res)
      },function(err){
        errorService.dealWithError(err);
      })
    }
  }

})

.controller('votableQuestionCtrl', function($rootScope, $scope, $stateParams, apiService, errorService) {
  $scope.questionId = $stateParams.votableId;
  console.log('$scope.questionId',$stateParams.votableId);

  apiService.getQuestion($scope.questionId).then(function(question){
    console.log('question received',question)
    $scope.question = question;
  },function(err){
    errorService.dealWithError(err);
  })

  $scope.vote = {
    up: function (question) {
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: true
      }).then(function(res){
        console.log(res)
      },function(err){
        errorService.dealWithError(err);
      })
    },
    down: function (question) {
      apiService.postVote({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        voting: false
      }).then(function(res){
        console.log(res)
      },function(err){
        errorService.dealWithError(err);
      })
    }
  }

})

.controller('addQuestionCtrl', function($rootScope, $scope, $filter, toastr, apiService, errorService) {
  $scope.addQuestionObj = {
    questionInput : ''
  }
  $scope.addQuestion = function (){
    $scope.question = $scope.addQuestionObj.questionInput;

    apiService.postQuestion($scope.addQuestionObj.questionInput).then(function(res){
      console.log('Question added, response:',res);
      toastr.success($filter('translate')('Question added successfully.','toasts',$rootScope.language));
      $scope.addQuestionObj.questionInput = '';   //clears input in view
    },
    function(err){
      errorService.dealWithError(err)
    })

    
  }
});

